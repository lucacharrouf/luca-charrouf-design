import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";

const BlogPreview = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable React Applications",
      description: "Exploring best practices for architecting large-scale React applications with modern tooling and patterns.",
      date: "2025-01-15",
      readTime: "8 min",
      slug: "building-scalable-react-applications"
    },
    {
      id: 2,
      title: "The Future of AI in Product Development",
      description: "How artificial intelligence is transforming the way we approach product management and development cycles.",
      date: "2025-01-10",
      readTime: "6 min",
      slug: "future-ai-product-development"
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Writing</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My thoughts on technology, product development, and the intersection
            of innovation and human experience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {blogPosts.map((post, index) => (
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