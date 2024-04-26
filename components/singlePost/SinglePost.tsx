'use client';

import { notFound, useParams } from 'next/navigation';
import { DeletePostSkeleton } from '../deletePost/DeletePost';
import Image from 'next/image';
import Comments from '@/components/comments/Comments';
import { CommentsSkeleton } from '../comments/Comments';
import profileDefaultImage from '@/public/profile.png';
import Menu from '@/components/menu/Menu';
import DeletePost from '@/components/deletePost/DeletePost';
import { useCallback, useEffect, useState } from 'react';

import styles from './singlePost.module.css';

const domain = process.env.NEXT_PUBLIC_APP_URL;

type UserData = {
  name: string;
  image: string | null;
};

type PostData = {
  id: string;
  title: string;
  slug: string;
  user: UserData;
  createdAt: string;
  img?: string | null;
  desc: string;
};

export const SinglePost = () => {
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { slug }: { slug: string } = useParams();

  const fetchPost = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${domain}/api/posts/${slug}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log(data);

      setPost(data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch post');
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost, slug]);

  if (error) {
    return <div>{error}</div>;
  }

  if (post?.user.image === null) {
    post.user.image = profileDefaultImage.src;
  }

  return (
    <>
      {loading && <SinglePostSkeleton />}

      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <div className={styles.textContainer}>
            <h1 className={styles.title}>{post?.title}</h1>
            <div className={styles.user}>
              <div className={styles.userImageContainer}>
                <Image
                  src={post?.user?.image || profileDefaultImage.src}
                  alt=""
                  fill
                  sizes="(50px)"
                  className={styles.avatar}
                />
              </div>

              <div className={styles.userTextContainer}>
                <span className={styles.username}>{post?.user?.name}</span>
                <span className={styles.date}>
                  {new Date(post?.createdAt || '').toDateString()}
                </span>
              </div>
            </div>
            <DeletePost slug={slug} />
          </div>

          {post?.img && (
            <div className={styles.imageContainer}>
              <Image
                src={post?.img}
                alt=""
                fill
                priority={true}
                sizes="(max-width: 100px)"
                className={styles.image}
              />
            </div>
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.post}>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: post?.desc || '' }}
            />
            <div className={styles.comment}>
              <Comments postSlug={slug} />
            </div>
          </div>
          <Menu />
        </div>
      </div>
    </>
  );
};

export const SinglePostSkeleton = () => {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonInfoContainer}>
        <div className={styles.skeletonTextContainer}>
          <h1 className={styles.skeletonTitle}>Skeleton title</h1>
          <div className={styles.skeletonUser}>
            <div className={styles.skeletonUserImage} />
            <div className={styles.skeletonUserTextContainer}>
              <span className={styles.skeletonUsername}>Username</span>
              <span className={styles.skeletonDate}>10.03.2023</span>
            </div>
          </div>
          <DeletePostSkeleton />
        </div>

        <div className={styles.skeletonImageContainer} />
      </div>
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonPost}>
          <div className={styles.skeletonDescription}>
            <p>Skeleton description</p>
          </div>
          <div className={styles.skeletonComment}>
            {/* TODO: Comment skeleton component here */}
            {/* <CommentsSkeleton /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

// export const generateStaticParams = async () => {
//   const response = await fetch(`${domain}/api/posts`);
//   console.log(response);

//   const posts = await response.json();
//   return posts.map((post: PostData) => ({
//     slug: post.slug,
//   }));
// };
