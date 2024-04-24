import { CardList, CardListSkeleton } from '@/components/cardList/CardList';
import styles from './postsPage.module.css';
import Menu from '@/components/menu/Menu';

import { Suspense } from 'react';

type SearchParamsProps = {
  searchParams: {
    page: string;
    cat: string;
  };
};

const PostsPage = ({ searchParams }: SearchParamsProps) => {
  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{cat} Posts</h1>
      <div className={styles.content}>
        <Suspense fallback={<CardListSkeleton />}>
          <CardList page={page} cat={cat} />
        </Suspense>

        <Menu />
      </div>
    </div>
  );
};

export default PostsPage;
