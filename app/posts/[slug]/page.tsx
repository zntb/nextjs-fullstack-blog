import styles from './singlePage.module.css';

import { SinglePost } from '@/components/singlePost/SinglePost';

const SinglePage = () => {
  return (
    <div className={styles.container}>
      <SinglePost />
    </div>
  );
};

export default SinglePage;
