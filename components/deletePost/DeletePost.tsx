'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'react-toastify';
import styles from './deletePost.module.css';

const domain = process.env.NEXT_PUBLIC_APP_URL;

const DeletePost = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this comment?');
    if (!confirmed) return;

    try {
      if (!slug) {
        throw new Error('Slug is missing');
      }

      const response = await fetch(`${domain}/api/posts/${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Post deleted');
        router.push('/posts');
        startTransition(() => {
          router.refresh();
        });
      } else {
        toast.error('Failed to delete post');
        throw new Error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', (error as Error).message);
    }
  };

  return (
    <div className={styles.deleteBtnContainer}>
      <button onClick={onDelete} className={styles.btnDelete}>
        Delete Post
      </button>
    </div>
  );
};

export default DeletePost;

export const DeletePostSkeleton = () => {
  return (
    <div className={styles.skeletonDeleteBtnContainer}>
      <button className={styles.skeletonButton}>Delete Post</button>
    </div>
  );
};
