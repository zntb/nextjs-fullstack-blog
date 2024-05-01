'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './userSettings.module.css';
import { FiXOctagon } from 'react-icons/fi';

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export const Modal = ({ children, onClose }: ModalProps) => {
  const searchParams = useSearchParams();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const showDialog = searchParams.get('edit');

  useEffect(() => {
    if (showDialog === 'y') {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  const closeDialog = () => {
    dialogRef.current?.close();
    onClose();
  };

  const dialog: JSX.Element | null =
    showDialog === 'y' ? (
      <dialog ref={dialogRef} className={styles.modal}>
        <FiXOctagon className={styles.closeModal} onClick={closeDialog} />
        {children}
      </dialog>
    ) : null;

  return dialog;
};
