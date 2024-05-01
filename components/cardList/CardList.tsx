import Pagination, { PaginationSkeleton } from '../pagination/Pagination';
import Card, { CardSkeleton } from '../card/Card';
import styles from './cardList.module.css';
import { getAllPosts } from '@/data/requests';

type CardListProps = {
  page: number;
  cat?: string | undefined;
};

export const CardList = async ({ page, cat }: CardListProps) => {
  const { posts, count } = await getAllPosts(page, cat);

  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {posts?.map((item, index) => (
          <Card item={item} key={index} />
        ))}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export const CardListSkeleton = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Loading Posts...</h1>
      <div className={styles.posts}>
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <PaginationSkeleton />
    </div>
  );
};
