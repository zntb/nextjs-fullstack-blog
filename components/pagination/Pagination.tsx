'use client';

import React from 'react';
import styles from './pagination.module.css';
import { useRouter } from 'next/navigation';

type PaginationProps = {
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
};

const Pagination = ({ page, hasPrev, hasNext }: PaginationProps) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => router.push(`?page=${page - 1}`)}
      >
        Previous
      </button>
      <button
        disabled={!hasNext}
        className={styles.button}
        onClick={() => router.push(`?page=${page + 1}`)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

export const PaginationSkeleton = () => {
  return (
    <div className={styles.skeletonContainer}>
      <button className={styles.skeletonButton}>Previous</button>
      <button className={styles.skeletonButton}>Next</button>
    </div>
  );
};
