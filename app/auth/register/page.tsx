'use client';

import { RegisterForm } from '@/components/auth/register/RegisterForm';
import styles from './registerPage.module.css';
import { Social } from '@/components/auth/social/Social';

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Register</h1>
        <Social />
        <hr className={styles.hr} />
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
