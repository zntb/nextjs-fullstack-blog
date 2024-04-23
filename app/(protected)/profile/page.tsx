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
import { useCurrentUser } from '@/hooks/use-current-user';

// const domain = process.env.NEXT_PUBLIC_APP_URL;

//TODO: Resolve pagination problem

const ProfilePage = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const [profileImage, setProfileImage] = useState('');
  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!user) return;
    setProfileImage(user?.image || '');
    setProfileName(user?.name || '');
    setProfileEmail(user?.email || '');

    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const fetchPosts = async () => {
      const res = await fetch(
        `http://localhost:3000/api/posts?userId=${user?.id}&page=${page}`
      );
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, [user, page]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const count = posts.length;

  const POST_PER_PAGE = 2;

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
