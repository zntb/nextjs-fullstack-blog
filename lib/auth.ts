import { auth } from '@/auth';

export const currentUser = async () => {
  const session = await auth();

  return session?.user;

  // const { id, name, email, role, image, isOAuth } = session?.user || {};

  // if (!id || !name || !email || !role || !image) {
  //   return null;
  // }

  // return { id, name, email, role, image, isOAuth };
};
export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};

export const currentUserName = async () => {
  const session = await auth();

  return session?.user?.name;
};
