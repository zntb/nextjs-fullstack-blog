import Pagination, { PaginationSkeleton } from '../pagination/Pagination';
import Card, { CardSkeleton } from '../card/Card';
import { Category } from '../categoryList/CategoryList';
import styles from './cardList.module.css';

const domain = process.env.NEXT_PUBLIC_DOMAIN;

type Post = {
  id: string;
  createdAt: string;
  slug: string;
  title: string;
  desc: string;
  img?: string | null;
  catSlug: string;
  cat: Category;
};

type CardListProps = {
  page: number;
  cat?: string | undefined;
};

const getData = async (
  page: number,
  cat?: string
): Promise<{ posts: Post[]; count: number }> => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const res = await fetch(
      `${domain}/api/posts?page=${page}&cat=${cat || ''}`,
      {
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      throw new Error('Failed');
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return { posts: [], count: 0 };
  }
};

export const CardList = async ({ page, cat }: CardListProps) => {
  const { posts, count } = await getData(page, cat);

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
