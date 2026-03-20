import { Link } from "react-router-dom";
import { useEffect, useRef, useState, memo, useCallback } from "react";
import LiveLocation from "./LiveLocation";

type FeedItem =
  | { type: "essay"; date: string; title: string; description: string; slug: string; location?: string; coords?: [number, number] }
  | { type: "thought"; date: string; text: string; location?: string; coords?: [number, number] }
  | { type: "image"; date: string; src: string; caption?: string; aspect?: "tall" | "wide" | "square" | "cinematic"; dominantColor: string; location?: string; coords?: [number, number] }
  | { type: "quote"; date: string; text: string; attribution?: string; location?: string; coords?: [number, number] }
  | { type: "link"; date: string; title: string; url: string; source: string; location?: string; coords?: [number, number] }
  | { type: "gallery"; date: string; images: { src: string; dominantColor: string }[]; caption?: string; location?: string; coords?: [number, number] }
  | { type: "repost"; date: string; comment: string; original: { author: string; handle?: string; date?: string; text: string; url?: string; source?: string; image?: string }; location?: string; coords?: [number, number] };

const feedItems: FeedItem[] = [
  {
    type: "image",
    date: "2026-03-18",
    src: "/lucaHK.png",
    caption: "Hong Kong, 2023 — the city that never sleeps, just naps between dim sum rounds",
    aspect: "cinematic",
    dominantColor: "180, 40%, 35%",
    location: "Hong Kong",
    coords: [22.3193, 114.1694],
  },
  {
    type: "repost",
    date: "2026-03-17",
    comment: "This is exactly the mindset behind TableSwap. Don't add more buttons — remove the friction entirely.",
    original: {
      author: "John Maeda",
      handle: "@johnmaeda",
      date: "2026-03-16",
      text: "The best technology disappears. It doesn't ask you to learn it — it just works, like a door handle.",
      url: "https://x.com/johnmaeda",
      source: "X",
    },
    location: "San Francisco",
    coords: [37.7749, -122.4194],
  },
  {
    type: "thought",
    date: "2026-03-15",
    text: "The best products I've used this year all had one thing in common — they removed features instead of adding them.",
    location: "San Francisco",
    coords: [37.7749, -122.4194],
  },
  {
    type: "essay",
    date: "2026-01-01",
    title: "6 months in building the best concierge service",
    description: "A bit of my journed from hackathon, to side project, to going all it, and now officialy running my company with my Cofounder.",
    slug: "6-months-in-tableswap",
    location: "San Francisco",
    coords: [37.7749, -122.4194],
  },
  {
    type: "image",
    date: "2026-02-10",
    src: "/LucaSF.jpg",
    caption: "San Francisco, early morning — before the fog rolls in",
    aspect: "wide",
    dominantColor: "210, 30%, 45%",
    location: "San Francisco",
    coords: [37.7749, -122.4194],
  },
  {
    type: "quote",
    date: "2026-02-20",
    text: "The best way to predict the future is to invent it.",
    attribution: "Alan Kay",
    location: "Berkeley",
    coords: [37.8716, -122.2727],
  },
  {
    type: "thought",
    date: "2026-02-05",
    text: "Spent the entire weekend reading about restaurant economics. The margins are brutal. No wonder most close in year one. This is exactly why TableSwap needs to exist.",
    location: "San Francisco",
    coords: [37.7749, -122.4194],
  },
  {
    type: "image",
    date: "2026-01-20",
    src: "/AnthropicHack.jpg",
    caption: "Anthropic MCP hackathon — Think Fast, Think Slow. 2 hours to build something that actually works.",
    aspect: "wide",
    dominantColor: "25, 35%, 40%",
    location: "San Francisco",
    coords: [37.7749, -122.4194],
  },
  {
    type: "link",
    date: "2026-01-28",
    title: "Why the future of dining is concierge-first",
    url: "https://tableswap.app",
    source: "tableswap.app",
    location: "San Francisco",
    coords: [37.7749, -122.4194],
  },
  {
    type: "thought",
    date: "2026-01-10",
    text: "Hot take: personal websites are underrated as a form of self-expression. Social media flattens everyone into the same template. Your own site is your own gallery.",
    location: "Berkeley",
    coords: [37.8716, -122.2727],
  },
  {
    type: "quote",
    date: "2025-12-30",
    text: "Simplicity is the ultimate sophistication.",
    attribution: "Leonardo da Vinci",
    location: "London",
    coords: [51.5074, -0.1278],
  },
  {
    type: "thought",
    date: "2025-12-15",
    text: "Berkeley taught me CS. Hong Kong taught me how to eat. London taught me how to think. San Francisco taught me how to build.",
    location: "San Francisco",
    coords: [37.7749, -122.4194],
  },
  {
    type: "essay",
    date: "2026-05-01",
    title: "My website is becoming my main communication channel",
    description: "I am testing something probably stupid, but still I am testing it. I want to centralized everything I would post on social media to my personal website.",
    slug: "experiement-website-as-social-media",
    location: "San Francisco",
    coords: [37.7749, -122.4194],
  },
];

