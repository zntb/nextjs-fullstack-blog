import { NewPasswordForm } from '@/components/auth/newPasswordForm';
import styles from '.authActions.module.css';

const NewPasswordPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <NewPasswordForm />
      </div>
    </div>
  );
};

export default NewPasswordPage;
