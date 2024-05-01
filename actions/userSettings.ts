'use server';

import * as z from 'zod';
import prisma from '@/utils/connect';
import { UserSchema, UserPasswordSchema } from '@/schemas';
import { getUserByEmail, getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';
import bcrypt from 'bcryptjs';

export const userSettings = async (
  userValues: z.infer<typeof UserSchema>,
  passwordValues: z.infer<typeof UserPasswordSchema>
) => {
  const user = await currentUser();

  if (!user) {
    return { error: 'Unauthorized' };
  }

  const dbUser = await getUserById(user.id || '');

  if (!dbUser) {
    return { error: 'Unauthorized' };
  }

  if (user.isOAuth) {
    userValues.email = undefined;
    passwordValues.password = undefined;
    passwordValues.newPassword = undefined;
  }

  if (userValues.email && userValues.email !== user.email) {
    const existingUser = await getUserByEmail(userValues.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Email already in use' };
    }

    const verificationToken = await generateVerificationToken(userValues.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: 'Confirmation email sent!' };
  }

  if (
    passwordValues.password &&
    passwordValues.newPassword &&
    dbUser.password
  ) {
    const passwordsMatch = await bcrypt.compare(
      passwordValues.password,
      dbUser.password
    );

    if (!passwordsMatch) {
      return { error: 'Incorrect password' };
    }

    const hashedPassword = await bcrypt.hash(passwordValues.newPassword, 10);
    passwordValues.password = hashedPassword;
    passwordValues.newPassword = undefined;
  }

  await prisma.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...userValues,
      ...passwordValues,
    },
  });

  return { success: 'User settings updated!' };
};
