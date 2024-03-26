import { dev } from "$app/environment";
import { likesCollection } from "$db/likes";

import type { RequestHandler } from "@sveltejs/kit";

import { DeviceUuid } from "./helper";

interface User {
  uuid: string;
  likes: number;
}
interface PostLike {
  slug: string;
  users: User[];
}

export const POST: RequestHandler = async ({ request, getClientAddress }): Promise<Response> => {
  const likes = { total: 0, user: 0 };
  const { slug } = await request.json();
  const uuid = dev
    ? "localhost"
    : await DeviceUuid(request.headers.get("user-agent") || "", getClientAddress());

  try {
    const postLike = await likesCollection.findOne<PostLike>({ slug });

    if (!postLike) {
      likes.total = 1;
      likes.user = 1;
      await likesCollection.insertOne({ slug, users: [{ uuid, likes: 1 }] } as PostLike);
    } else {
      likes.total = postLike ? postLike.users.reduce((prev, curr) => prev + curr.likes, 0) : 0;
      let user = postLike?.users.find((user) => user.uuid === uuid);

      if (user && user.likes < 5) {
        user.likes++;
        await likesCollection.updateOne({ slug }, { $set: { users: postLike.users } });
      } else if (user) {
        return new Response("You've reached the maximum number of likes. (5)", { status: 403 });
      } else {
        await likesCollection.updateOne(
          { slug },
          { $push: { users: { uuid, likes: 1 } as User } as unknown as undefined },
          { upsert: true },
        );
        user = { uuid, likes: 1 };
      }

      likes.total++;
      likes.user = user.likes ?? 0;
    }
  } catch (e) {
    return new Response("An error occurred while connecting to the DB.", { status: 500 });
  }

  return new Response(JSON.stringify({ likes }));
};

export const GET: RequestHandler = async ({
  request,
  url,
  getClientAddress,
}): Promise<Response> => {
  const likes = { total: 0, user: 0 };
  const slug = url.searchParams.get("slug");
  const uuid = dev
    ? "localhost"
    : await DeviceUuid(request.headers.get("user-agent") || "", getClientAddress());

  try {
    const postLike = await likesCollection.findOne<PostLike>({ slug });

    likes.total = postLike ? postLike.users.reduce((prev, curr) => prev + curr.likes, 0) : 0;
    likes.user = postLike?.users.find((user) => user.uuid === uuid)?.likes ?? 0;
  } catch (e) {
    return new Response("An error occurred while connecting to the DB.", { status: 500 });
  }

  return new Response(JSON.stringify({ likes }));
};

export const DELETE: RequestHandler = async ({ request }): Promise<Response> => {
  if (!dev) {
    return new Response("When not in dev mode, DELETE is an illegal action.", { status: 405 });
  }

  const uuid = "localhost"; // dev mode, we never delete a real user's like
  const { slug } = await request.json();

  try {
    const post = await likesCollection.findOne<PostLike>({ slug });
    const updatedUsers = post?.users.filter((user) => user.uuid !== uuid);
    if (post && post.users.length > 0 && post.users.length !== updatedUsers?.length) {
      await likesCollection.updateOne({ slug }, { $set: { users: updatedUsers } });
    }
  } catch (e) {
    return new Response("An error occurred while connecting to the DB.", { status: 500 });
  }

  return new Response();
};
