import { getPosts } from "$lib/server/posts";

import type { Post } from "$types/payload-types";

export interface PageData {
  posts: Post[];
}

export const load = async () => {
  let posts: Post[] = [];

  try {
    posts = await getPosts(fetch);
  } catch (error) {
    console.error(error);
  }

  return {
    posts,
  };
};
