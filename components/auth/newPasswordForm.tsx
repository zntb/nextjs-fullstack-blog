'use client';
import { useState } from 'react';
import * as z from 'zod';

import { useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { CardWrapper } from './card-wrapper';
import { Form, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewPasswordSchema } from '@/schemas';

import { newPassword } from '@/actions/new-password';

import styles from './auth.module.css';

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.inputContainer}>
              <input
                type="password"
                id="password"
                {...form.register('password')}
                required
                placeholder="Enter new password"
              />
            </div>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
