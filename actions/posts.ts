import prisma from '@/utils/connect';

export const getPostAuthor = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      return user.name;
    }
  } catch (error) {
    console.error('Error fetching author name:', error);
  }
};
