export interface GenericPostBlock {
  type: "h2" | "p" | "link" | "ul" | "ol" | "li";
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
