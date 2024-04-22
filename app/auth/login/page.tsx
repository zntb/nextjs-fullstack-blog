'use client';

import styles from './loginPage.module.css';
import { LoginForm } from '@/components/auth/login/LoginForm';
import { Social } from '@/components/auth/social/Social';

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Login</h1>
        <Social />
        <hr className={styles.hr} />
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
