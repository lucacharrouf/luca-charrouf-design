import { BlogPost } from '@/data/blogPosts';
import { parseMDX, mdxToBlogPost } from './mdx';

// Manually import MDX files (glob import wasn't working)
import tableswapPost from '../content/blog/6-months-in-tableswap.mdx?raw';
import experimentPost from '../content/blog/experiement-website-as-social-media.mdx?raw';

// Map of MDX file imports
const mdxModules: Record<string, string> = {
  '../content/blog/6-months-in-tableswap.mdx': tableswapPost,
  '../content/blog/experiement-website-as-social-media.mdx': experimentPost,
};

// Cache for processed posts
let cachedPosts: BlogPost[] | null = null;

/**
 * Clear the blog posts cache (useful for development)
 */
export function clearBlogPostsCache() {
  cachedPosts = null;
}

/**
 * Get all blog posts from MDX files
 */
export function getAllBlogPosts(): BlogPost[] {
  if (cachedPosts) {
    return cachedPosts;
  }

  const posts: BlogPost[] = [];
  const isProduction = import.meta.env.PROD;

  // Debug: Log available MDX modules
  console.log('MDX modules found:', Object.keys(mdxModules));

  // Process all MDX files
  for (const [path, content] of Object.entries(mdxModules)) {
    try {
      const mdxPost = parseMDX(content);
      const blogPost = mdxToBlogPost(mdxPost);

      // Filter out drafts in production (show all in development)
      if (isProduction && blogPost.draft) {
        console.log(`Skipping draft in production: ${blogPost.title}`);
        continue;
      }
      
      console.log(`Adding post: ${blogPost.title} (draft: ${blogPost.draft})`);

      posts.push(blogPost);
    } catch (error) {
      console.error(`Error parsing MDX file ${path}:`, error);
    }
  }

  console.log(`Loaded ${posts.length} blog posts`);

  // Sort by date (newest first)
  cachedPosts = posts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return cachedPosts;
}

/**
 * Get a blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllBlogPosts();
  return posts.find(post => post.slug === slug);
}
