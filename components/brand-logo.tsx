export function BrandLogo({
  className = "",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const wordmark = variant === "dark" ? "#fffaf0" : "#17221c";

  return (
    <svg
      aria-hidden="true"
      className={`brand-logo ${className}`.trim()}
      overflow="visible"
      role="img"
      viewBox="0 0 214 56"
    >
      <g transform="translate(4.4 2.8) scale(.9)">
        <path
          d="M3 42C-1 31 13 16 34 8C55 0 77 2 82 12C88 23 76 37 59 46C38 57 15 55 6 48"
          fill="none"
          stroke={wordmark}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4.4"
        />
        <path
          d="M9 48C18 58 41 57 61 48C76 41 85 31 83 22"
          fill="none"
          stroke={wordmark}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <path
          d="M25 2C14 5 20 25 32 40C44 55 61 63 74 60C84 58 82 47 75 35C65 19 42-1 27 2"
          fill="none"
          stroke="#d5f07c"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <circle cx="75" cy="35" fill="#d5f07c" r="4.3" stroke={wordmark} strokeWidth="1.4" />
      </g>

      <text
        fill={wordmark}
        fontFamily='Georgia, "Times New Roman", serif'
        fontSize="21"
        fontWeight="700"
        x="92"
        y="27"
      >
        Wonder Why
      </text>
      <text
        fill={wordmark}
        fontFamily='"Avenir Next", Avenir, "Segoe UI", Helvetica, Arial, sans-serif'
        fontSize="9.5"
        fontWeight="800"
        letterSpacing="4"
        textAnchor="middle"
        x="150"
        y="45"
      >
        DAILY
      </text>
    </svg>
  );
}
