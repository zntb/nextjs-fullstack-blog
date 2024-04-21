'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import profileDefault from '@/public/profile.png';
import styles from './profile.module.css';
import { useRouter } from 'next/navigation';
import UserPostCard, {
  UserPostCardSkeleton,
} from '@/components/userPostCard/UserPostCard';
import { Post } from '@/components/cardList/CardList';

const domain = process.env.NEXT_PUBLIC_DOMAIN;
const POSTS_PER_PAGE = 6;

const ProfilePage = () => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login');
    },
  });
  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (!session || !session.user || !session.user.email) {
      return;
    }

    const fetchUserPosts = async () => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      try {
        const response = await fetch(
          `${domain}/api/posts?page=${page}&limit=${POSTS_PER_PAGE}&user=${session?.user?.email}`
        );
        if (response.ok) {
          const data = await response.json();
          if (page === 1) {
            setPosts(data.posts);
          } else {
            setPosts((prevPosts) => [...prevPosts, ...data.posts]);
          }
        } else {
          throw new Error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [page, session]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Your Profile</h1>
        <div className={styles.content}>
          <div className={styles.profileInfo}>
            <div className={styles.imageContainer}>
              <Image
                width={200}
                height={200}
                src={profileImage || profileDefault}
                alt="Profile image"
                className={styles.image}
              />
            </div>
            <p>
              <span>Name:</span>
              {profileName}
            </p>
            <p>
              <span>Email:</span>
              {profileEmail}
            </p>
          </div>
          <hr className={styles.hr} />
          <div className={styles.posts}>
            <h2>Your Posts:</h2>

            {!loading && posts.length === 0 && (
              <p className="text-gray-600">You have no posts listed.</p>
            )}
            {loading ? (
              <UserPostCardSkeleton />
            ) : (
              <div className={styles.posts}>
                {posts?.map((item, index) => (
                  <div key={index} className={styles.post}>
                    <UserPostCard item={item} key={index} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
