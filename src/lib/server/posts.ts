import { PAYLOAD_CMS_API_URL } from "$env/static/private";

import type { Fetch } from "$types/Fetch";
import type { Post } from "$types/payload-types";
import { error } from "@sveltejs/kit";

export const getPosts = async (fetch: Fetch) => {
  const postsResult = await fetch(`${PAYLOAD_CMS_API_URL}posts`);
  const postsData: { docs: Post[] } = await postsResult.json();
  const posts = postsData.docs
    .filter(
      (post) =>
        !!post.status && post.tags?.some((tag) => tag?.name?.toLowerCase().startsWith("tech:")),
    )
    .sort((a, b) => {
      return new Date(b.publishedDate || 0).getTime() - new Date(a.publishedDate || 0).getTime();
    });

  return posts;
};

export const getPost = async (fetch: Fetch, slug: string) => {
  const data = await fetch(`${PAYLOAD_CMS_API_URL}posts/?where[slug][equals]=${slug}`).then(
    async (res) => await res.json(),
  );

  if (!data || data.totalDocs !== 1) {
    throw error(404, `Post with slug "${slug}" not found`);
  }

  const post: Post = data.docs[0];

  return post;
};
