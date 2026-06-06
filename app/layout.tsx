import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wonderwhydaily.com"),
  title: {
    default: "Wonder Why Daily",
    template: "%s | Wonder Why Daily",
  },
  description:
    "Build a daily curiosity habit with one fascinating question every day.",
  openGraph: {
    title: "Wonder Why Daily",
    description: "One fascinating question every day.",
    siteName: "Wonder Why Daily",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
