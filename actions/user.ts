// 'use server';

// import { auth } from '@/auth';
// import { NextApiRequest, NextApiResponse } from 'next';

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const session = await auth(req, res);

//     if (!session || !session.user) {
//       return null;
//     }

//     return {
//       user: session.user,
//     };
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// export default handler;
