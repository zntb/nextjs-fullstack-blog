'use server';

import { currentUser, currentUserEmail } from '@/lib/auth';
import { slugify } from '@/lib/utils';
import { PostSchema } from '@/schemas/post';
import prisma from '@/utils/connect';
import { revalidatePath } from 'next/cache';

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

export const createPost = async (formData: FormData) => {
  const values = Object.fromEntries(formData.entries());

  const { title, desc, img, catSlug } = PostSchema.parse(values);

  const userEmail = await currentUserEmail();

  if (!userEmail) {
    return { error: 'Not authenticated' };
  }

  const slug = slugify(title);
  let image = '';
  if (img) {
    image = img;
  }

  const post = await prisma.post.create({
    data: {
      title: title.trim(),
      desc,
      img: image,
      slug,
      catSlug,
      userEmail,
      createdAt: new Date(),
    },
  });

  revalidatePath(`/posts/${post.slug}`);

  return { success: 'Post created!' };
};
