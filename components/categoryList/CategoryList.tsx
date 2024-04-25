'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './categoryList.module.css';
import Image from 'next/image';

const domain = process.env.NEXT_PUBLIC_APP_URL;

export interface Category {
  _id: string;
  title: string;
  slug: string;
  img?: string | null;
}

const getData = async (): Promise<Category[]> => {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const res = await fetch(`${domain}/api/categories`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

const CategoryList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getData();
        setData(categories);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <CategoryListSkeleton />
  ) : (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {data.map((item, index) => (
          <Link
            key={index}
            href={`/posts?cat=${item.title}`}
            className={`${styles.category} ${styles[item.slug]}`}
          >
            {item.img && (
              <Image
                src={item.img}
                alt=""
                width={32}
                height={32}
                className={styles.image}
              />
            )}
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;

export const CategoryListSkeleton = () => {
  const categoryItems = Array.from({ length: 6 }, (_, index) => (
    <div key={index} className={styles.skeletonCategory}>
      <div className={styles.skeletonImage} />
      <div className={styles.skeletonText}>Category {index + 1}</div>
    </div>
  ));

  return (
    <div className={styles.skeletonContainer}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.skeletonCategories}>{categoryItems}</div>
    </div>
  );
};
