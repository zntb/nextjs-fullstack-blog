import Image from 'next/image';
import profileDefault from '@/public/profile.png';
import styles from './profile.module.css';

import {
  UserCardList,
  UserCardListSkeleton,
} from '@/components/userCardList/UserCardList';
import { currentUser } from '@/lib/auth';
import { Suspense } from 'react';
import { UserSettings } from '@/components/userSettings/UserSettings';

type SearchParamsProps = {
  searchParams: {
    page: string;
  };
};

const ProfilePage = async ({ searchParams }: SearchParamsProps) => {
  const page = parseInt(searchParams.page) || 1;
  const user = await currentUser();

  // console.log(user);

  const profileImage = user?.image || profileDefault;
  const profileName = user?.name;
  const profileEmail = user?.email;

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
            <UserSettings />
          </div>
          <hr className={styles.hr} />
          <div className={styles.posts}>
            <h2>Your Posts:</h2>
            <Suspense fallback={<UserCardListSkeleton />}>
              <UserCardList page={page} userEmail={profileEmail} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
