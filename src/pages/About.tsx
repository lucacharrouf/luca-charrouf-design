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
      title: "Co-Founder",
      company: "TableSwap",
      period: "Jun 2025 - Present",
      description: "Currently building the future of table management.",
      logo: "https://dsuvgkohymnkfhxhcvja.supabase.co/storage/v1/object/sign/logo/TsLogoBlack.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kYWMyYjQ2NC04NmZhLTQyZjktOWFiNy1hZGVkODljNWIwYWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvL1RzTG9nb0JsYWNrLnBuZyIsImlhdCI6MTc2NzgxNzE0MSwiZXhwIjoyMDgzMTc3MTQxfQ.ONRNZ51qKchh1gomoNBecAKR_NSAFqvuDqph8rCYdFc",
      type: 'experience'
    },
    {
      id: 2,
      title: "Research Assistant",
      company: "UC Berkeley, Haas School of Business",
      period: "Aug 2024 - Aug 2025",
      description: "Interviewed 15+ product managers from Fortune 500 companies to understand teaming and stakeholder management challenges.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Berkeley-haas-wordmark_square-gold-white-on-blue_%281%29.png",
      type: 'experience'
    },
    {
      id: 3,
      title: "Product",
      company: "Alice.tech (YCW25)",
      period: "Jan 2025 - Jul 2025",
      description: "Joined during YC W25 batch. Lead the US expansion and acquired the first 500 users by implementing key features to compete with US competitors. Left because the company decided to move back to Europe.",
      logo: "https://media.licdn.com/dms/image/v2/D4D0BAQFvxeZVOMja5g/company-logo_200_200/B4DZqR7M2yHwAI-/0/1763384807374/alice_tech_logo?e=2147483647&v=beta&t=f5_b-Lq7gb80zE8oZd1go4uzHeEC7o8_-KJTEu5Ttbg",
      type: 'experience'
    },
    {
      id: 4,
      title: "Product",
      company: "PM Alpha",
      period: "May 2023 - May 2024",
      description: "Learned a bunch of things about private markets, and automated the end-to-end pipeline of the operatiosn team to stramline the onboarding of LPs.",
      logo: "https://media.licdn.com/dms/image/v2/C4D0BAQFgy83hEV5gdw/company-logo_200_200/company-logo_200_200/0/1645027063266/privatemarketalpha_logo?e=2147483647&v=beta&t=sAatMY5Sm0Ji4iNnHHSwGPEMStBe5FdgcZurQ6RRGNs",
      type: 'experience'
    },
    {
      id: 6,
      title: "Computer Science",
      company: "UC Berkeley",
      period: "2024 - 2025",
      description: "Focused on technical skills: Machine Learning, Computer Vision, Data Science, Algorithms, and Data Structures.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Seal_of_University_of_California%2C_Berkeley.svg/1200px-Seal_of_University_of_California%2C_Berkeley.svg.png",
      type: 'education'
    },
    {
      id: 7,
      title: "Computer Science",
      company: "Chinese University of Hong Kong",
      period: "2023",
      description: "Engineering classes and a lot of dim sum.",
      logo: "https://international-sustainable-campus-network.org/wp-content/uploads/2020/08/The-Chinese-University-of-Hong-Kong_logo.png",
      type: 'education'
    },
    {
      id: 8,
      title: "Management, First-Class Honours",
      company: "University of Westminster",
      period: "2021 - 2024",
      description: "Semifinalist at Big Idea Competition. Prototyped digital identity wallet for micro-credentials.",
      logo: "https://media.licdn.com/dms/image/v2/D4E0BAQGTIRfpCmHT4w/company-logo_200_200/company-logo_200_200/0/1688462912111/university_of_westminster_logo?e=2147483647&v=beta&t=edauuaxd33WOsslt1Kal8nLBuemJ_tIABvhSPsZ4ALQ",
      type: 'education'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-16">
          {/* Header */}
          <section className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold">About Me</h1>
            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
              Currently building the best concierge service.
            </p>
          </section>

          {/* Experience */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold">Experience</h2>
            <div className="space-y-6">
              {experiences.filter(exp => exp.type === 'experience').map((exp, index) => (
                <Card 
                  key={exp.id} 
                  className="experience-card animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center border border-border overflow-hidden">
                      {exp.logo.startsWith('http') ? (
                        <img 
                          src={exp.logo} 
                          alt={`${exp.company} logo`}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-sm font-bold text-primary">{exp.logo}</span>
                      )}
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
            <h2 className="text-3xl font-bold">Education</h2>
            <div className="space-y-6">
              {experiences.filter(exp => exp.type === 'education').map((exp, index) => (
                <Card 
                  key={exp.id} 
                  className="experience-card animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center border border-border overflow-hidden">
                        {exp.logo.startsWith('http') ? (
                          <img 
                            src={exp.logo} 
                            alt={`${exp.company} logo`}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <span className="text-sm font-bold text-primary">{exp.logo}</span>
                        )}
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
        </div>
      </main>
    </div>
  );
};

export default About;