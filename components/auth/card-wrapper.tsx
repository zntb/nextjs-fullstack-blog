'use client';

import Link from 'next/link';
import styles from './authForm.module.css';

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>{headerLabel}</h1>
          <Link href={backButtonHref} className={styles.backButton}>
            {backButtonLabel}
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
};
