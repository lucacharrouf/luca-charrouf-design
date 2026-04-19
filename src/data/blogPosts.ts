export interface BlogPost {
  title: string;
  description: string;
  date: string;
  readTime: string;
  slug: string;
  tags: string[];
  content: string;
  draft?: boolean;
  isMDX?: boolean;
  featuredImage?: string;
}
