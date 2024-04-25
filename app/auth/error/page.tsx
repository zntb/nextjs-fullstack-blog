import { ErrorCard } from '@/components/auth/errorCard';

import styles from '../authActions.module.css';

const AuthErrorPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ErrorCard />
      </div>
    </div>
  );
};

export default AuthErrorPage;
