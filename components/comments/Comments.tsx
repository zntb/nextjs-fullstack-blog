'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';
import { useCurrentUser } from '@/hooks/use-current-user';
import defaultUserImage from '@/public/profile.png';
import { toast } from 'react-toastify';
import styles from './comments.module.css';
import { PostData } from '../singlePost/SinglePost';
import { ConfirmToast } from 'react-confirm-toast';

const domain = process.env.NEXT_PUBLIC_APP_URL;

type Comment = {
  id: string;
  postSlug: string;
  user: {
    image: string;
    name: string;
  };
  createdAt: string;
  desc: string;
};

type Author = {
  // image: string | null;
  name: string;
  email: string;
};

const formattedDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};

const fetcher = async (url: string) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

const Comments: React.FC<{ postSlug: string; author: Author }> = ({
  postSlug,
  author,
}) => {
  const [desc, setDesc] = useState<string>('');
  const user = useCurrentUser();
  const { data, mutate, isLoading } = useSWR<Comment[]>(
    `${domain}/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const handleSubmit = async () => {
    if (desc === '') {
      toast.error('Please enter a comment');
      return;
    }

    await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ desc, postSlug }),
    });

    toast.success('Comment added!');
    mutate();
    setDesc('');
  };

  const deleteComment = async (id: string) => {
    try {
      const response = await fetch(
        `/api/comments?postSlug=${postSlug}&id=${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        }
      );

      if (!response.ok) {
        toast.error('Failed to delete comment');
        throw new Error('Failed to delete comment');
      }

      toast.success('Comment deleted');
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {user ? (
        <div className={styles.write}>
          <textarea
            placeholder="write a comment..."
            className={styles.input}
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
          <button className={styles.button} onClick={handleSubmit}>
            Send
          </button>
        </div>
      ) : (
        <Link href="/auth/login">Login to write a comment</Link>
      )}
      <div className={styles.comments}>
        {isLoading
          ? 'loading'
          : data?.map((item: Comment, index: number) => (
              <div className={styles.comment} key={index}>
                <div className={styles.user}>
                  <Image
                    src={item.user.image || defaultUserImage}
                    alt=""
                    width={50}
                    height={50}
                    className={styles.image}
                  />

                  <div className={styles.userInfo}>
                    <span className={styles.username}>{item.user.name}</span>
                    <span className={styles.date}>
                      {formattedDate(item.createdAt)}
                    </span>
                  </div>
                </div>
                <div className={styles.desc}>
                  <p>{item.desc}</p>
                </div>

                <div
                  className={`${
                    item.user.name === user?.name ||
                    author.email === user?.email
                      ? styles.deleteBtnContainer
                      : styles.hideDeleteBtnContainer
                  }`}
                >
                  {
                    <ConfirmToast
                      asModal={true}
                      customCancel="Cancel"
                      customConfirm="Delete"
                      customFunction={() => deleteComment(item.id)}
                      message="Are you sure you want to delete this comment?"
                      theme="dark"
                    >
                      <button
                        type="button"
                        className={styles.deleteBtn}
                        disabled={
                          item.user.name === user?.name ||
                          author.email === user?.email
                            ? false
                            : true
                        }
                      >
                        Delete
                      </button>
                    </ConfirmToast>
                  }
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Comments;

export const CommentsSkeleton = () => {
  return (
    <div className={styles.skeletonContainer}>
      <h1 className={styles.skeletonTitle}>Title</h1>
      <div className={styles.skeletonUser}></div>
      <div className={styles.skeletonDescription} />
      <div className={styles.skeletonComment} />
    </div>
  );
};
