import { json } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";

import type { TermsResult } from "$types/SearchAPI";

export const GET = (async () => {
  return json([
    { tags: ["homepage", "root"], title: "Home", url: "/" },
    { tags: ["posts root"], title: "Posts", url: "/post" },
    { tags: ["why this exists"], title: "About", url: "/about" },
  ] as TermsResult[]);
}) satisfies RequestHandler;
