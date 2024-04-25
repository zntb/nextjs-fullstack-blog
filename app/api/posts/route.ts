import { auth } from '@/auth';
import prisma from '@/utils/connect';
import { NextRequest, NextResponse } from 'next/server';

// GET ALL POSTS
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get('page');
  const cat = searchParams.get('cat');
  const userEmail = searchParams.get('user');
  const fetchAll = searchParams.get('fetchAll'); // New parameter to fetch all posts

  let POST_PER_PAGE = 2;

  if (userEmail && !fetchAll) {
    // If userEmail is provided and fetchAll is not true, use custom pagination
    POST_PER_PAGE = 6;
  }

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (Number(page) - 1),
    where: {
      ...(cat && { catSlug: cat }),
      ...(userEmail && { userEmail }),
    },
  };

  if (fetchAll === 'true') {
    query.take = 0;
    query.skip = 0; // Adjust skip when fetchAll is true
  }

  try {
    let posts;
    let count;

    if (fetchAll === 'true') {
      // If fetchAll is true, fetch all posts without pagination
      posts = await prisma.post.findMany({
        where: query.where,
      });
      count = await prisma.post.count({ where: query.where }); // Retrieve total count without pagination
    } else {
      // Otherwise, paginate the results
      [posts, count] = await prisma.$transaction([
        prisma.post.findMany(query),
        prisma.post.count({ where: query.where }),
      ]);
    }

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
  const session = await auth();

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
