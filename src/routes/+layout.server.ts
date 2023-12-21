import { PAYLOAD_CMS_API_URL } from "$env/static/private";

import type { Fetch } from "$types/Fetch";
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

const getPosts = async (fetch: Fetch) => {
  const postsResult = await fetch(`${PAYLOAD_CMS_API_URL}posts`);
  const postsData: { docs: Post[] } = await postsResult.json();
  const posts = postsData.docs
    .filter((post) => !!post.status && post.tags?.some((tag) => tag?.name?.startsWith("tech-")))
    .sort((a, b) => {
      return new Date(b.publishedDate || 0).getTime() - new Date(a.publishedDate || 0).getTime();
    });

  return posts;
};
