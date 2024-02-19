export async function POST({ request, getClientAddress }: Request): Promise<Response> {
  const { slug } = await request.json();

  return new Response(
    JSON.stringify({
      slug,
      getClientAddress: getClientAddress(),
      requestHeaders: request.headers,
    }),
  );
}
