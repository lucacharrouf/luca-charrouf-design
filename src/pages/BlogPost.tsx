import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const post = blogPosts.find(p => p.slug === slug && p.active !== false);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
            <Button asChild variant="outline">
              <Link to="/blog">← Back to Blog</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container max-w-4xl mx-auto px-4 py-16">
        <article className="space-y-8">
          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-8">
            <Link to="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          {/* Header */}
          <header className="space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold">{post.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none animate-slide-up">
            <div className="space-y-6 text-foreground">
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.trim() === '') return null;
                
                if (paragraph.startsWith('##')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                      {paragraph.replace('##', '').trim()}
                    </h2>
                  );
                }
                
                if (paragraph.startsWith('-')) {
                  return (
                    <li key={index} className="ml-6 list-disc">
                      {paragraph.replace('-', '').trim()}
                    </li>
                  );
                }
                
                return (
                  <p key={index} className="leading-relaxed text-muted-foreground">
                    {paragraph.trim()}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <footer className="border-t border-border pt-8 mt-16">
            <div className="text-center">
              <Button asChild variant="outline">
                <Link to="/blog">← Read More Posts</Link>
              </Button>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
};

export default BlogPost;