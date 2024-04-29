'use client';

import { IoIosCloseCircleOutline } from 'react-icons/io';
import styles from './userSettings.module.css';

export const UserSettings = () => {
  return (
    <dialog className={styles.modal}>
      <div className={styles.overlay} />
      <IoIosCloseCircleOutline className={styles.close} onClick={() => {}} />
      <form className={styles.form}>
        <h1 className={styles.title}>User Settings</h1>
        <div className={styles.container}>
          <label htmlFor="name" id="name" className={styles.label}>
            Enter new name
          </label>
          <input type="text" name="name" id="name" className={styles.input} />
          <label htmlFor="password" id="password" className={styles.label}>
            Enter password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className={styles.input}
          />
          <label htmlFor="password" id="password" className={styles.label}>
            Enter new password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Update Profile
          </button>
        </div>
      </form>
    </dialog>
  );
};
