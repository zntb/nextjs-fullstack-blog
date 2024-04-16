import Pagination from '../pagination/Pagination';
import Card from '../card/Card';
import { Category } from '../categoryList/CategoryList';

import styles from './cardList.module.css';

const domain = process.env.NEXT_PUBLIC_DOMAIN;

interface Post {
  id: string;
  createdAt: string;
  slug: string;
  title: string;
  desc: string;
  img?: string | null;
  views: number;
  catSlug: string;
  cat: Category;
  userEmail: string;
  comments: Comment[];
}

type CardListProps = {
  page: number;
  cat?: string | undefined;
};

const getData = async (
  page: number,
  cat?: string
): Promise<{ posts: Post[]; count: number }> => {
  const res = await fetch(`${domain}/api/posts?page=${page}&cat=${cat || ''}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed');
  }

  return res.json();
};

const CardList = async ({ page, cat }: CardListProps) => {
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

export default CardList;
