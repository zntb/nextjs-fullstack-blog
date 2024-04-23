'use client';
import { useState } from 'react';
import * as z from 'zod';

import { useTransition } from 'react';
import { Form, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetSchema } from '@/schemas';
import { reset } from '@/actions/reset';
import { FormError } from '../formError';
import { FormSuccess } from '../formSuccess';
import styles from './auth.module.css';
import { CardWrapper } from './cardWrapper/cardWrapper';

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      reset(values)
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
      headerLabel="Reset Password"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              className={styles.input}
              id="email"
              type="email"
              placeholder="Email"
              {...form.register('email')}
            />
          </div>
          <div>
            <button
              className={styles.button}
              type="submit"
              disabled={isPending}
            >
              Send Reset Email
            </button>
          </div>
          <div>
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
