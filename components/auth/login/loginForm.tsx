'use client';
import { useState } from 'react';
import * as z from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { LoginSchema } from '@/schemas';
import { login } from '@/actions/login';
import { FormError } from '../../formError';
import { FormSuccess } from '../../formSuccess';

import styles from '../auth.module.css';

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : '';

  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
        })
        .catch(() => {
          setError('Something went wrong');
        });
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Login with Email</div>

      <form className={styles.form} onSubmit={form.handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          {...form.register('email')}
          autoComplete=""
          required
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          {...form.register('password')}
          autoComplete=""
          required
        />
        <button className={styles.button} type="submit" disabled={isPending}>
          Login
        </button>
      </form>
      <div className={styles.text}>
        Don&apos;t have an account?{' '}
        <Link href="/auth/register" className={styles.link}>
          Signup
        </Link>
      </div>
      {error && <FormError message={error} />}
      {urlError && <FormError message={urlError} />}
      {success && <FormSuccess message={success} />}
    </div>
  );
};
