const domain = process.env.NEXT_PUBLIC_APP_URL;

export type Category = {
  id: string;
  slug: string;
  title: string;
  img?: string | null;
};

type Post = {
  id: string;
  createdAt: string;
  slug: string;
  title: string;
  desc: string;
  img?: string | null;
  catSlug: string;
  cat: Category;
  userEmail: string;
};

export const getCategories = async (): Promise<Category[]> => {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  try {
    const res = await fetch(`${domain}/api/categories`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllPosts = async (
  page: number,
  cat?: string
): Promise<{ posts: Post[]; count: number }> => {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  try {
    const res = await fetch(
      `${domain}/api/posts?page=${page}&cat=${cat || ''}`,
      {
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      throw new Error('Failed');
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return { posts: [], count: 0 };
  }
};

export const getUserPosts = async (
  page: number,
  userEmail: string
): Promise<{ posts: Post[]; count: number }> => {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  try {
    const res = await fetch(
      `${domain}/api/posts?page=${page}&user=${userEmail}`,
      {
        cache: 'no-store',
      }
    );
    if (!res.ok) {
      throw new Error('Failed');
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return { posts: [], count: 0 };
  }
};
