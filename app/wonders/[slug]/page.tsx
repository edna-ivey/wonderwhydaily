import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WonderDetail } from "@/components/wonder-detail";
import { getWonder } from "@/lib/wonders";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const wonder = getWonder(slug);

  if (!wonder) return {};

  return {
    title: wonder.title,
    description: wonder.excerpt,
    alternates: {
      canonical: `/wonders/${wonder.slug}`,
    },
    openGraph: {
      title: wonder.title,
      description: wonder.excerpt,
      siteName: "Wonder Why Daily",
      type: "article",
      publishedTime: wonder.date,
      section: wonder.category,
      tags: [wonder.category, "curiosity", "daily wonder"],
      url: `/wonders/${wonder.slug}`,
      images: [
        {
          alt: wonder.title,
          height: 630,
          url: `/wonders/${wonder.slug}/opengraph-image`,
          width: 1200,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: wonder.title,
      description: wonder.excerpt,
      images: [`/wonders/${wonder.slug}/opengraph-image`],
    },
  };
}

export default async function WonderPage({ params }: Props) {
  const { slug } = await params;
  const wonder = getWonder(slug);

  if (!wonder) notFound();

  const wonderUrl = `https://wonderwhydaily.com/wonders/${wonder.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    datePublished: wonder.date,
    description: wonder.excerpt,
    headline: wonder.title,
    image: `${wonderUrl}/opengraph-image`,
    mainEntityOfPage: wonderUrl,
    publisher: {
      "@type": "Organization",
      name: "Wonder Why Daily",
      url: "https://wonderwhydaily.com",
    },
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
      <WonderDetail wonder={wonder} />
    </>
  );
}
