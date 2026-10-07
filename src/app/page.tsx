import { About } from "@/components/aina/About";
import { Gallery } from "@/components/aina/Gallery";
import { Hero } from "@/components/aina/Hero";
import { Navbar } from "@/components/aina/Navbar";
import { Packages } from "@/components/aina/Packages";
import { SiteFooter } from "@/components/aina/SiteFooter";
import {
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_URL,
  OG_IMAGE_WIDTH,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/components/aina/siteMeta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: OG_IMAGE_URL,
        secureUrl: OG_IMAGE_URL,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: OG_IMAGE_ALT,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_URL],
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
