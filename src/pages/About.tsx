import Navigation from "@/components/Navigation";
interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  logo: string;
  type: 'experience' | 'education';
  companyUrl?: string;
}

const About = () => {
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      title: "Co-Founder",
      company: "TableSwap",
      period: "Jun 2025 - Present",
      description: "Need a Table?",
      logo: "https://dsuvgkohymnkfhxhcvja.supabase.co/storage/v1/object/sign/logo/TsLogoBlack.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kYWMyYjQ2NC04NmZhLTQyZjktOWFiNy1hZGVkODljNWIwYWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvL1RzTG9nb0JsYWNrLnBuZyIsImlhdCI6MTc2NzgxNzE0MSwiZXhwIjoyMDgzMTc3MTQxfQ.ONRNZ51qKchh1gomoNBecAKR_NSAFqvuDqph8rCYdFc",
      type: 'experience',
      companyUrl: "https://tableswap.app/"
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
      description: "Learned a bunch of things about private markets, and automated the end-to-end pipeline of the operations team to streamline the onboarding of LPs.",
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

  const renderEntry = (exp: ExperienceItem, index: number) => (
    <div
      key={exp.id}
      className="group animate-slide-up flex gap-6"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="flex-shrink-0 w-11 h-11 bg-card border border-border rounded-sm overflow-hidden flex items-center justify-center">
        {exp.logo.startsWith('http') ? (
          <img
            src={exp.logo}
            alt={`${exp.company} logo`}
            className="w-full h-full object-contain"
          />
        ) : (
          <span className="text-xs font-medium text-foreground">{exp.logo}</span>
        )}
      </div>
      <div className="flex-grow space-y-1.5 pb-8 border-b border-border/50 last:border-0">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
          <h3 className="text-lg font-serif font-medium">{exp.title}</h3>
          <span className="text-xs font-sans uppercase tracking-[0.1em] text-muted-foreground">
            {exp.period}
          </span>
        </div>
        <p className="text-sm font-medium text-foreground/80">
          {exp.companyUrl ? (
            <a
              href={exp.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors duration-300 underline underline-offset-2 decoration-border hover:decoration-foreground"
            >
              {exp.company}
            </a>
          ) : (
            exp.company
          )}
        </p>
        <p className="text-muted-foreground leading-relaxed font-light text-sm pt-1">
          {exp.description}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background grain">
      <Navigation />

      <main className="max-w-3xl mx-auto px-5 sm:px-6 md:px-12 pt-24 sm:pt-32 pb-24">
        <div className="space-y-14 sm:space-y-20">
          {/* Header */}
          <section className="space-y-4 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium">About Me</h1>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Currently building the best concierge service.
            </p>
          </section>

          {/* Experience */}
          <section className="space-y-10">
            <h2 className="text-sm font-sans uppercase tracking-[0.2em] text-muted-foreground">
              Experience
            </h2>
            <div className="space-y-8">
              {experiences.filter(exp => exp.type === 'experience').map((exp, index) => renderEntry(exp, index))}
            </div>
          </section>

          {/* Education */}
          <section className="space-y-10">
            <h2 className="text-sm font-sans uppercase tracking-[0.2em] text-muted-foreground">
              Education
            </h2>
            <div className="space-y-8">
              {experiences.filter(exp => exp.type === 'education').map((exp, index) => renderEntry(exp, index))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default About;
