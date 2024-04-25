'use client';

import { SessionProvider } from 'next-auth/react';

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  return (
    <SessionProvider refetchOnWindowFocus={true}>{children}</SessionProvider>
  );
};

export default AuthProvider;
