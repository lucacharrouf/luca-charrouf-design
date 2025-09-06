import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

const Hero = () => {
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");

  const socialLinks = [
    { icon: Github, href: "https://github.com/lucacharrouf", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/lucacharrouf/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:lucacharrouf@gmail.com", label: "Email" },
  ];

  useEffect(() => {
    // Get the public URL for LucaBerkeley.jpg from the 'pics' bucket
    const { data } = supabase.storage.from("pics").getPublicUrl("LucaBerkeley.jpg");
    setProfileImageUrl(data.publicUrl);
  }, []);

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-4xl mx-auto">
        <div className="space-y-6 animate-fade-in">
          <div className="mx-auto w-48 h-48 border border-border overflow-hidden rounded-xl floating-image">
            <img
              src={profileImageUrl || "/placeholder.svg"}
              alt="Luca Charrouf"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-cyan via-tech-blue to-tech-purple animate-pulse-glow">
                Luca Charrouf
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              <span className="text-tech-cyan font-semibold">Software Engineer</span> & <span className="text-tech-blue font-semibold">Product Manager</span> passionate about building
              innovative solutions that make a difference.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center justify-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="social-button"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up">
          <Button asChild className="hero-button">
            <Link to="/projects">View Projects</Link>
          </Button>
          <Button asChild variant="outline" className="hero-button-outline">
            <Link to="/about">About Me</Link>
          </Button>
          <Button asChild variant="ghost" className="hero-button-ghost">
            <Link to="/blog">Read Blog</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;