'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './loginPage.module.css';

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Sign In</h1>
        <div className={styles.socialButton} onClick={() => signIn('google')}>
          <Image
            src="/google.svg"
            alt="Google Icon"
            width={24}
            height={24}
            className={styles.icon}
          />
          Sign in with Google
        </div>
        <div className={styles.socialButton}>
          <Image
            src="/github.svg"
            alt="Github Icon"
            width={24}
            height={24}
            className={styles.icon}
          />
          Sign in with Github
        </div>
        <div className={styles.socialButton}>
          <Image
            src="/facebook.svg"
            alt="Facebook Icon"
            width={24}
            height={24}
            className={styles.icon}
          />
          Sign in with Facebook
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
