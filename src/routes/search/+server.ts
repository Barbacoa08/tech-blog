import { json } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";

import { getPosts } from "$lib/server/posts";
import type { Post } from "$types/payload-types";
import type { TermsResult } from "$types/SearchAPI";

/**
 * This call takes ~10ms
 *
 * It's not really necessary to make this its own function. This could easily
 * live in the `load` function, but I want to play with a `+server.ts` file and
 * see how it works.
 *
 * @returns {Promise<TermsResult[]>}
 */
export const GET = (async () => {
  let posts: Post[] = [];

  try {
    posts = await getPosts(fetch);
  } catch (error) {
    console.error(error);
  }

  const results: TermsResult[] = [
    { tags: ["site root"], title: "Home", url: "/" },
    { tags: ["posts root"], title: "Posts", url: "/post" },
    { tags: ["why this exists"], title: "About", url: "/about" },
  ] as TermsResult[];

  posts.forEach((post) => {
    const { title, slug, tags, status, publishedDate } = post;

    if (status === "published" && publishedDate && new Date(publishedDate) < new Date() && title) {
      results.push({
        title,
        url: `/post/${slug}`,
        tags: tags?.map((tag) => tag.name?.slice(6).toLowerCase() || "") || [],
      });
    }
  });

  return json(results);
}) satisfies RequestHandler;
