'use client';
import { useState } from 'react';
import * as z from 'zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from '@/schemas';
import { FormError } from '../../formError';
import { FormSuccess } from '../../formSuccess';
import { register } from '@/actions/register';
import styles from '../auth.module.css';
import Link from 'next/link';

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      register(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        })
        .catch((error) => {
          setError(error.message);
        });
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Register with Email</div>
      <form className={styles.form} onSubmit={form.handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Name"
            className={styles.input}
            {...form.register('name')}
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            {...form.register('email')}
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            {...form.register('password')}
          />
        </div>
        <button type="submit" className={styles.button} disabled={isPending}>
          Create an account
        </button>
      </form>
      <div className={styles.text}>
        Already have an account?{' '}
        <Link href="/auth/login" className={styles.link}>
          Login
        </Link>
      </div>
      {error && <FormError message={error} />}
      {success && <FormSuccess message={success} />}
    </div>
  );
};
