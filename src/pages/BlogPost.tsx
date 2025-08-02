import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

interface BlogPostData {
  [key: string]: {
    title: string;
    date: string;
    readTime: string;
    content: string;
  };
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const blogPosts: BlogPostData = {
    "building-scalable-react-applications": {
      title: "Building Scalable React Applications",
      date: "2025-01-15",
      readTime: "8 min",
      content: `
        This is a detailed guide on building scalable React applications.
        
        ## Introduction
        
        In this post, we'll explore the best practices for architecting large-scale React applications with modern tooling and patterns.
        
        ## Key Concepts
        
        - Component Architecture
        - State Management
        - Performance Optimization
        - Code Organization
        
        ## Conclusion
        
        Building scalable applications requires careful planning and adherence to best practices.
      `
    },
    "future-ai-product-development": {
      title: "The Future of AI in Product Development",
      date: "2025-01-10",
      readTime: "6 min",
      content: `
        Exploring how artificial intelligence is transforming product management and development cycles.
        
        ## The Current Landscape
        
        AI is rapidly changing how we approach product development, from user research automation to predictive analytics.
        
        ## Key Areas of Impact
        
        - User Research Automation
        - Predictive Analytics
        - Automated Testing
        - Personalization at Scale
        
        ## Looking Forward
        
        The future holds even more exciting possibilities for AI-driven product development.
      `
    },
    "optimizing-database-performance": {
      title: "Optimizing Database Performance at Scale",
      date: "2025-01-05",
      readTime: "12 min",
      content: `
        A comprehensive guide to PostgreSQL optimization techniques for high-traffic applications.
        
        ## Performance Fundamentals
        
        Understanding database performance starts with proper indexing and query optimization.
        
        ## Advanced Techniques
        
        - Connection Pooling
        - Query Optimization
        - Index Strategies
        - Monitoring and Alerting
        
        ## Real-World Examples
        
        Case studies from production environments demonstrate these concepts in action.
      `
    },
    "modern-css-grid-vs-flexbox": {
      title: "Modern CSS: Grid vs Flexbox",
      date: "2024-12-28",
      readTime: "5 min",
      content: `
        A comprehensive comparison of CSS Grid and Flexbox layouts.
        
        ## When to Use Grid
        
        CSS Grid is perfect for two-dimensional layouts and complex design patterns.
        
        ## When to Use Flexbox
        
        Flexbox excels at one-dimensional layouts and component-level design.
        
        ## Practical Examples
        
        Real-world examples show how to choose between these powerful layout systems.
      `
    }
  };

  const post = slug ? blogPosts[slug] : null;

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