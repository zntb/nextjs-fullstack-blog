'use client';

import { RegisterForm } from '@/components/auth/register/registerForm';
import styles from './registerPage.module.css';
import { Social } from '@/components/auth/social/Social';

const RegisterPage = () => {
  return (
    <>
      <h1 className={styles.title}>Register</h1>
      <Social />
      <hr className={styles.hr} />
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
