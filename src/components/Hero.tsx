import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import profileImage from "@/assets/profile-image.jpg";

const Hero = () => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-4xl mx-auto">
        <div className="space-y-6 animate-fade-in">
          <div className="mx-auto w-48 h-48 rounded-full overflow-hidden border-4 border-border shadow-lg animate-float">
            <img
              src={profileImage}
              alt="Luca Charrouf"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Luca Charrouf
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Software Engineer & Product Manager passionate about building
              innovative solutions that make a difference.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <Button asChild className="hero-button">
            <Link to="/projects">View Projects</Link>
          </Button>
          <Button asChild variant="outline" className="hero-button-outline">
            <Link to="/about">About Me</Link>
          </Button>
          <Button asChild variant="ghost" className="hero-button-outline">
            <Link to="/blog">Read Blog</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;