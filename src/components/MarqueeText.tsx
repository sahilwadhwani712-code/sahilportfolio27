
interface MarqueeTextProps {
  text: string;
  className?: string;
  /** outline = stroked, solid = filled muted, italic = serif-italic accent */
  variant?: "outline" | "solid" | "italic";
  reverse?: boolean;
}

const MarqueeText = ({ text, className = "", variant = "outline", reverse = false }: MarqueeTextProps) => {
  const cls = variant === "solid" ? "text-foreground/10" : variant === "italic" ? "italic font-light text-primary/30" : "text-transparent";
  const st = variant === "outline" ? { WebkitTextStroke: "1px hsl(var(--primary) / 0.35)" } : undefined;
  const items = Array(4).fill(text);

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className={`inline-flex will-change-transform ${reverse ? "marquee-rev" : "marquee"}`}>
        {items.map((item, index) => (
          <span
            key={index}
            className={`mx-6 sm:mx-8 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${cls}`}
            style={st}
          >
            {item}
          </span>
        ))}
        {items.map((item, index) => (
          <span
            key={`duplicate-${index}`}
            className={`mx-6 sm:mx-8 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${cls}`}
            style={st}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeText;