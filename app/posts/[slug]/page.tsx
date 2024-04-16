import styles from './singlePage.module.css';
import Image from 'next/image';
import Comments from '@/components/comments/Comments';
import Menu from '@/components/menu/Menu';

const domain = process.env.NEXT_PUBLIC_DOMAIN;

interface UserData {
  name: string;
  image: string;
}

interface PostData {
  title: string;
  user: UserData;
  createdAt: string;
  img: string;
  desc: string;
}

const getData = async (slug: string): Promise<PostData> => {
  const res = await fetch(`${domain}/api/posts/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed');
  }

  return res.json();
};

interface SinglePageProps {
  params: {
    slug: string;
  };
}

const SinglePage: React.FC<SinglePageProps> = async ({ params }) => {
  const { slug } = params;

  const data: PostData = await getData(slug);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data?.title}</h1>
          <div className={styles.user}>
            {data?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image
                  src={data.user.image}
                  alt=""
                  fill
                  sizes="(50px)"
                  className={styles.avatar}
                />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.user.name}</span>
              <span className={styles.date}>
                {new Date(data?.createdAt).toDateString()}
              </span>
            </div>
          </div>
        </div>
        {data?.img && (
          <div className={styles.imageContainer}>
            <Image
              src={data.img}
              alt=""
              fill
              priority={true}
              sizes="(max-width: 100px)"
              className={styles.image}
            />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.desc }}
          />
          <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
