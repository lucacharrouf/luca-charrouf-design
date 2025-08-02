import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  logo: string;
  type: 'experience' | 'education';
}

const About = () => {
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      period: "Jan 2024 - Present",
      description: "Leading frontend development for cutting-edge web applications. Architecting scalable React solutions and mentoring junior developers.",
      logo: "TC",
      type: 'experience'
    },
    {
      id: 2,
      title: "Product Manager Intern",
      company: "Innovation Labs",
      period: "Jun 2023 - Dec 2023",
      description: "Drove product strategy for AI-powered solutions. Collaborated with cross-functional teams to deliver user-centric features that increased engagement by 40%.",
      logo: "IL",
      type: 'experience'
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "StartupXYZ",
      period: "Jan 2023 - May 2023",
      description: "Built end-to-end web applications using React, Node.js, and PostgreSQL. Implemented CI/CD pipelines and reduced deployment time by 60%.",
      logo: "SX",
      type: 'experience'
    },
    {
      id: 4,
      title: "Computer Science, B.S.",
      company: "MIT",
      period: "2020 - 2024",
      description: "Specialized in Machine Learning and Software Engineering. Graduated Summa Cum Laude with a focus on AI applications in web development.",
      logo: "MIT",
      type: 'education'
    }
  ];

  const skills = [
    "React", "TypeScript", "Node.js", "Python", "PostgreSQL", 
    "AWS", "Docker", "GraphQL", "REST APIs", "Agile/Scrum",
    "Product Strategy", "User Research", "Data Analysis"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-16">
          {/* Header */}
          <section className="text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold">About Me</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              I'm a passionate software engineer and product manager with a love for creating 
              innovative solutions. My journey spans across full-stack development, AI research, 
              and product strategy, always with a focus on user-centric design and scalable architecture.
            </p>
          </section>

          {/* Experience */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-center">Experience</h2>
            <div className="space-y-6">
              {experiences.filter(exp => exp.type === 'experience').map((exp, index) => (
                <Card 
                  key={exp.id} 
                  className="experience-card animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center border border-border">
                        <span className="text-sm font-bold text-primary">{exp.logo}</span>
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                          <h3 className="text-xl font-semibold">{exp.title}</h3>
                          <Badge variant="secondary" className="w-fit mt-1 md:mt-0">
                            {exp.period}
                          </Badge>
                        </div>
                        <p className="text-primary font-medium mb-3">{exp.company}</p>
                        <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-center">Education</h2>
            <div className="space-y-6">
              {experiences.filter(exp => exp.type === 'education').map((exp, index) => (
                <Card 
                  key={exp.id} 
                  className="experience-card animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center border border-border">
                        <span className="text-sm font-bold text-primary">{exp.logo}</span>
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                          <h3 className="text-xl font-semibold">{exp.title}</h3>
                          <Badge variant="secondary" className="w-fit mt-1 md:mt-0">
                            {exp.period}
                          </Badge>
                        </div>
                        <p className="text-primary font-medium mb-3">{exp.company}</p>
                        <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-center">Skills & Technologies</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {skills.map((skill, index) => (
                <Badge 
                  key={skill} 
                  variant="outline" 
                  className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors duration-200 animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default About;