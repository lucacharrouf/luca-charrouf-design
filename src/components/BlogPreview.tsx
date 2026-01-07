import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

const BlogPreview = () => {
  // Get the two most recent posts
  const recentPosts = blogPosts.slice(0, 2);

  return (
    <section className="py-16 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My thoughts</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            my ideas, learning and experiments
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {recentPosts.map((post, index) => (
            <Card 
              key={post.id} 
              className="experience-card animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle className="hover:text-primary transition-colors duration-200">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {post.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" className="hero-button-outline">
            <Link to="/blog">View All Posts</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;