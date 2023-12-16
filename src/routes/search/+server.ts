import { json } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";

import type { TermsResult } from "$types/SearchAPI";

export const GET = (async () => {
  return json([
    { tags: [], title: "Home", url: "/" },
    { tags: [], title: "Posts placeholder", url: "/post" },
    { tags: [], title: "About", url: "/about" },
  ] as TermsResult[]);
}) satisfies RequestHandler;
