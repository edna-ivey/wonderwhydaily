const shapes: Record<string, { symbol: string; label: string }> = {
  sky: { symbol: "////", label: "A field of blue light" },
  nature: { symbol: "Y", label: "A branching tree" },
  space: { symbol: "O", label: "A distant moon" },
  mind: { symbol: "~", label: "A drifting thought" },
  everyday: { symbol: "*", label: "A bright spark" },
};

export function WonderArt({
  accent,
  compact = false,
}: {
  accent: string;
  compact?: boolean;
}) {
  const shape = shapes[accent] ?? shapes.everyday;

  return (
    <div className={`wonder-art accent-${accent} ${compact ? "compact" : ""}`}>
      <div className="art-orbit orbit-one" />
      <div className="art-orbit orbit-two" />
      <span className="art-symbol" aria-label={shape.label}>
        {shape.symbol}
      </span>
      <span className="art-question" aria-hidden="true">
        ?
      </span>
    </div>
  );
}