// ─── Scroll-reveal hook ─────────────────────────────────
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

// ─── Parallax hook (ref-based, no re-renders) ───────────
function useParallax(speed = 0.15) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    let raf: number;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const viewH = window.innerHeight;
        const progress = (viewH - rect.top) / (viewH + rect.height);
        const offset = (progress - 0.5) * speed * rect.height;
        img.style.transform = `translateY(${offset}px) scale(1.1)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [speed]);

  return { containerRef, imgRef };
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

// ─── Subcomponents (memoized) ───────────────────────────

const DateStamp = memo(({ date }: { date: string }) => (
  <time className="block text-[11px] font-sans uppercase tracking-[0.2em] text-foreground/35">
    {formatDate(date)}
  </time>
));

const ImageCard = memo(({ item }: { item: Extract<FeedItem, { type: "image" }> }) => {
  const { containerRef, imgRef } = useParallax(0.2);
  const { ref: revealRef, visible } = useReveal<HTMLDivElement>();

  // Merge reveal ref into container via callback ref
  const mergedRef = useCallback((node: HTMLDivElement | null) => {
    (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    (revealRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
  }, [containerRef, revealRef]);

  const isCinematic = item.aspect === "cinematic";

  return (
    <div
      ref={mergedRef}
      className={`relative transition-all duration-[1.2s] ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {/* Adaptive background glow from image dominant color — contained */}
      <div
        className="absolute inset-0 rounded-full blur-[80px] sm:blur-[100px] opacity-[0.08] pointer-events-none transition-opacity duration-[2s] scale-150"
        style={{ background: `radial-gradient(ellipse, hsl(${item.dominantColor}) 0%, transparent 70%)` }}
      />

      <DateStamp date={item.date} />

      <div
        className={`mt-5 overflow-hidden rounded-sm ${
          isCinematic ? "-mx-5 sm:-mx-6 md:-mx-12" : ""
        }`}
      >
        <div
          className={`relative overflow-hidden bg-muted ${
            isCinematic
              ? "aspect-[4/3] sm:aspect-[16/9] md:aspect-[2.35/1]"
              : item.aspect === "tall"
              ? "aspect-[3/4] max-w-[min(24rem,100%)]"
              : item.aspect === "square"
              ? "aspect-square max-w-[min(28rem,100%)]"
              : "aspect-[16/10]"
          }`}
        >
          <img
            ref={imgRef}
            src={item.src}
            alt={item.caption || ""}
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out will-change-transform"
            loading="lazy"
          />
          {/* Cinematic bars */}
          {isCinematic && (
            <>
              <div className="absolute inset-x-0 top-0 h-1/6 bg-gradient-to-b from-background/60 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 via-background/30 to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background/40 to-transparent pointer-events-none" />
            </>
          )}
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.15)_100%)] pointer-events-none" />
        </div>
      </div>

      {item.caption && (
        <p className={`mt-5 text-[13px] font-serif italic text-foreground/45 leading-relaxed ${
          isCinematic ? "max-w-lg" : ""
        }`}>
          {item.caption}
        </p>
      )}
    </div>
  );
});

