import { CardWrapper } from './card-wrapper';

import styles from './authForm.module.css';

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className={styles.errorCard}>
        <p>Please try again.</p>
      </div>
    </CardWrapper>
  );
};
