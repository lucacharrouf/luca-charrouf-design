import matter from 'gray-matter';

export interface MDXFrontmatter {
  title: string;
  description: string;
  date: string;
  readTime: string;
  slug: string;
  tags: string[];
  draft?: boolean;
  featuredImage?: string;
}

export interface MDXPost {
  frontmatter: MDXFrontmatter;
  content: string;
}

/**
 * Parse MDX file content and extract frontmatter
 */
export function parseMDX(content: string): MDXPost {
  const { data, content: body } = matter(content);
  return {
    frontmatter: data as MDXFrontmatter,
    content: body,
  };
}

/**
 * Extract the first image from markdown content to use as featured image
 */
export function extractFeaturedImage(content: string): string | undefined {
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/;
  const match = content.match(imageRegex);
  return match ? match[2] : undefined;
}

/**
 * Transform MDX data to BlogPost format
 */
export function mdxToBlogPost(mdxPost: MDXPost): import('@/data/blogPosts').BlogPost {
  const featuredImage = mdxPost.frontmatter.featuredImage || 
    extractFeaturedImage(mdxPost.content);

  return {
    title: mdxPost.frontmatter.title,
    description: mdxPost.frontmatter.description,
    date: mdxPost.frontmatter.date,
    readTime: mdxPost.frontmatter.readTime,
    slug: mdxPost.frontmatter.slug,
    tags: mdxPost.frontmatter.tags,
    content: mdxPost.content,
    draft: mdxPost.frontmatter.draft,
    isMDX: true,
    featuredImage,
  };
}
