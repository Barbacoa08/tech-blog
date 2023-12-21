import { error } from "@sveltejs/kit";
import type { Post } from "$types/payload-types.js";

export interface PageData {
  posts: Post[];
}

export const load = async ({ parent }) => {
  const { posts } = await parent();

  if (posts.length === 0) {
    throw error(503, "Server Error: No posts found");
  }

  return {
    posts: posts.slice(0, 5),
  } satisfies PageData;
};
