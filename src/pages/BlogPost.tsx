import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getBlogPostBySlug } from "@/lib/blog";
import MDXBlogPost from "@/components/MDXBlogPost";
import { useEffect, useState } from "react";
import type { BlogPost } from "@/data/blogPosts";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const foundPost = getBlogPostBySlug(slug);
      setPost(foundPost);
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background grain">
        <Navigation />
        <main className="max-w-3xl mx-auto px-5 sm:px-6 md:px-12 pt-24 sm:pt-32 pb-24">
          <p className="text-muted-foreground font-light">Loading...</p>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background grain">
        <Navigation />
        <main className="max-w-3xl mx-auto px-5 sm:px-6 md:px-12 pt-24 sm:pt-32 pb-24 text-center">
          <h1 className="text-4xl font-serif font-medium mb-4">Post Not Found</h1>
          <p className="text-muted-foreground font-light mb-8">The blog post you're looking for doesn't exist.</p>
          <Button asChild variant="outline" className="hero-button-outline">
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background grain">
      <Navigation />

      <main className="max-w-3xl mx-auto px-5 sm:px-6 md:px-12 pt-24 sm:pt-32 pb-24">
        <article className="space-y-10">
          {/* Back */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <ArrowLeft className="h-3 w-3" />
            Back
          </Link>

          {/* Header */}
          <header className="space-y-5 animate-fade-in">
            <div className="flex items-center gap-4 text-[11px] font-sans uppercase tracking-[0.15em] text-foreground/35">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <span className="w-1 h-1 rounded-full bg-foreground/20" />
              <div className="flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                {post.readTime}
              </div>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] tracking-tight">
              {post.title}
            </h1>
            <div className="w-12 h-px bg-foreground/15 mt-6" />
          </header>

          {/* Content */}
          {post.isMDX ? (
            <MDXBlogPost post={post} />
          ) : (
            <div className="animate-slide-up space-y-6">
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.trim() === '') return null;

                if (paragraph.startsWith('##')) {
                  return (
                    <h2 key={index} className="text-2xl font-serif font-medium mt-10 mb-4">
                      {paragraph.replace('##', '').trim()}
                    </h2>
                  );
                }

                if (paragraph.startsWith('-')) {
                  return (
                    <li key={index} className="ml-6 list-disc text-foreground/70 leading-[1.8] font-light">
                      {paragraph.replace('-', '').trim()}
                    </li>
                  );
                }

                return (
                  <p key={index} className="text-foreground/70 leading-[1.9] font-light text-[16px]">
                    {paragraph.trim()}
                  </p>
                );
              })}
            </div>
          )}

          {/* Footer */}
          <footer className="pt-16 mt-16">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-foreground/[0.06] to-transparent mb-10" />
            <div className="text-center">
              <Link
                to="/blog"
                className="text-[11px] font-sans uppercase tracking-[0.2em] text-foreground/40 hover:text-foreground transition-colors duration-300"
              >
                &larr; Read More Posts
              </Link>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
};

export default BlogPostPage;
