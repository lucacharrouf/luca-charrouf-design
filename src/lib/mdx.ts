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

const FRONTMATTER_RE = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/;

function parseValue(raw: string): unknown {
  const v = raw.trim();
  if (v === '') return '';
  if (v === 'true') return true;
  if (v === 'false') return false;
  if (v === 'null') return null;

  if (v.startsWith('[') && v.endsWith(']')) {
    const inner = v.slice(1, -1).trim();
    if (!inner) return [];
    return inner
      .split(',')
      .map((item) => parseValue(item))
      .filter((item) => item !== '');
  }

  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    return v.slice(1, -1);
  }

  return v;
}

function parseFrontmatter(block: string): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  for (const line of block.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1);
    if (!key) continue;
    data[key] = parseValue(value);
  }
  return data;
}

export function parseMDX(content: string): MDXPost {
  const normalized = content.replace(/^\uFEFF/, '');
  const match = normalized.match(FRONTMATTER_RE);

  if (!match) {
    return {
      frontmatter: {} as MDXFrontmatter,
      content: normalized,
    };
  }

  return {
    frontmatter: parseFrontmatter(match[1]) as unknown as MDXFrontmatter,
    content: match[2],
  };
}

export function extractFeaturedImage(content: string): string | undefined {
  const match = content.match(/!\[([^\]]*)\]\(([^)]+)\)/);
  return match ? match[2] : undefined;
}

export function mdxToBlogPost(mdxPost: MDXPost): import('@/data/blogPosts').BlogPost {
  const featuredImage =
    mdxPost.frontmatter.featuredImage || extractFeaturedImage(mdxPost.content);

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
