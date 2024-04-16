'use client';

import Link from 'next/link';
import styles from './categoryList.module.css';
import Image from 'next/image';
import React from 'react';

const domain = process.env.NEXT_PUBLIC_DOMAIN;

export interface Category {
  _id: string;
  title: string;
  slug: string;
  img?: string | null;
}

const getData = async (): Promise<Category[]> => {
  const res = await fetch(`${domain}/api/categories`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

const CategoryList: React.FC = () => {
  const [data, setData] = React.useState<Category[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getData();
        setData(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {data.map((item, index) => (
          <Link
            key={index}
            href={`/blog?cat=${item.title}`}
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
