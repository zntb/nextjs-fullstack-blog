import { getAuthSession } from '@/utils/auth';
import prisma from '@/utils/connect';
import { NextRequest, NextResponse } from 'next/server';

// GET ALL POSTS
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get('page');
  const cat = searchParams.get('cat');

  const POST_PER_PAGE = 2;

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (Number(page) - 1),
    where: {
      ...(cat && { catSlug: cat }),
    },
  };

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);

    return new NextResponse(JSON.stringify({ posts, count }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }),
      { status: 500 }
    );
  }
};

// CREATE A POST
export const POST = async (req: NextRequest, res: NextResponse) => {
  const session = await getAuthSession();

  if (!session || !session.user) {
    return new NextResponse(JSON.stringify({ message: 'Not Authenticated!' }), {
      status: 401,
    });
  }

  try {
    const body = await req.json();
    const post = await prisma.post.create({
      data: { ...body, userEmail: session.user.email },
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
