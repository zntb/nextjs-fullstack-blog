'use client';

import styles from './loginPage.module.css';
import { LoginForm } from '@/components/auth/login/LoginForm';
import { Social } from '@/components/auth/social/Social';

const LoginPage = () => {
  return (
    <>
      <h1 className={styles.title}>Login</h1>
      <Social />
      <hr className={styles.hr} />
      <LoginForm />
    </>
  );
};

export default LoginPage;
