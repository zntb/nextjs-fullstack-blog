import { CommentsSkeleton } from '../comments/Comments';
import { DeletePostSkeleton } from '../deletePost/DeletePost';
import styles from './singlePostSkeleton.module.css';

export const SinglePostSkeleton = () => {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonInfoContainer}>
        <div className={styles.skeletonTextContainer}>
          <h1 className={styles.skeletonTitle}>Skeleton title</h1>
          <div className={styles.skeletonUser}>
            <div className={styles.skeletonUserImage} />
            <div className={styles.skeletonUserTextContainer}>
              <span className={styles.skeletonUsername}>Username</span>
              <span className={styles.skeletonDate}>10.03.2023</span>
            </div>
          </div>
          <DeletePostSkeleton />
        </div>

        <div className={styles.skeletonImageContainer} />
      </div>
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonPost}>
          <div className={styles.skeletonDescription}>
            <p>Skeleton description</p>
          </div>
          <div className={styles.skeletonComment}>
            {/* TODO: Comment skeleton component here */}
            {/* <CommentsSkeleton /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
