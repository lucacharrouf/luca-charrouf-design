import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Feed from "@/components/Feed";

const Index = () => {
  return (
    <div className="min-h-screen bg-background grain">
      <Navigation />
      <Hero />
      <Feed />
    </div>
  );
};

export default Index;
