'use client';

import * as z from 'zod';
import { useTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useCurrentUser } from '@/hooks/use-current-user';
import { FormSuccess } from '@/components/formSuccess';
import { FormError } from '@/components/formError';
import { UserSchema } from '@/schemas';
import { userSettings } from '@/actions/userSettings';
import styles from './userSettings.module.css';

export const UserSettings = () => {
  const user = useCurrentUser();

  console.log(user);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <dialog className={styles.modal}>
      <div className={styles.overlay} />
      <IoIosCloseCircleOutline className={styles.close} onClick={() => {}} />
      <h1 className={styles.title}>User Settings</h1>
      <form className={styles.form} onSubmit={form.handleSubmit(onSubmit)}>
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
              <label htmlFor="email" id="email" className={styles.label}>
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

              <label htmlFor="password" id="password" className={styles.label}>
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

              <label htmlFor="password" id="password" className={styles.label}>
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
          <button type="submit" className={styles.button} disabled={isPending}>
            Update Profile
          </button>
        </div>
      </form>
    </dialog>
  );
};
