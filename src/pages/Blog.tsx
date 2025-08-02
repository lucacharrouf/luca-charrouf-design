import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Clock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  readTime: string;
  slug: string;
  tags: string[];
}

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Building Scalable React Applications",
      description: "Exploring best practices for architecting large-scale React applications with modern tooling and patterns. We'll dive into component architecture, state management, and performance optimization techniques.",
      date: "2025-01-15",
      readTime: "8 min",
      slug: "building-scalable-react-applications",
      tags: ["React", "Architecture", "JavaScript"]
    },
    {
      id: 2,
      title: "The Future of AI in Product Development",
      description: "How artificial intelligence is transforming the way we approach product management and development cycles. From user research automation to predictive analytics in product planning.",
      date: "2025-01-10",
      readTime: "6 min",
      slug: "future-ai-product-development",
      tags: ["AI", "Product Management", "Strategy"]
    },
    {
      id: 3,
      title: "Optimizing Database Performance at Scale",
      description: "Deep dive into PostgreSQL optimization techniques for high-traffic applications. Learn about indexing strategies, query optimization, and connection pooling best practices.",
      date: "2025-01-05",
      readTime: "12 min",
      slug: "optimizing-database-performance",
      tags: ["Database", "PostgreSQL", "Performance"]
    },
    {
      id: 4,
      title: "Modern CSS: Grid vs Flexbox",
      description: "A comprehensive comparison of CSS Grid and Flexbox layouts. When to use each, their strengths and limitations, and practical examples for common design patterns.",
      date: "2024-12-28",
      readTime: "5 min",
      slug: "modern-css-grid-vs-flexbox",
      tags: ["CSS", "Frontend", "Design"]
    }
  ];

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-12">
          {/* Header */}
          <section className="text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold">Blog</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Thoughts on technology, product development, and the intersection 
              of innovation and human experience.
            </p>
          </section>

          {/* Search */}
          <section className="max-w-md mx-auto animate-slide-up">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50 border-border focus:bg-background transition-colors duration-200"
              />
            </div>
          </section>

          {/* Blog Posts */}
          <section className="space-y-6">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No posts found matching your search.</p>
              </div>
            ) : (
              filteredPosts.map((post, index) => (
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
              ))
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Blog;