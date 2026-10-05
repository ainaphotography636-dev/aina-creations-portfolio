import { About } from "@/components/aina/About";
import { Gallery } from "@/components/aina/Gallery";
import { Hero } from "@/components/aina/Hero";
import { Navbar } from "@/components/aina/Navbar";
import { Packages } from "@/components/aina/Packages";
import { SiteFooter } from "@/components/aina/SiteFooter";
import { baseURL, home } from "@/resources";
import { Meta } from "@once-ui-system/core";

export async function generateMetadata() {
  return Meta.generate({
    title: "Aina Creations LLC, Dubai",
    description:
      "Fast exhibition photography, social reels, and interview clips for international exhibitors at the Dubai World Trade Centre. Same-day photos and next-day video.",
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

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
