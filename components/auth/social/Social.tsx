'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

import styles from './social.module.css';

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <>
      <div className={styles.socialButton} onClick={() => onClick('google')}>
        <Image src="/google.svg" alt="Google Icon" width={24} height={24} />
        Sign in with Google
      </div>
      <div className={styles.socialButton}>
        <Image src="/github.svg" alt="Github Icon" width={24} height={24} />
        Sign in with Github
      </div>
      <div className={styles.socialButton}>
        <Image src="/facebook.svg" alt="Facebook Icon" width={24} height={24} />
        Sign in with Facebook
      </div>
    </>
  );
};
