import { dev } from "$app/environment";
import type { RequestHandler } from "@sveltejs/kit";

import { MONGODB_URI } from "$env/static/private";
import { MongoClient } from "mongodb";

interface User {
  ip: string;
  likes: number;
}
interface PostLike {
  slug: string;
  users: User[];
}

const LikeCollection = "likes";

export const POST: RequestHandler = async ({ request, getClientAddress }): Promise<Response> => {
  const likes = { total: 0, user: 0 };
  const ip = dev ? "localhost" : getClientAddress();
  const { slug } = await request.json();
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const likesCollection = client.db().collection(LikeCollection);
    const postLike = await likesCollection.findOne<PostLike>({ slug });

    if (!postLike) {
      likes.total = 1;
      likes.user = 1;
      await likesCollection.insertOne({ slug, users: [{ ip, likes: 1 }] } as PostLike);
    } else {
      likes.total = postLike ? postLike.users.reduce((prev, curr) => prev + curr.likes, 0) : 0;
      let user = postLike?.users.find((user) => user.ip === ip);

      if (user && user.likes < 5) {
        user.likes++;
        await likesCollection.updateOne({ slug }, { $set: { users: postLike.users } });
      } else if (user) {
        return new Response("You've reached the maximum number of likes. (5)", { status: 403 });
      } else {
        await likesCollection.updateOne(
          { slug },
          { $push: { users: { ip, likes: 1 } } },
          { upsert: true },
        );
        user = { ip, likes: 1 };
      }

      likes.total++;
      likes.user = user.likes ?? 0;
    }
  } catch (e) {
    console.error("Error", e);
  } finally {
    await client.close();
  }

  return new Response(JSON.stringify({ likes }));
};

export const GET: RequestHandler = async ({ url, getClientAddress }): Promise<Response> => {
  const likes = { total: 0, user: 0 };
  const ip = dev ? "localhost" : getClientAddress();
  const slug = url.searchParams.get("slug");
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const likesCollection = client.db().collection(LikeCollection);

    const postLike = await likesCollection.findOne<PostLike>({ slug });
    likes.total = postLike ? postLike.users.reduce((prev, curr) => prev + curr.likes, 0) : 0;
    likes.user = postLike?.users.find((user) => user.ip === ip)?.likes ?? 0;
  } catch (e) {
    console.error("Error", e);
  } finally {
    await client.close();
  }

  return new Response(JSON.stringify({ likes }));
};

export const DELETE: RequestHandler = async ({ request, getClientAddress }): Promise<Response> => {
  if (!dev) {
    return new Response("When not in dev mode, DELETE is an illegal action.", { status: 405 });
  }

  const ip = dev ? "localhost" : getClientAddress();
  const { slug } = await request.json();
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();

    const likesCollection = client.db().collection(LikeCollection);
    const post = await likesCollection.findOne<PostLike>({ slug });
    const updatedUsers = post?.users.filter((user) => user.ip !== ip);
    if (post && post.users.length > 0 && post.users.length !== updatedUsers?.length) {
      await likesCollection.updateOne({ slug }, { $set: { users: updatedUsers } });
    }
  } catch (e) {
    console.error("Error", e);
  } finally {
    await client.close();
  }

  return new Response();
};
