import { auth } from '@/auth';
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

  if (!slug || slug === undefined) {
    return new NextResponse(
      JSON.stringify({ message: 'Post does not exist!' }),
      { status: 404 }
    );
  }

  try {
    const post = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      include: { user: true },
    });

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err: Error | any) {
    // Check if the error message contains 'Record to update not found'
    if (err.message.includes('Record to update not found')) {
      return new NextResponse(
        JSON.stringify({ message: 'Post does not exist!' }),
        { status: 404 }
      );
    }

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

  const sessionUser = await auth();

  if (!sessionUser || !sessionUser.user) {
    return new NextResponse(JSON.stringify({ message: 'Not Authenticated!' }), {
      status: 401,
    });
  }

  const { user } = sessionUser;

  if (user.email !== sessionUser.user.email) {
    return new NextResponse(JSON.stringify({ message: 'Not Authenticated!' }), {
      status: 401,
    });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
    });

    if (!post) {
      return new NextResponse(
        JSON.stringify({ message: 'Post does not exist!' }),
        { status: 404 }
      );
    }

    if (post.userEmail !== user.email) {
      return new NextResponse(
        JSON.stringify({ message: 'Not Authenticated!' }),
        {
          status: 401,
        }
      );
    }

    await prisma.post.delete({ where: { slug } });

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }),
      { status: 500 }
    );
  }
};
