'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import profileDefault from '@/public/profile.png';
import styles from './profile.module.css';
import { useRouter } from 'next/navigation';
import Card from '@/components/card/Card';

const domain = process.env.NEXT_PUBLIC_DOMAIN;

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

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session || !session.user || !session.user.email) {
      return;
    }

    const fetchUserPosts = async () => {
      try {
        const response = await fetch(
          `${domain}/api/posts?page=1&user=${session?.user?.email}`
        );
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts);
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
  }, [session]);

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
              <p>Loading...</p>
            ) : (
              <div className={styles.posts}>
                {posts?.map((item, index) => (
                  <div key={index} className={styles.post}>
                    <Card item={item} key={index} />
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
