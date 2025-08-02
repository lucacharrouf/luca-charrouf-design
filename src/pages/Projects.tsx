import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

const Projects = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with modern payment integration",
      longDescription: "A comprehensive e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, product catalog, shopping cart, order management, and Stripe payment integration. Deployed on AWS with CI/CD pipeline.",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS", "Docker"],
      liveUrl: "https://demo-ecommerce.com",
      githubUrl: "https://github.com/luca/ecommerce-platform",
      featured: true
    },
    {
      id: 2,
      title: "AI-Powered Analytics Dashboard",
      description: "Machine learning dashboard for business intelligence and insights",
      longDescription: "An intelligent analytics dashboard that uses machine learning to provide actionable business insights. Built with Python, React, and TensorFlow. Features predictive analytics, automated reporting, and real-time data visualization.",
      technologies: ["React", "Python", "TensorFlow", "D3.js", "FastAPI", "Redis"],
      liveUrl: "https://analytics-dashboard.com",
      githubUrl: "https://github.com/luca/ai-analytics",
      featured: true
    },
    {
      id: 3,
      title: "Task Management App",
      description: "Collaborative project management tool with real-time updates",
      longDescription: "A modern task management application with real-time collaboration features. Built with React, Socket.io, and MongoDB. Includes drag-and-drop kanban boards, team collaboration, time tracking, and notifications.",
      technologies: ["React", "Socket.io", "MongoDB", "Express", "Tailwind CSS"],
      githubUrl: "https://github.com/luca/task-manager",
      featured: false
    },
    {
      id: 4,
      title: "Personal Finance Tracker",
      description: "Smart budgeting app with expense categorization and insights",
      longDescription: "A personal finance management tool that automatically categorizes expenses and provides spending insights. Features bank account integration, budget tracking, financial goal setting, and expense analysis with charts and reports.",
      technologies: ["React Native", "Node.js", "PostgreSQL", "Plaid API", "Chart.js"],
      liveUrl: "https://finance-tracker.app",
      featured: false
    }
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container max-w-6xl mx-auto px-4 py-16">
        <div className="space-y-16">
          {/* Header */}
          <section className="text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold">Projects</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A collection of projects I've built, from full-stack web applications 
              to mobile apps and AI-powered solutions.
            </p>
          </section>

          {/* Featured Projects */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {featuredProjects.map((project, index) => (
                <Card 
                  key={project.id} 
                  className="experience-card animate-slide-up h-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <CardTitle className="text-2xl">{project.title}</CardTitle>
                    <CardDescription className="text-base">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {project.longDescription}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-3 pt-2">
                      {project.liveUrl && (
                        <Button size="sm" className="flex items-center gap-2" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button size="sm" variant="outline" className="flex items-center gap-2" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                            Source Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Other Projects */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold">Other Projects</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {otherProjects.map((project, index) => (
                <Card 
                  key={project.id} 
                  className="experience-card animate-slide-up"
                  style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
                >
                  <CardHeader>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.longDescription}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-3 pt-2">
                      {project.liveUrl && (
                        <Button size="sm" variant="outline" className="flex items-center gap-2" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            Demo
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button size="sm" variant="ghost" className="flex items-center gap-2" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                            Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Projects;
