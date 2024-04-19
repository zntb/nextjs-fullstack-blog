import prisma from '@/utils/connect';

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await prisma.account.findFirst({
      where: {
        userId,
      },
    });
    console.log(account);

    return account;
  } catch (error) {
    return null;
  }
};
