import { json } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";

import type { TermsResult } from "$types/SearchAPI";

export const GET = (async () => {
  return json([
    { tags: [], title: "About", url: "/about" },
    { tags: [], title: "Posts placeholder", url: "/post" },
  ] as TermsResult[]);
}) satisfies RequestHandler;
