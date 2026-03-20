import { useState, useRef, useEffect, useCallback } from "react";

interface Location {
  name: string;
  coords: [number, number];
  date: string;
}

interface Props {
  locations: Location[];
}

function project(lat: number, lng: number): [number, number] {
  const x = ((lng + 180) / 360) * 1000;
  const y = ((90 - lat) / 180) * 500;
  return [x, y];
}

const LocationMap = ({ locations }: Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { ref: containerRef, visible } = useReveal();

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current || !tooltipRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    tooltipRef.current.style.left = `${e.clientX - rect.left + 16}px`;
    tooltipRef.current.style.top = `${e.clientY - rect.top - 10}px`;
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative transition-all duration-[1.5s] ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <div className="relative overflow-hidden rounded-sm border border-foreground/[0.06] bg-foreground/[0.015]">
        <svg
          ref={svgRef}
          viewBox="0 0 1000 500"
          className="w-full h-auto"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Grid lines */}
          {Array.from({ length: 19 }, (_, i) => (
            <line key={`v${i}`} x1={(i + 1) * 50} y1={0} x2={(i + 1) * 50} y2={500} stroke="currentColor" strokeOpacity={0.03} strokeWidth={0.5} />
          ))}
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`h${i}`} x1={0} y1={(i + 1) * 50} x2={1000} y2={(i + 1) * 50} stroke="currentColor" strokeOpacity={0.03} strokeWidth={0.5} />
          ))}

          <WorldOutline />

          {/* Connection lines — animated dashes */}
          {locations.map((loc, i) => {
            if (i === 0) return null;
            const [x1, y1] = project(locations[i - 1].coords[0], locations[i - 1].coords[1]);
            const [x2, y2] = project(loc.coords[0], loc.coords[1]);
            const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            return (
              <line
                key={`line-${i}`}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="currentColor"
                strokeOpacity={0.1}
                strokeWidth={0.8}
                strokeDasharray="4 4"
              >
                <animate attributeName="stroke-dashoffset" from={length} to="0" dur="3s" fill="freeze" begin={`${i * 0.4}s`} />
              </line>
            );
          })}

          {/* Location pins */}
          {locations.map((loc, i) => {
            const [x, y] = project(loc.coords[0], loc.coords[1]);
            const isHovered = hoveredIndex === i;
            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                className="cursor-pointer"
              >
                {/* Outer pulse */}
                <circle cx={x} cy={y} r={isHovered ? 20 : 14} fill="currentColor" fillOpacity={isHovered ? 0.06 : 0.02} className="transition-all duration-500" />
                <circle cx={x} cy={y} r={isHovered ? 12 : 7} fill="currentColor" fillOpacity={isHovered ? 0.1 : 0.04} className="transition-all duration-500" />
                {/* Dot */}
                <circle cx={x} cy={y} r={isHovered ? 4.5 : 3} fill="currentColor" fillOpacity={isHovered ? 0.7 : 0.35} className="transition-all duration-300" />
                {/* Animated radar for every pin */}
                <circle cx={x} cy={y} r={3} fill="none" stroke="currentColor" strokeWidth={0.8}>
                  <animate attributeName="r" from="3" to="25" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
                  <animate attributeName="stroke-opacity" from="0.15" to="0" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Hover tooltip */}
        {hoveredIndex !== null && (
          <div
            ref={tooltipRef}
            className="absolute pointer-events-none z-10"
            style={{
              transition: "left 0.15s ease-out, top 0.15s ease-out",
            }}
          >
            <div className="bg-foreground text-background px-4 py-2.5 rounded-sm shadow-2xl">
              <p className="text-xs font-sans font-medium tracking-wide">{locations[hoveredIndex].name}</p>
              <p className="text-[10px] font-sans text-background/50 mt-0.5">
                {new Date(locations[hoveredIndex].date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </p>
            </div>
          </div>
        )}

        {/* Gradient edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-background to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const WorldOutline = () => (
  <g fill="currentColor" fillOpacity={0.04} stroke="currentColor" strokeOpacity={0.06} strokeWidth={0.5}>
    <path d="M130,80 L155,75 L175,80 L195,85 L220,82 L240,90 L260,95 L270,100 L275,115 L280,130 L278,145 L270,155 L260,165 L250,170 L240,180 L230,185 L225,195 L220,205 L210,210 L200,215 L195,220 L185,225 L175,220 L165,210 L155,200 L145,195 L135,190 L130,180 L125,170 L118,160 L112,150 L108,140 L105,130 L108,120 L112,110 L120,95 Z" />
    <path d="M220,250 L230,248 L245,255 L255,265 L260,280 L265,295 L268,310 L270,325 L268,340 L265,355 L260,370 L252,385 L245,395 L238,400 L232,395 L228,380 L225,365 L222,350 L218,335 L215,320 L212,305 L210,290 L212,275 L215,262 Z" />
    <path d="M440,75 L460,72 L480,75 L500,80 L515,85 L525,92 L530,100 L528,110 L522,118 L515,125 L505,130 L495,135 L485,138 L475,135 L465,130 L455,125 L448,118 L442,110 L438,100 L435,90 Z" />
    <path d="M470,150 L485,148 L505,152 L520,160 L530,172 L538,188 L542,205 L545,222 L544,240 L540,258 L535,275 L528,290 L518,302 L508,310 L498,315 L488,312 L478,305 L470,295 L465,280 L460,265 L458,248 L456,232 L455,215 L456,198 L458,182 L462,168 Z" />
    <path d="M545,55 L575,50 L610,52 L645,55 L680,60 L715,65 L745,72 L770,80 L790,90 L800,100 L805,115 L800,130 L790,142 L775,150 L758,155 L740,158 L720,160 L700,158 L680,155 L660,150 L640,145 L620,140 L600,135 L580,128 L565,120 L552,110 L542,98 L538,85 L540,70 Z" />
    <path d="M720,165 L740,168 L758,175 L770,185 L778,198 L775,210 L768,218 L755,222 L740,220 L728,215 L718,205 L712,192 L710,180 Z" />
    <path d="M760,295 L785,290 L810,292 L835,298 L852,308 L860,322 L858,338 L850,352 L838,362 L822,368 L805,370 L788,365 L772,358 L760,348 L752,335 L748,320 L750,308 Z" />
    <path d="M448,82 L454,78 L458,82 L456,90 L450,92 L446,88 Z" />
  </g>
);

export default LocationMap;
