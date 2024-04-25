import { Suspense } from 'react';
import styles from './singlePage.module.css';

import {
  SinglePost,
  SinglePostSkeleton,
} from '@/components/singlePost/SinglePost';

const SinglePage = () => {
  return (
    <div className={styles.container}>
      <Suspense fallback={<SinglePostSkeleton />}>
        <SinglePost />
      </Suspense>
    </div>
  );
};

export default SinglePage;

// export async function generateStaticParams() {
//   const response = await fetch(`${domain}/api/posts`);
//   const posts = await response.json();
//   return posts.map((post: { slug: string }) => ({
//     slug: post.slug,
//   }));
// }
