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
    <div className="animate-slide-up">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl sm:text-4xl font-serif font-medium leading-tight tracking-tight mt-16 mb-6 text-foreground">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl sm:text-3xl font-serif font-medium leading-tight tracking-tight mt-14 mb-5 text-foreground">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl sm:text-2xl font-serif font-medium leading-snug mt-10 mb-4 text-foreground">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-serif font-medium mt-8 mb-3 text-foreground">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-[17px] leading-[1.85] font-light text-foreground/80 mb-6">
              {children}
            </p>
          ),
          img: ({ src, alt }) => (
            <figure className="my-10">
              <img src={src} alt={alt} className="rounded-md w-full" />
              {alt && (
                <figcaption className="mt-3 text-xs font-sans uppercase tracking-[0.15em] text-foreground/40 text-center">
                  {alt}
                </figcaption>
              )}
            </figure>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-6 space-y-2 text-[17px] leading-[1.8] font-light text-foreground/80 marker:text-foreground/30">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 mb-6 space-y-2 text-[17px] leading-[1.8] font-light text-foreground/80 marker:text-foreground/30">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          hr: () => (
            <hr className="my-12 border-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
          ),
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            return isInline ? (
              <code
                className="px-1.5 py-0.5 rounded bg-muted text-[0.9em] font-mono text-foreground"
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
            <pre className="bg-muted/60 border border-border/50 p-4 rounded-md overflow-x-auto my-6 text-sm leading-relaxed">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-foreground/30 pl-6 my-8 font-serif italic text-[18px] leading-[1.7] text-foreground/75">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground transition-colors"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-medium text-foreground">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
        }}
      >
        {post.content}
      </ReactMarkdown>
    </div>
  );
};

export default MDXBlogPost;
