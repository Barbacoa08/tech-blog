export interface GenericPostBlock {
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "link" | "ul" | "ol" | "li";
  children: PostContent[];
}

export interface TextPostBlock {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
}

export interface LinkPostBlock extends GenericPostBlock {
  url: string;
  newTab?: boolean;
}

export type PostContent = GenericPostBlock & TextPostBlock & LinkPostBlock;
