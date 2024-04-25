import styles from './authActions.module.css';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>{children}</div>
    </div>
  );
};

export default AuthLayout;
