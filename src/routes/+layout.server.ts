import type { Post } from "$types/CMSTypes";

export interface PageData {
  posts: Post[];
}

const fakepost: Post = {
  id: "fake",
  title: "Fake Post: TODO: make a post 🤣",
  slug: "fake-post",
  status: "published",
  createdAt: "2021-01-01T00:00:00.000Z",
  updatedAt: "2021-01-01T00:00:00.000Z",
  publishedDate: "2021-01-01T00:00:00.000Z",
};
const fakedisabledpost: Post = {
  id: "fake-disabled",
  title: "Fake Disabled Post",
  slug: "fake-disabled-post",
  status: "draft",
  createdAt: "2021-01-01T00:00:00.000Z",
  updatedAt: "2021-01-01T00:00:00.000Z",
  publishedDate: "2021-01-01T00:00:00.000Z",
};

export const load = async () => {
  let posts: Post[] = [];

  try {
    posts = [fakepost, fakedisabledpost];
  } catch (error) {
    console.error(error);
  }

  return {
    posts,
  };
};
