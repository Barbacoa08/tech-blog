export interface Post {
  id: string;
  title?: string;
  slug?: string;
  // author?: User;
  publishedDate?: string;
  // tags?: Tag[];
  // content?: PostContent[];
  status?: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}
