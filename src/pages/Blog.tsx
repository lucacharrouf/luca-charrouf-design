import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-12">
          {/* Header */}
          <section className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold">My thoughts</h1>
            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
              my ideas, learning and experiments
            </p>
          </section>

          {/* Blog Posts */}
          <section className="space-y-6">
            {blogPosts.map((post, index) => (
                <Card 
                  key={post.id} 
                  className="experience-card animate-slide-up hover:shadow-xl transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-2xl hover:text-primary transition-colors duration-200">
                      <Link to={`/blog/${post.slug}`} className="block">
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Blog;