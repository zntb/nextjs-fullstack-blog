import { auth } from '@/auth';

export const currentUser = async () => {
  const session = await auth();

  const { name, email, role, image } = session?.user || {};

  if (!name || !email || !role || !image) {
    return null;
  }

  return { name, email, role, image };
};
export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};

export const currentUserName = async () => {
  const session = await auth();

  return session?.user?.name;
};
