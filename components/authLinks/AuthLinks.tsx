'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './authLinks.module.css';
import { useEffect, useState } from 'react';
import { signIn, signOut } from 'next-auth/react';
import { useCurrentUser } from '@/hooks/use-current-user';
import { usePathname } from 'next/navigation';
import profileDefaultImage from '@/public/profile.png';

const AuthLinks = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [path, setPath] = useState<string>('');

  const user = useCurrentUser();

  const pathname = usePathname();

  const profileImage = user?.image;

  useEffect(() => {
    if (user) {
      path === '/logout' && signOut();
    } else {
      path === '/auth/login' && signIn();
    }
  }, [path, user]);

  if (!user || !user?.email) {
    return (
      <>
        <Link href="/auth/login" className={styles.link}>
          Login
        </Link>
        <div className={styles.burger} onClick={() => setOpen(!open)}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
        {open && (
          <div className={styles.responsiveMenu}>
            <Link href="/">Homepage</Link>
            <Link href="/">Posts</Link>
            <Link href="/auth/login">Login</Link>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {user && (
        <>
          <Link
            href="/write"
            className={`${styles.link} ${
              pathname === '/write' && styles.linkActive
            }`}
          >
            Write
          </Link>
          <Link
            href="/profile"
            className={`${styles.link} ${
              pathname === '/profile' && styles.linkActive
            }`}
          >
            Profile
          </Link>
          <span className={styles.link} onClick={signOut as () => void}>
            Logout
          </span>
          <span>
            <Image
              src={profileImage || profileDefaultImage}
              alt="profile"
              width={24}
              height={24}
              className={styles.profileImage}
            />
          </span>
        </>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <>
            <Link href="/">Homepage</Link>
            <Link href="/">Posts</Link>
            <Link href="/">Write</Link>
            <Link href="/">Profile</Link>
            <span onClick={signOut as () => void}>Logout</span>
          </>
        </div>
      )}
    </>
  );
};

export default AuthLinks;
