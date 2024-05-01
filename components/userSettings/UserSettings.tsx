'use client';

import * as z from 'zod';
import { useTransition, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useCurrentUser } from '@/hooks/use-current-user';
import { FormSuccess } from '@/components/formSuccess';
import { FormError } from '@/components/formError';
import { UserSchema } from '@/schemas';
import { userSettings } from '@/actions/userSettings';
import { Modal } from '@/components/userSettings/Modal';
import profileDefault from '@/public/profile.png';
import styles from './userSettings.module.css';
import Link from 'next/link';

export const UserSettings = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = useCurrentUser();

  const profileImage = user?.image || profileDefault;
  const profileName = user?.name;
  const profileEmail = user?.email;

  const { update } = useSession();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      name: user?.name || undefined,
      email: user?.email || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof UserSchema>) => {
    startTransition(() => {
      userSettings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
            return;
          }

          if (data.success) {
            setSuccess(data.success);
            update();
          }
        })
        .catch((error) => {
          setError('Something went wrong!');
          console.error(error);
        });
    });
  };

  const onClose = () => {
    setIsModalOpen(false);
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
          href="/profile?showDialog=y"
          className={styles.button}
          onClick={() => setIsModalOpen(true)}
        >
          Edit Profile
        </Link>
      </div>
      <>
        {isModalOpen && (
          <>
            <div className={styles.overlay} />
            <Modal onClose={onClose}>
              <h1 className={styles.title}>User Settings</h1>
              <form
                className={styles.form}
                onSubmit={form.handleSubmit(onSubmit)}
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
                      {...form.register('name')}
                      defaultValue={user?.name || ''}
                    />
                    <p className={styles.formErrorMessage}>
                      {form.formState.errors.name?.message}
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
                          {...form.register('email')}
                          defaultValue={user?.email || ''}
                        />
                        <p className={styles.formErrorMessage}>
                          {form.formState.errors.email?.message}
                        </p>
                      </div>

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
                          {...form.register('password')}
                          // defaultValue={null ? undefined : ''}
                          autoComplete="current-password"
                        />
                        <p className={styles.formErrorMessage}>
                          {form.formState.errors.password?.message}
                        </p>
                      </div>

                      <label
                        htmlFor="password"
                        id="password"
                        className={styles.label}
                      >
                        New password
                      </label>
                      <div className={styles.inputContainer}>
                        <input
                          type="password"
                          id="password"
                          className={styles.input}
                          placeholder="New Password"
                          {...form.register('newPassword')}
                          defaultValue={null ? undefined : ''}
                          autoComplete="new-password"
                        />
                        <p className={styles.formErrorMessage}>
                          {form.formState.errors.newPassword?.message}
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
                    Update Profile
                  </button>
                </div>
              </form>
            </Modal>
          </>
        )}
      </>
    </>
  );
};