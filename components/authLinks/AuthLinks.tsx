'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './authLinks.module.css';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useCurrentUser } from '@/hooks/use-current-user';

import profileDefaultImage from '@/public/profile.png';
import NavLink from '../navbar/NavLink';

const AuthLinks = () => {
  const [open, setOpen] = useState<boolean>(false);

  const user = useCurrentUser();

  const profileImage = user?.image;

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
            <Link href="/posts">Posts</Link>
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
          <NavLink href="/write">Write</NavLink>
          <NavLink href="/profile">Profile</NavLink>
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
            <Link href="/posts">Posts</Link>
            <Link href="/write">Write</Link>
            <Link href="/profile">Profile</Link>
            <span onClick={signOut as () => void}>Logout</span>
          </>
        </div>
      )}
    </>
  );
};

export default AuthLinks;
