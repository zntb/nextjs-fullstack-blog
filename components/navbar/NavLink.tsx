'use client';

import Link from 'next/link';
import styles from './navbar.module.css';
import { usePathname } from 'next/navigation';

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`${styles.link} ${pathname === href && styles.linkActive}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
