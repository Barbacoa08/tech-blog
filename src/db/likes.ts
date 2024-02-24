import { blogDb } from "$db/mongo";

export const likesCollection = blogDb.collection("likes");
