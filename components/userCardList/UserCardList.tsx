import { getUserPosts } from '@/data/requests';
import Pagination, { PaginationSkeleton } from '../pagination/Pagination';
import UserPostCard, {
  UserPostCardSkeleton,
} from '../userPostCard/UserPostCard';
import styles from './userCardList.module.css';

type UserCardListProps = {
  page: number;
  userEmail: string | undefined | null;
};

export const UserCardList = async ({ page, userEmail }: UserCardListProps) => {
  const { posts, count } = await getUserPosts(page, userEmail || '');

  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        {posts?.map((item, index) => (
          <UserPostCard item={item} key={index} />
        ))}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export const UserCardListSkeleton = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Loading Posts...</h1>
      <div className={styles.posts}>
        <UserPostCardSkeleton />
      </div>
      <PaginationSkeleton />
    </div>
  );
};
