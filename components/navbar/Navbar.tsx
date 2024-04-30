import React from 'react';
import styles from './navbar.module.css';
import Image from 'next/image';
import AuthLinks from '../authLinks/AuthLinks';
import ThemeToggle from '../themeToggle/ThemeToggle';
import NavLink from './NavLink';

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <Image src="/facebook.png" alt="facebook" width={24} height={24} />
        <Image src="/instagram.png" alt="instagram" width={24} height={24} />
        <Image src="/tiktok.png" alt="tiktok" width={24} height={24} />
        <Image src="/youtube.png" alt="youtube" width={24} height={24} />
      </div>
      <div className={styles.logo}>zntbBlog</div>
      <div className={styles.links}>
        <ThemeToggle />
        <NavLink href="/">Home</NavLink>
        <NavLink href="/posts">Posts</NavLink>
        <AuthLinks />
      </div>
    </div>
  );
};

export default Navbar;
