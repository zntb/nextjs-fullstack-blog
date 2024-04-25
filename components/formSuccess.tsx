import styles from './form.module.css';

interface FormSuccessProps {
  message?: string;
}

export function FormSuccess({ message }: FormSuccessProps) {
  if (!message) {
    return null;
  }
  return (
    <div className={styles.formSuccess}>
      <p>{message}</p>
    </div>
  );
}
