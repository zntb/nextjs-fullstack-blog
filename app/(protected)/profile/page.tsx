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

  const profileEmail = user?.email;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Your Profile</h1>
        <div className={styles.content}>
          <UserSettings />
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
