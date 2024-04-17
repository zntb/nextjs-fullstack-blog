import { getAuthSession } from '@/utils/auth';
import prisma from '@/utils/connect';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
  params: {
    slug: string;
  };
};

// GET SINGLE POST
export const GET = async (req: NextRequest, { params }: Params) => {
  const { slug } = params;

  try {
    const post = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      include: { user: true },
    });

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }),
      { status: 500 }
    );
  }
};

// DELETE A POST
export const DELETE = async (req: NextRequest, { params }: Params) => {
  const { slug } = params;
  const session = await getAuthSession();

  if (!session || !session.user) {
    return new NextResponse(JSON.stringify({ message: 'Not Authenticated!' }), {
      status: 401,
    });
  }

  try {
    const post = await prisma.post.delete({
      where: { slug },
    });

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }),
      { status: 500 }
    );
  }
};
