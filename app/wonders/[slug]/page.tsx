import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WonderDetail } from "@/components/wonder-detail";
import { getAllScheduledWonders, getWonder } from "@/lib/wonders";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllScheduledWonders().map((wonder) => ({ slug: wonder.slug }));
}

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
      type: "article",
      publishedTime: wonder.date,
    },
  };
}

export default async function WonderPage({ params }: Props) {
  const { slug } = await params;
  const wonder = getWonder(slug);

  if (!wonder) notFound();

  return <WonderDetail wonder={wonder} />;
}
