import { Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useRef, useCallback } from "react";

const Hero = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/lucacharrouf", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/lucacharrouf/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:lucacharrouf@gmail.com", label: "Email" },
  ];

  const imgRef = useRef<HTMLImageElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const rafRef = useRef(0);

  const applyTransform = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;
    const progress = Math.min(scrollRef.current / (window.innerHeight * 0.8), 1);
    const scale = 1.05 + progress * 0.08;
    const opacity = 1 - progress * 0.4;
    img.style.transform = `translate(${mouseRef.current.x}px, ${mouseRef.current.y}px) scale(${scale})`;
    img.style.opacity = String(opacity);
  }, []);

  // Mouse-tracking parallax — direct DOM writes, no re-render
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 20;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 10;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(applyTransform);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => { window.removeEventListener("mousemove", handleMouseMove); cancelAnimationFrame(rafRef.current); };
  }, [applyTransform]);

  // Scroll-based zoom + fade — direct DOM writes, no re-render
  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(applyTransform);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    applyTransform();
    return () => { window.removeEventListener("scroll", handleScroll); cancelAnimationFrame(rafRef.current); };
  }, [applyTransform]);

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Full-bleed hero image — THE centerpiece */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imgRef}
          src="/lucaHK.webp"
          alt="Luca Charrouf"
          className="w-full h-full object-cover object-[center_5%] sm:object-top will-change-transform"
          style={{
            transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-5 sm:px-6 md:px-12 pb-28 sm:pb-24 md:pb-28 max-w-3xl mx-auto w-full">
        <div className="space-y-5 sm:space-y-6">
          <h1
            className="text-[2.75rem] sm:text-6xl md:text-8xl lg:text-9xl font-serif font-medium tracking-[-0.03em] leading-[0.9] opacity-0 animate-fade-in"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            <span className="italic">Luca</span>
            <br />
            <span className="block mt-1">Charrouf</span>
          </h1>

          <p
            className="text-sm sm:text-base md:text-lg text-foreground/50 max-w-md leading-[1.8] sm:leading-[1.9] font-light opacity-0 animate-fade-in"
            style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
          >
            A little bit about me, my thoughts, and things I have done and learned in the last
            few years.
          </p>

          <div
            className="flex items-center gap-2.5 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-8 h-8 border border-foreground/10 hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-500 flex items-center justify-center rounded-sm"
              >
                <social.icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-3 opacity-0 animate-fade-in" style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}>
        <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-foreground/20">Explore</span>
        <div className="relative w-px h-10 bg-foreground/10 overflow-hidden">
          <div className="absolute top-0 w-full h-1/2 bg-foreground/30 animate-scroll-line" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
