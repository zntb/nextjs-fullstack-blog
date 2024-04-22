import { Suspense } from 'react';
import Featured from '@/components/featured/featured';
import { CardList } from '@/components/cardList/CardList';
import Menu from '@/components/menu/Menu';
import CategoryList from '@/components/categoryList/CategoryList';
import { CardListSkeleton } from '@/components/cardList/CardList';

import styles from './homepage.module.css';

type SearchParamsProps = {
  searchParams: {
    page: string;
  };
};

export default function Home({ searchParams }: SearchParamsProps) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div className={styles.container}>
      <Featured />
      <CategoryList />
      <div className={styles.content}>
        {/* <Suspense fallback={<CardListSkeleton />}>
          <CardList page={page} />
        </Suspense> */}
        <Menu />
      </div>
    </div>
  );
}
