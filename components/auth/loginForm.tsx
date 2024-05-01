'use client';

import { useState } from 'react';
import * as z from 'zod';
import Link from 'next/link';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { LoginSchema } from '@/schemas';
import { login } from '@/actions/login';
import { FormError } from '../formError';
import { FormSuccess } from '../formSuccess';

import styles from './auth.module.css';

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
    <>
      <div className={styles.title}>Login with Email</div>
      <form className={styles.form} onSubmit={form.handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            {...form.register('email')}
            autoComplete=""
            required
          />
          <p className={styles.formErrorMessage}>
            {form.formState.errors.email?.message}
          </p>
        </div>
        <div className={styles.inputContainer}>
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            {...form.register('password')}
            autoComplete=""
            required
          />
          <p className={styles.formErrorMessage}>
            {form.formState.errors.password?.message}
          </p>
        </div>
        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
        <Link className={styles.link} href="/auth/reset">
          Forgot password?
        </Link>
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
      {urlError && <FormError message={urlError} />}
    </>
  );
};
