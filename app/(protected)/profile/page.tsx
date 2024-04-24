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
import Pagination from '@/components/pagination/Pagination';

const domain = process.env.NEXT_PUBLIC_APP_URL;
const POST_PER_PAGE = 6;

// type PageProps = {
//   page: number;
// };

//TODO: Resolve pagination problem

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
  const [totalPages, setTotalPages] = useState<number>(2);

  useEffect(() => {
    new Promise((resolve) => setTimeout(resolve, 5000));
    const fetchPosts = async (currentPage: number, limit: number) => {
      setLoading(true);

      try {
        const response = await fetch(
          `${domain}/api/posts?page=${currentPage}&user=${profileEmail}&fetchAll=true`,
          {
            cache: 'no-store',
          }
        );

        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts);
          setTotalPages(Math.ceil(data.count)); // Update totalPages
        } else {
          throw new Error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session && session.user && session.user.email) {
      fetchPosts(page || 1, POST_PER_PAGE).catch(() => setLoading(false));
    }
  }, [session, page, profileEmail]);

  // const handlePrevPage = () => {
  //   if (page > 1) {
  //     setPage(page - 1);
  //   }
  // };

  // const handleNextPage = () => {
  //   if (page < totalPages) {
  //     setPage(page + 1);
  //   }
  // };

  // const hasPrev = page > 1;
  // const hasNext = page < totalPages;
  const count = posts.length;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

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
            <Pagination
              page={page}
              hasPrev={hasPrev}
              hasNext={hasNext}
              // handlePrev={handlePrevPage}
              // handleNext={handleNextPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
