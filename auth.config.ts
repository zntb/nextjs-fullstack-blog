import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import google from 'next-auth/providers/google';
import { LoginSchema } from './schemas';
import { getUserByEmail } from './lib/user';

export default {
  providers: [
    google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    Credentials({
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
