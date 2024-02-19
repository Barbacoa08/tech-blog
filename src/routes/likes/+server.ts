import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, getClientAddress }): Promise<Response> => {
  const { slug } = await request.json();

  return new Response(
    JSON.stringify({
      slug,
      getClientAddress: getClientAddress(),
      requestHeaders: request.headers,
    }),
  );
};
