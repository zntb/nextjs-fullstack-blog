import Link from 'next/link';
import React from 'react';
import styles from './menuCategories.module.css';

const MenuCategories = () => {
  return (
    <div className={styles.categoryList}>
      <Link
        href="/posts?cat=style"
        className={`${styles.categoryItem} ${styles.style}`}
      >
        Style
      </Link>
      <Link
        href="/posts"
        className={`${styles.categoryItem} ${styles.fashion}`}
      >
        Fashion
      </Link>
      <Link href="/posts" className={`${styles.categoryItem} ${styles.food}`}>
        Food
      </Link>
      <Link href="/posts" className={`${styles.categoryItem} ${styles.travel}`}>
        Travel
      </Link>
      <Link
        href="/posts"
        className={`${styles.categoryItem} ${styles.culture}`}
      >
        Culture
      </Link>
      <Link href="/posts" className={`${styles.categoryItem} ${styles.coding}`}>
        Coding
      </Link>
    </div>
  );
};

export default MenuCategories;
