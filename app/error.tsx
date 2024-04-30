'use client';

import Link from 'next/link';

import styles from './homepage.module.css';

const ErrorPage = ({ error }: { error: Error }) => {
  return (
    <div className={styles.errorContainer}>
      <p className="error-text">{error.message}</p>
      <p className="error-link">
        <Link href="/"> &#8592; Go back home</Link>
      </p>
    </div>
  );
};

export default ErrorPage;
