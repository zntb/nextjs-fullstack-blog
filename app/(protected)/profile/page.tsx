'use client';
import { useSession } from 'next-auth/react';

import styles from './profile.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  if (!session || !session?.user) {
    router.push('/');
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          width={50}
          height={50}
          src={profileImage || ''}
          alt="Profile image"
          className={styles.image}
        />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{profileName}</h1>
        <p className={styles.email}>{profileEmail}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
