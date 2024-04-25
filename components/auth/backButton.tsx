'use client';
import Link from 'next/link';

import styles from './auth.module.css';

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <button className={styles.backButton}>
      <Link href={href}>{label}</Link>
    </button>
  );
};
