'use client';
import { useState } from 'react';
import * as z from 'zod';

import { useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { Form, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewPasswordSchema } from '@/schemas';

import { newPassword } from '@/actions/new-password';

import styles from './auth.module.css';
import { FormError } from '../formError';
import { FormSuccess } from '../formSuccess';
import { CardWrapper } from './cardWrapper/cardWrapper';

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      newPassword(values, token)
        .then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
        })
        .catch((error) => {
          setError(error.message);
        });
    });
  };

  return (
    <CardWrapper
      headerLabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.field}>
            <input
              className={styles.input}
              type="password"
              id="password"
              {...form.register('password')}
            />
          </div>
          <div>
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
          <div>
            <button
              type="submit"
              disabled={isPending}
              className={styles.button}
            >
              Reset password
            </button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
