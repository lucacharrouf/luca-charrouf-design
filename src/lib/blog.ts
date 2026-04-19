import { BlogPost } from '@/data/blogPosts';
import { parseMDX, mdxToBlogPost } from './mdx';

const postFiles = import.meta.glob('../content/blog/*.{md,mdx}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

let cachedPosts: BlogPost[] | null = null;

export function clearBlogPostsCache() {
  cachedPosts = null;
}

export function getAllBlogPosts(): BlogPost[] {
  if (cachedPosts) return cachedPosts;

  const posts: BlogPost[] = [];

  for (const [path, content] of Object.entries(postFiles)) {
    try {
      const post = mdxToBlogPost(parseMDX(content));
      if (post.draft) continue;
      posts.push(post);
    } catch (error) {
      console.error(`Error parsing blog file ${path}:`, error);
    }
  }

  cachedPosts = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return cachedPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((post) => post.slug === slug);
}
