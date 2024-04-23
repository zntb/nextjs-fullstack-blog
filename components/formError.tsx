import styles from './form.module.css';

interface FormErrorProps {
  message?: string;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) {
    return null;
  }
  return (
    <div className={styles.formError}>
      <p>{message}</p>
    </div>
  );
}
