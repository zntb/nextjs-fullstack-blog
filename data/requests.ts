const domain = process.env.NEXT_PUBLIC_APP_URL;

// Fetch all posts
export const getAllPosts = async () => {
  try {
    if (!domain) {
      return [];
    }
    const res = await fetch(`${domain}/api/posts`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Fetch a single post
export const fetchPost = async (slug: string) => {
  if (!domain) {
    return null;
  }
  try {
    const res = await fetch(`${domain}/api/posts/${slug}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch post');
    }

    const data = await res.json();

    // if (!data) {
    //   return null;
    // }

    // console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Fetch a current user's posts
export const getUserPosts = async (page: number, email: string) => {
  if (!domain) {
    return [];
  }
  try {
    const res = await fetch(`${domain}/api/posts?page=${page}&user=${email}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deleteComment = async (id: string) => {
  if (!domain) {
    return null;
  }
  try {
    const res = await fetch(`${domain}/api/comments/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Failed to delete comment');
    }
    const data = await res.json();

    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
