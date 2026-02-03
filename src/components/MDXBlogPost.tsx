import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import type { BlogPost } from '@/data/blogPosts';
import 'highlight.js/styles/github.css';

interface MDXBlogPostProps {
  post: BlogPost;
}

const MDXBlogPost = ({ post }: MDXBlogPostProps) => {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none animate-slide-up">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-8 text-foreground">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-bold mt-6 mb-3 text-foreground">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="leading-relaxed text-muted-foreground mb-4">
              {children}
            </p>
          ),
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              className="rounded-lg my-6 w-full"
            />
          ),
          ul: ({ children }) => (
            <ul className="list-disc ml-6 mb-4 text-muted-foreground">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal ml-6 mb-4 text-muted-foreground">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="mb-2">{children}</li>
          ),
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            return isInline ? (
              <code
                className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primary hover:underline"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
        }}
      >
        {post.content}
      </ReactMarkdown>
    </div>
  );
};

export default MDXBlogPost;
