'use client';

import Link from 'next/link';
import styles from './authLinks.module.css';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';

const AuthLinks = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { data: session, status } = useSession();

  if (status !== 'authenticated' || !session || !session.user) {
    return (
      <>
        <Link href="/login" className={styles.link}>
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
            <Link href="/login">Login</Link>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {session && session.user && (
        <>
          <Link href="/write" className={styles.link}>
            Write
          </Link>
          <Link href="/profile" className={styles.link}>
            Profile
          </Link>
          <span className={styles.link} onClick={signOut as () => void}>
            Logout
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
