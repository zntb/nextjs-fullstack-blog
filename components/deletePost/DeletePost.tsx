'use client';

import { useRouter } from 'next/navigation';
import { startTransition } from 'react';
import styles from './deletePost.module.css';

const domain = process.env.NEXT_PUBLIC_DOMAIN;

const DeletePost = ({ slug }: { slug: string }) => {
  const router = useRouter();

  const onDelete = async () => {
    try {
      if (!slug) {
        throw new Error('Slug is missing');
      }

      const response = await fetch(`${domain}/api/posts/${slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      router.push('/');
      startTransition(() => {
        router.refresh();
      });
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
