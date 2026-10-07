import { About } from "@/components/aina/About";
import { Gallery } from "@/components/aina/Gallery";
import { Hero } from "@/components/aina/Hero";
import { Navbar } from "@/components/aina/Navbar";
import { Packages } from "@/components/aina/Packages";
import { SiteFooter } from "@/components/aina/SiteFooter";
import type { Metadata } from "next";

const siteUrl = "https://www.ainacreationsllc.com";
const ogImage = `${siteUrl}/preview-banner.jpg`;
const siteTitle = "Aina Creations LLC - Exhibition Photography Dubai";
const siteDescription =
  "Professional exhibition photography, social reels, and media packages for international exhibitors at DWTC.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Aina Creations LLC",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Aina Creations LLC — Exhibition photography and media in Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
};

export default function Home() {
  return (
    <div className="aina-site w-full bg-slate-950 font-sans text-slate-100 antialiased">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Packages />
      </main>
      <SiteFooter />
    </div>
  );
}
