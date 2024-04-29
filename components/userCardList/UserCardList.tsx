import Pagination, { PaginationSkeleton } from '../pagination/Pagination';

import { Category } from '../categoryList/CategoryList';
import UserPostCard, {
  UserPostCardSkeleton,
} from '../userPostCard/UserPostCard';
import styles from './userCardList.module.css';

const domain = process.env.NEXT_PUBLIC_APP_URL;

export type Post = {
  id: string;
  createdAt: string;
  userEmail: string;
  slug: string;
  title: string;
  desc: string;
  img?: string | null;
  catSlug: string;
  cat: Category;
};

type UserCardListProps = {
  page: number;
  userEmail: string | undefined | null;
};

const getData = async (
  page: number,
  userEmail: string
): Promise<{ posts: Post[]; count: number }> => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  try {
    const res = await fetch(
      `${domain}/api/posts?page=${page}&user=${userEmail}`,
      {
        cache: 'no-store',
      }
    );

    // console.log(res);

    if (!res.ok) {
      throw new Error('Failed');
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return { posts: [], count: 0 };
  }
};

export const UserCardList = async ({ page, userEmail }: UserCardListProps) => {
  const { posts, count } = await getData(page || 1, userEmail || '');

  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
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
