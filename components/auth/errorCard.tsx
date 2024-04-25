import { BiSolidErrorAlt } from 'react-icons/bi';
import { CardWrapper } from './cardWrapper/cardWrapper';
import styles from './auth.module.css';

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <div className={styles.errorCard}>
        <BiSolidErrorAlt className={styles.errorIcon} />
      </div>
    </CardWrapper>
  );
};
