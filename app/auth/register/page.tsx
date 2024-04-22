import { RegisterForm } from '@/components/auth/register/registerForm';

import styles from './registerPage.module.css';

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
