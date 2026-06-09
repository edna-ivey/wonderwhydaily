import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { formatWonderDate, getWonder } from "@/lib/wonders";

export const alt = "Wonder Why Daily";
export const contentType = "image/png";
export const size = { height: 630, width: 1200 };

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const wonder = getWonder(slug);

  if (!wonder) notFound();

  return new ImageResponse(
    (
      <div
        style={{
          background: "#17221c",
          color: "#fffaf0",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#d5f07c",
            display: "flex",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Wonder Why Daily
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Georgia",
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: "-0.05em",
            lineHeight: 0.98,
            maxWidth: 980,
          }}
        >
          {wonder.title}
        </div>
        <div
          style={{
            borderTop: "2px solid rgba(255,250,240,.28)",
            display: "flex",
            fontSize: 22,
            justifyContent: "space-between",
            paddingTop: "24px",
            width: "100%",
          }}
        >
          <span>{wonder.category}</span>
          <span>{formatWonderDate(wonder.date)}</span>
        </div>
      </div>
    ),
    size,
  );
}
