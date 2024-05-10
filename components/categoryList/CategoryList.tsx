'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories, Category } from '@/lib/requests';
import Image from 'next/image';
import styles from './categoryList.module.css';

const CategoryList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getCategories();
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
