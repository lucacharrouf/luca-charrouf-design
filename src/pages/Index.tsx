import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import BlogPreview from "@/components/BlogPreview";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <BlogPreview />
    </div>
  );
};

export default Index;