const ThoughtCard = memo(({ item }: { item: Extract<FeedItem, { type: "thought" }> }) => {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-[1s] ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <DateStamp date={item.date} />
      <div className="mt-5 relative">
        {/* Giant decorative quote mark */}
        <span className="absolute -top-8 -left-4 text-[120px] font-serif text-foreground/[0.03] leading-none select-none pointer-events-none">
          &ldquo;
        </span>
        <p className="text-lg sm:text-xl md:text-2xl font-light leading-[1.75] max-w-xl text-foreground/80 relative z-10">
          {item.text}
        </p>
      </div>
    </div>
  );
});

const EssayCard = memo(({ item }: { item: Extract<FeedItem, { type: "essay" }> }) => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-[1s] ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <DateStamp date={item.date} />

      <Link
        to={`/blog/${item.slug}`}
        className="block mt-5 group/essay relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Animated highlight bar on hover */}
        <div
          className="absolute -left-6 top-0 w-[3px] bg-foreground/20 rounded-full transition-all duration-700 ease-out"
          style={{
            height: hovered ? "100%" : "0%",
            opacity: hovered ? 1 : 0,
          }}
        />

        <div className="space-y-4">
          <span className="inline-block text-[10px] font-sans uppercase tracking-[0.25em] text-foreground/25 border border-foreground/10 px-3 py-1.5 transition-colors duration-500 group-hover/essay:border-foreground/25 group-hover/essay:text-foreground/40">
            Essay
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium leading-[1.15] max-w-xl transition-all duration-700 group-hover/essay:translate-x-2">
            {item.title}
          </h3>
          <p className="text-foreground/50 leading-[1.8] font-light max-w-lg text-[15px] transition-all duration-700 group-hover/essay:translate-x-2 group-hover/essay:text-foreground/65">
            {item.description}
          </p>
          <span className="inline-flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.2em] text-foreground/30 transition-all duration-500 group-hover/essay:text-foreground/60 group-hover/essay:gap-3">
            Continue reading
            <span className="inline-block transition-transform duration-500 group-hover/essay:translate-x-1">&rarr;</span>
          </span>
        </div>
      </Link>
    </div>
  );
});

