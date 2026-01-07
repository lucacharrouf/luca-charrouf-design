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
      title: "CS290: Skin Lesion Classification",
      description: "Traditional extraction methods vs neural networks for skin lesion classification",
      longDescription: "I used feature extraction and fitted the features in a random forest model that got a very similar accuracy to the results of a neural network. The main learning here is that most of the times, simpler and less complex learning techniques can we used to solve most of our problems and obtain the same results. This is also something I learned from my professor Hany Farid, that thought the class.",
      technologies: ["Random Forests", "CNN", "Image Classification"],
      githubUrl: "https://github.com/lucacharrouf/cs290-final-project",
      featured: true
    },
    {
      id: 2,
      title: "Text-to-Manim",
      description: "Convert mathematical concepts into nice animations",
      longDescription: "Math can be hard something, why don't we just visualize it? Inspired by the best math YT channel 3BlueBrown, I am reusing the library made, Manim, to generate scripts that explain math concepts like linear algebra.",
      technologies: ["Manim"],
      liveUrl: "https://visualize-mathematics.vercel.app/",
      // githubUrl: "https://github.com/luca/ai-analytics",
      featured: true
    },
    {
      id: 3,
      title: "Think Fast, Think Slow",
      description: "Using MCP to avoid LLMs to hallucinate",
      longDescription: "LLMs hallucinate, and sometimes they just seem very stupid. At the Anthropic hackaton, we used MCP to minimize errors with a model that first thinks fast (and likely hallucinates), and than thinks slow (double checks errors and fixes them). The intesting part is that the hackathon was a 2 hours one. I wrote an article about hackathons if you want to see how they are changing.",
      technologies: ["AI", "MCP"],
      liveUrl: "https://youtu.be/RxXlgq3fRNI", 
      featured: true
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
          <section className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold">Projects</h1>
            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
              A bunch of random projects and interesting learnings (More to be added soon).
            </p>
          </section>

          {/* Featured Projects */}
          <section className="space-y-8">
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

        </div>
      </main>
    </div>
  );
};

export default Projects;
