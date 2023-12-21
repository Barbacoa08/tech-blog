import { getPost } from "$lib/server/posts";

import type { Post } from "$types/payload-types";
import type { PageServerLoad } from "./$types";

export interface PageData {
  post: Post;
}

export const load: PageServerLoad = async ({ fetch, params }) =>
  ({
    post: await getPost(fetch, params.slug),
  }) satisfies PageData;
