import { UserRole } from '@prisma/client';
import * as z from 'zod';

// export const UserSchema = z
//   .object({
//     name: z.optional(
//       z.string().min(3, 'Name is too short').max(20, 'Name is too long!')
//     ),
//     email: z.optional(z.string().email()),
//     password: z.optional(z.string().min(6, 'Password is too short')),
//     newPassword: z.optional(z.string().min(6, 'Password is too short')),
//     // role: z.enum([UserRole.USER, UserRole.ADMIN]),
//   })
//   .refine(
//     (data) => {
//       if (data.password && !data.newPassword) {
//         return false;
//       }
//       return true;
//     },
//     {
//       message: 'New password is required',
//       path: ['newPassword'],
//     }
//   )
//   .refine(
//     (data) => {
//       if (data.newPassword && !data.password) {
//         return false;
//       }
//       return true;
//     },
//     {
//       message: 'Password is required',
//       path: ['password'],
//     }
//   );
// .refine(
//   (data) => {
//     if (data.newPassword && data.newPassword === data.password) {
//       return false;
//     }
//     return true;
//   },
//   {
//     message: 'New password cannot be the same as old password',
//     path: ['newPassword'],
//   }
// );

export const UserSchema = z.object({
  name: z.optional(
    z.string().min(3, 'Name is too short').max(20, 'Name is too long!')
  ),
  email: z.optional(z.string().email()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(6, {
    message: 'Password is required and should be at least 6 characters',
  }),
  name: z.string().min(3, {
    message: 'Name is required and should be at least 3 characters',
  }),
});

export const UserPasswordSchema = z
  .object({
    password: z.optional(z.string().min(6, 'Password is too short')),
    newPassword: z.optional(z.string().min(6, 'Password is too short')),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: 'New password is required',
      path: ['newPassword'],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: 'Password is required',
      path: ['password'],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword === data.password) {
        return false;
      }
      return true;
    },
    {
      message: 'New password cannot be the same as old password',
      path: ['newPassword'],
    }
  );

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(1, {
    message: 'Password is required ',
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'Minimum 6 characters required',
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
});
