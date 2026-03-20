import { useEffect, useState, useRef } from "react";

interface Props {
  itemSelector: string;
  locations: { name: string; coords: [number, number] }[];
}

const LiveLocation = ({ itemSelector, locations }: Props) => {
  const [currentLoc, setCurrentLoc] = useState<{ name: string; coords: [number, number] } | null>(null);
  const [visible, setVisible] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const lastNameRef = useRef("");

  // Track which feed item is most in view
  useEffect(() => {
    const items = document.querySelectorAll(itemSelector);
    if (!items.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        let best: { index: number; ratio: number } | null = null;
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-feed-index"));
          if (isNaN(idx)) return;
          if (!best || entry.intersectionRatio > best.ratio) {
            best = { index: idx, ratio: entry.intersectionRatio };
          }
        });
        if (best && best.ratio > 0.15) {
          const loc = locations[best.index];
          if (loc && loc.name && loc.name !== lastNameRef.current) {
            lastNameRef.current = loc.name;
            setCurrentLoc(loc);
            setAnimKey((k) => k + 1);
          }
          setVisible(true);
        }
      },
      { threshold: [0, 0.15, 0.3, 0.5, 0.7, 1] }
    );

    items.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [itemSelector, locations]);

  // Hide when scrolled back above feed — throttled via rAF
  useEffect(() => {
    let raf: number;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const firstItem = document.querySelector(itemSelector);
        if (!firstItem) return;
        const rect = firstItem.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
          setVisible(false);
          lastNameRef.current = "";
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [itemSelector]);

  return (
    <div
      className={`fixed right-4 sm:right-6 md:right-10 bottom-6 sm:bottom-8 z-40 pointer-events-none transition-all duration-700 ease-out hidden sm:block ${
        visible && currentLoc ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="pointer-events-auto flex flex-col items-end gap-1.5">
        {/* Coordinates */}
        {currentLoc?.coords && (
          <div key={`coords-${animKey}`} className="text-[10px] font-mono tabular-nums text-foreground/15 tracking-wider animate-fade-in">
            {currentLoc.coords[0].toFixed(4)}&deg;N, {Math.abs(currentLoc.coords[1]).toFixed(4)}&deg;{currentLoc.coords[1] >= 0 ? "E" : "W"}
          </div>
        )}

        {/* City name */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground/15" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground/25" />
          </span>
          <span key={`name-${animKey}`} className="text-[11px] font-sans uppercase tracking-[0.25em] text-foreground/30 animate-fade-in">
            {currentLoc?.name}
          </span>
        </div>

        <div className="w-px h-6 bg-gradient-to-t from-foreground/10 to-transparent self-end mr-[3px]" />
      </div>
    </div>
  );
};

export default LiveLocation;
