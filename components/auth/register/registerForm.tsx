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
import styles from './registerForm.module.css';

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
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Register</h1>
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
            Register
          </button>
        </form>
        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
      </div>
    </div>
  );
};
