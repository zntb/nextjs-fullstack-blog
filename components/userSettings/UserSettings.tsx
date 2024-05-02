'use client';

import * as z from 'zod';
import { useTransition, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession, signOut } from 'next-auth/react';
import { toast } from 'react-toastify';
import { ConfirmToast } from 'react-confirm-toast';
import { useCurrentUser } from '@/hooks/use-current-user';
import { FormSuccess } from '@/components/formSuccess';
import { FormError } from '@/components/formError';
import { UserSchema, UserPasswordSchema } from '@/schemas';
import { userSettings, deleteUser } from '@/actions/user';
import { Modal } from '@/components/userSettings/Modal';
import profileDefault from '@/public/profile.png';
import styles from './userSettings.module.css';

export const UserSettings = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = useCurrentUser();
  const router = useRouter();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const profileImage = user?.image || profileDefault;
  const profileName = user?.name;
  const profileEmail = user?.email;

  const userForm = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
    },
  });

  const passwordForm = useForm<z.infer<typeof UserPasswordSchema>>({
    resolver: zodResolver(UserPasswordSchema),
    defaultValues: {
      password: '',
      newPassword: '',
    },
  });

  const handleUserSubmit = (values: z.infer<typeof UserSchema>) => {
    startTransition(() => {
      userSettings(values, {})
        .then((data) => {
          if (data.error) {
            setError(data.error);
            return;
          }

          if (data.success) {
            setSuccess(data.success);
            update();
            setIsModalOpen(false);
            router.refresh();
          }
        })
        .catch((error) => {
          setError('Something went wrong!');
          console.error(error);
        });
    });
  };

  const handlePasswordSubmit = (values: z.infer<typeof UserPasswordSchema>) => {
    startTransition(() => {
      userSettings({}, values)
        .then((data) => {
          if (data.error) {
            setPasswordError(data.error);
            return;
          }

          if (data.success) {
            setPasswordSuccess(data.success);
            update();
            setIsModalOpen(false);
            router.refresh();
          }
        })
        .catch((error) => {
          setPasswordError('Something went wrong!');
          console.error(error);
        });
    });
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  const deleteUserProfile = async () => {
    try {
      await deleteUser(user?.id as string);
      toast.success('Account deleted successfully');
      await signOut();
      window.location.reload();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete account');
    }
  };

  return (
    <>
      <div className={styles.profileInfo}>
        <div className={styles.imageContainer}>
          <Image
            width={200}
            height={200}
            src={profileImage || profileDefault}
            alt="Profile image"
            className={styles.image}
          />
        </div>
        <p>
          <span>Name:</span>
          {profileName}
        </p>
        <p>
          <span>Email:</span>
          {profileEmail}
        </p>

        <Link
          href="/profile?edit=y"
          className={styles.button}
          onClick={() => setIsModalOpen(true)}
        >
          Edit Profile
        </Link>

        {/* <div className={styles.deleteBtnContainer}> */}
        <ConfirmToast
          asModal={true}
          customCancel="Cancel"
          customConfirm="Ok"
          customFunction={deleteUserProfile}
          message="Are you sure you want to delete your account?"
          theme="dark"
        >
          <button className={styles.deleteButton}>Delete Profile</button>
        </ConfirmToast>
        {/* </div> */}
      </div>
      <>
        {isModalOpen && (
          <>
            <div className={styles.overlay} />
            <Modal onClose={onClose}>
              <h1 className={styles.title}>User Settings</h1>
              <form
                className={styles.form}
                onSubmit={userForm.handleSubmit(handleUserSubmit)}
              >
                <div className={styles.container}>
                  <label htmlFor="name" id="name" className={styles.label}>
                    Name
                  </label>
                  <div className={styles.inputContainer}>
                    <input
                      type="text"
                      id="name"
                      placeholder="Name"
                      className={styles.input}
                      {...userForm.register('name')}
                      defaultValue={user?.name || ''}
                    />
                    <p className={styles.formErrorMessage}>
                      {userForm.formState.errors.name?.message}
                    </p>
                  </div>

                  {user?.isOAuth === false && (
                    <>
                      <label
                        htmlFor="email"
                        id="email"
                        className={styles.label}
                      >
                        Email
                      </label>
                      <div className={styles.inputContainer}>
                        <input
                          type="email"
                          id="email"
                          placeholder="Email"
                          className={styles.input}
                          {...userForm.register('email')}
                          defaultValue={user?.email || ''}
                        />
                        <p className={styles.formErrorMessage}>
                          {userForm.formState.errors.email?.message}
                        </p>
                      </div>
                    </>
                  )}
                  {error && <FormError message={error} />}
                  {success && <FormSuccess message={success} />}
                  <button
                    type="submit"
                    className={styles.button}
                    disabled={isPending}
                  >
                    Update
                  </button>
                </div>
              </form>

              {/* Password form */}
              {!user?.isOAuth && (
                <>
                  <hr className={styles.hr} />
                  <form
                    className={styles.form}
                    onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
                  >
                    <div className={styles.container}>
                      <label
                        htmlFor="password"
                        id="password"
                        className={styles.label}
                      >
                        Password
                      </label>
                      <div className={styles.inputContainer}>
                        <input
                          type="password"
                          id="password"
                          className={styles.input}
                          placeholder="Password"
                          {...passwordForm.register('password')}
                          autoComplete="current-password"
                        />
                        <p className={styles.formErrorMessage}>
                          {passwordForm.formState.errors.password?.message}
                        </p>
                      </div>

                      <label
                        htmlFor="newPassword"
                        id="newPassword"
                        className={styles.label}
                      >
                        New password
                      </label>
                      <div className={styles.inputContainer}>
                        <input
                          type="password"
                          id="newPassword"
                          className={styles.input}
                          placeholder="New Password"
                          {...passwordForm.register('newPassword')}
                          autoComplete="new-password"
                        />
                        <p className={styles.formErrorMessage}>
                          {passwordForm.formState.errors.newPassword?.message}
                        </p>
                      </div>
                      {passwordError && <FormError message={passwordError} />}
                      {passwordSuccess && (
                        <FormSuccess message={passwordSuccess} />
                      )}
                      <button
                        type="submit"
                        className={styles.button}
                        disabled={isPending}
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </>
              )}
            </Modal>
          </>
        )}
      </>
    </>
  );
};
