import Navigation from "@/components/Navigation";
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

  return (
    <div className="min-h-screen bg-background grain">
      <Navigation />

      <main className="max-w-3xl mx-auto px-5 sm:px-6 md:px-12 pt-24 sm:pt-32 pb-24">
        <div className="space-y-12 sm:space-y-16">
          {/* Header */}
          <section className="space-y-4 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium">Projects</h1>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              A bunch of random projects and interesting learnings (More to be added soon).
            </p>
          </section>

          <div className="w-full h-px bg-border" />

          {/* Featured Projects */}
          <section className="space-y-16">
            {featuredProjects.map((project, index) => (
              <article
                key={project.id}
                className="group animate-slide-up space-y-5"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-medium leading-snug">
                  {project.title}
                </h2>
                <p className="text-muted-foreground font-light leading-relaxed">
                  {project.longDescription}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-sans uppercase tracking-[0.1em] text-muted-foreground border border-border px-3 py-1 rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.15em] text-foreground hover:opacity-70 transition-opacity duration-300"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.15em] text-foreground hover:opacity-70 transition-opacity duration-300"
                    >
                      <Github className="h-3.5 w-3.5" />
                      Source
                    </a>
                  )}
                </div>

                {index < featuredProjects.length - 1 && (
                  <div className="w-full h-px bg-border mt-8" />
                )}
              </article>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Projects;
