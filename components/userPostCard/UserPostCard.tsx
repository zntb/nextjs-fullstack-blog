import Image from 'next/image';
import Link from 'next/link';

import styles from './userPostCard.module.css';
import DeletePost from '../deletePost/DeletePost';
// import DeletePost from '../deletePost/DeletePost';

type CardProps = {
  item: {
    title: string;
    desc: string;
    img?: string | null;
    catSlug: string;
    slug: string;
    createdAt: string;
  };
};

const UserPostCard = ({ item }: CardProps) => {
  return (
    <div className={styles.container}>
      {item.img && (
        <div className={styles.imageContainer}>
          <Image
            src={item.img}
            alt=""
            fill
            priority={true}
            sizes="max-width: 100px"
            className={styles.image}
          />
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {item.createdAt.substring(0, 10)} -{' '}
          </span>
          <span className={styles.category}>{item.catSlug}</span>
        </div>
        <Link href={`/posts/${item.slug}`}>
          <h1 className={styles.title}>{item.title}</h1>
        </Link>
        {/* <p className={styles.desc}>{item.desc.substring(0, 60)}</p> */}
        <div
          className={styles.desc}
          dangerouslySetInnerHTML={{ __html: item?.desc.substring(0, 60) }}
        />
        <Link href={`/posts/${item.slug}`} className={styles.link}>
          Read More
        </Link>
      </div>

      <div className={styles.deleteContainer}>
        <DeletePost slug={item.slug} />
      </div>
    </div>
  );
};

export default UserPostCard;

export const UserPostCardSkeleton = () => {
  const userPostCardSkeletons = Array.from({ length: 2 }, (_, index) => (
    <div key={index} className={styles.skeletonContainer}>
      <div className={styles.skeletonImageContainer}>
        <div className={styles.skeletonImage} />
      </div>
      <div className={styles.skeletonTextContainer}>
        <div className={styles.skeletonDetail}>
          <div className={styles.skeletonDate} />
          <div className={styles.skeletonCategory} />
        </div>
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonDesc} />
        <div className={styles.skeletonLink} />
      </div>
      <div className={styles.skeletonDeleteContainer}>
        <button className={styles.skeletonDeleteButton}>Delete</button>
      </div>
    </div>
  ));
  return <>{userPostCardSkeletons}</>;
};
