import { SinglePost } from '@/components/singlePost/SinglePost';
import prisma from '@/utils/connect';
import styles from './singlePage.module.css';

export async function generateStaticParams() {
  const posts = await prisma.post.findMany();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const SinglePage = () => {
  return (
    <div className={styles.container}>
      <SinglePost />
    </div>
  );
};

export default SinglePage;
