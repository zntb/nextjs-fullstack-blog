import { useSession } from 'next-auth/react';

export const useCurrentUser = () => {
  const { data: session, status } = useSession();

  if (!session && status === 'unauthenticated') {
    return null;
  }

  if (!session && status === 'loading') {
    return null;
  }

  if (!session?.user) {
    return null;
  }

  return session.user;
};
