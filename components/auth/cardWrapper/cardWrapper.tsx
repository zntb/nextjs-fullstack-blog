'use client';

import { BackButton } from '../backButton';
import styles from './cardWrapper.module.css';

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
}: CardWrapperProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <header>
          <h1 className={styles.title}>{headerLabel}</h1>
        </header>
        <div>{children}</div>
        <div>
          <BackButton label={backButtonLabel} href={backButtonHref} />
        </div>
      </div>
    </div>
  );
};
