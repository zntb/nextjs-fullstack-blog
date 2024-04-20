import { PrismaAdapter } from '@auth/prisma-adapter';
// import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import prisma from './connect';
import { NextAuthOptions, getServerSession } from 'next-auth';
import { Adapter } from 'next-auth/adapters';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string,
    // }),
  ],

  callbacks: {
    async session({ session }) {
      if (!session.user?.email) {
        return session;
      }
      const sessionUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (!sessionUser) {
        return session;
      }
      return session;
    },
  },
};
