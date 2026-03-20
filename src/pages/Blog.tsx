import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { getAllBlogPosts } from "@/lib/blog";
import { useEffect, useState } from "react";
import { BlogPost } from "@/data/blogPosts";

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const allPosts = getAllBlogPosts();
    setPosts(allPosts);
  }, []);

  return (
    <div className="min-h-screen bg-background grain">
      <Navigation />

      <main className="max-w-3xl mx-auto px-5 sm:px-6 md:px-12 pt-24 sm:pt-32 pb-24">
        <div className="space-y-12 sm:space-y-16">
          {/* Header */}
          <section className="space-y-4 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium">My thoughts</h1>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              my ideas, learning and experiments
            </p>
          </section>

          <div className="w-full h-px bg-border" />

          {/* Blog Posts */}
          <section className="space-y-16">
            {posts.map((post, index) => (
              <article
                key={post.slug}
                className="group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link to={`/blog/${post.slug}`} className="block space-y-4">
                  <div className="flex items-center gap-4 text-xs font-sans uppercase tracking-[0.15em] text-muted-foreground">
                    <time>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                    <span>&middot;</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-medium leading-snug group-hover:opacity-70 transition-opacity duration-300">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed font-light">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-sans uppercase tracking-[0.1em] text-muted-foreground border border-border px-3 py-1 rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </article>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Blog;