const QuoteCard = memo(({ item }: { item: Extract<FeedItem, { type: "quote" }> }) => {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-[1.2s] ease-out ${
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-[0.98]"
      }`}
    >
      <DateStamp date={item.date} />

      <div className="mt-6 py-10 md:py-14 flex items-center justify-center">
        <div className="text-center max-w-lg space-y-5">
          <div className="mx-auto w-8 h-px bg-foreground/15" />
          <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif italic leading-[1.5] text-foreground/65">
            &ldquo;{item.text}&rdquo;
          </blockquote>
          {item.attribution && (
            <cite className="block text-[11px] font-sans uppercase tracking-[0.25em] text-foreground/30 not-italic">
              &mdash; {item.attribution}
            </cite>
          )}
          <div className="mx-auto w-8 h-px bg-foreground/15" />
        </div>
      </div>
    </div>
  );
});

const LinkCard = memo(({ item }: { item: Extract<FeedItem, { type: "link" }> }) => {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-[1s] ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <DateStamp date={item.date} />
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-5 group/link"
      >
        <div className="border border-foreground/[0.07] rounded-sm p-7 md:p-10 transition-all duration-700 hover:border-foreground/15 hover:bg-foreground/[0.02] relative overflow-hidden">
          {/* Animated shine effect on hover */}
          <div className="absolute inset-0 -translate-x-full group-hover/link:translate-x-full transition-transform duration-[1.2s] ease-out bg-gradient-to-r from-transparent via-foreground/[0.03] to-transparent pointer-events-none" />

          <p className="text-[11px] font-sans uppercase tracking-[0.2em] text-foreground/30 mb-3">
            {item.source}
          </p>
          <h3 className="text-lg md:text-xl font-serif font-medium leading-snug text-foreground/75 transition-colors duration-500 group-hover/link:text-foreground">
            {item.title}
            <span className="inline-block ml-2 transition-transform duration-500 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">&nearr;</span>
          </h3>
        </div>
      </a>
    </div>
  );
});

const RepostCard = memo(({ item }: { item: Extract<FeedItem, { type: "repost" }> }) => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const { original } = item;

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-[1s] ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <DateStamp date={item.date} />

      <div className="mt-5 space-y-5">
        {/* User's commentary */}
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-3.5 h-3.5 text-foreground/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="17 1 21 5 17 9" />
              <path d="M3 11V9a4 4 0 0 1 4-4h14" />
              <polyline points="7 23 3 19 7 15" />
              <path d="M21 13v2a4 4 0 0 1-4 4H3" />
            </svg>
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-foreground/30">
              Repost
            </span>
          </div>
          <p className="text-lg sm:text-xl font-light leading-[1.75] max-w-xl text-foreground/80">
            {item.comment}
          </p>
        </div>

        {/* Original post — nested card */}
        <div className="border border-foreground/[0.08] rounded-sm p-6 md:p-8 bg-foreground/[0.015] relative overflow-hidden group/repost">
          {original.url ? (
            <a href={original.url} target="_blank" rel="noopener noreferrer" className="block">
              <RepostOriginalContent original={original} linked />
            </a>
          ) : (
            <RepostOriginalContent original={original} />
          )}
        </div>
      </div>
    </div>
  );
});

const RepostOriginalContent = memo(({
  original,
  linked,
}: {
  original: Extract<FeedItem, { type: "repost" }>["original"];
  linked?: boolean;
}) => (
  <div className="space-y-3">
    <div className="flex items-center gap-3">
      <div className="flex flex-col">
        <span className={`text-[13px] font-medium text-foreground/70 ${linked ? "group-hover/repost:text-foreground transition-colors duration-500" : ""}`}>
          {original.author}
        </span>
        <div className="flex items-center gap-2">
          {original.handle && (
            <span className="text-[11px] font-sans text-foreground/30">
              {original.handle}
            </span>
          )}
          {original.source && (
            <span className="text-[10px] font-sans uppercase tracking-[0.15em] text-foreground/20">
              {original.source}
            </span>
          )}
          {original.date && (
            <span className="text-[10px] font-sans text-foreground/20">
              {formatDate(original.date)}
            </span>
          )}
        </div>
      </div>
      {linked && (
        <span className="ml-auto text-foreground/20 transition-all duration-500 group-hover/repost:text-foreground/50 group-hover/repost:translate-x-0.5 group-hover/repost:-translate-y-0.5">
          &nearr;
        </span>
      )}
    </div>
    <p className="text-[15px] leading-[1.8] text-foreground/55 font-light">
      {original.text}
    </p>
    {original.image && (
      <div className="mt-3 rounded-sm overflow-hidden">
        <img src={original.image} alt="" className="w-full object-cover max-h-48" loading="lazy" />
      </div>
    )}
  </div>
));

// ─── Main Feed ──────────────────────────────────────────

const Feed = () => {
  const locations = feedItems.map((item) => ({
    name: item.location || "",
    coords: item.coords || [0, 0] as [number, number],
  }));

  return (
    <>
      <LiveLocation itemSelector=".feed-item" locations={locations} />

      {/* The Feed */}
      <section className="relative max-w-3xl mx-auto px-5 sm:px-6 md:px-12 py-16 sm:py-24 pb-32">
        <div className="flex items-center gap-6 mb-20">
          <h2 className="text-[11px] font-sans uppercase tracking-[0.3em] text-foreground/30 whitespace-nowrap">
            The Feed
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
        </div>

        <div className="space-y-0">
          {feedItems.map((item, index) => (
            <div key={index} className="group relative feed-item" data-feed-index={index}>
              <div className="py-12 md:py-16">
                {item.type === "image" && <ImageCard item={item} />}
                {item.type === "thought" && <ThoughtCard item={item} />}
                {item.type === "essay" && <EssayCard item={item} />}
                {item.type === "quote" && <QuoteCard item={item} />}
                {item.type === "link" && <LinkCard item={item} />}
                {item.type === "repost" && <RepostCard item={item} />}
              </div>
              {/* Gradient divider */}
              {index < feedItems.length - 1 && (
                <div className="h-px bg-gradient-to-r from-transparent via-foreground/[0.06] to-transparent" />
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Feed;
