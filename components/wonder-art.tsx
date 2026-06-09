import type { CategoryName } from "@/lib/wonders";

function CategorySymbol({ category }: { category: CategoryName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 2.4,
  };

  switch (category) {
    case "Animals":
      return (
        <>
          <circle cx="16" cy="12" r="2.3" {...common} />
          <circle cx="24" cy="12" r="2.3" {...common} />
          <circle cx="11.5" cy="19" r="2.3" {...common} />
          <circle cx="28.5" cy="19" r="2.3" {...common} />
          <path d="M13 28c0-4.2 3.1-8 7-8s7 3.8 7 8c0 3-2.5 4.8-7 4.8S13 31 13 28Z" {...common} />
        </>
      );
    case "Space":
      return (
        <>
          <circle cx="20" cy="20" r="8" {...common} />
          <path d="M7 24c5.4 4 19.3 2.8 26-3.1 2-1.8 1.8-3.4-.6-4.4-2.1-.8-5.3-.5-8.6.5" {...common} />
          <path d="m31 8 .9 2.2L34 11l-2.1.8L31 14l-.9-2.2L28 11l2.1-.8Z" {...common} />
        </>
      );
    case "Human Body":
      return <path d="M5 21h7l3-8 6 16 4-10 3 2h7" {...common} />;
    case "Earth":
      return (
        <>
          <path d="m5 29 9-14 6 8 5-6 10 12" {...common} />
          <path d="M7 34c6-4 10 3 16-1s8-1 12 0" {...common} />
        </>
      );
    case "Technology":
      return (
        <>
          <rect x="10" y="10" width="20" height="20" rx="3" {...common} />
          <path d="M15 5v5m10-5v5M15 30v5m10-5v5M5 15h5m20 0h5M5 25h5m20 0h5M16 16h8v8h-8z" {...common} />
        </>
      );
    case "Food":
      return (
        <>
          <path d="M20 13c-5-5-12-1-12 7 0 8 5 14 10 14 2 0 2-1 4-1s2 1 4 1c5 0 10-6 10-14 0-8-7-12-12-7" {...common} />
          <path d="M20 13c0-5 3-8 8-8M21 9c-4 0-7-2-8-5" {...common} />
        </>
      );
    case "History":
      return (
        <>
          <path d="M12 8h16M10 12h20M13 12v16m7-16v16m7-16v16M10 28h20M8 32h24" {...common} />
          <path d="m20 4-10 4h20Z" {...common} />
        </>
      );
    case "Weird & Wonderful":
      return (
        <>
          <path d="M20 31c-7 0-12-5-12-11S13 9 20 9s12 5 12 11-5 11-12 11Z" {...common} />
          <circle cx="20" cy="20" r="4" {...common} />
          <path d="M20 4v3m0 26v3M4 20h3m26 0h3m-5-11-2 2M11 29l-2 2M9 9l2 2m18 18 2 2" {...common} />
        </>
      );
  }
}

export function WonderArt({
  accent,
  category,
  compact = false,
}: {
  accent: string;
  category: CategoryName;
  compact?: boolean;
}) {
  return (
    <div className={`wonder-art accent-${accent} ${compact ? "compact" : ""}`}>
      <div className="art-orbit orbit-one" />
      <div className="art-orbit orbit-two" />
      <svg
        aria-label={`${category} Wonder`}
        className="art-symbol category-symbol"
        height="160"
        role="img"
        viewBox="0 0 40 40"
        width="160"
      >
        <CategorySymbol category={category} />
      </svg>
      <span className="art-orbit-dot" aria-hidden="true" />
    </div>
  );
}
