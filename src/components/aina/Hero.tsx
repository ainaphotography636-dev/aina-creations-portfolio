"use client";

import { ArrowRight, Clock3, MapPin, Share2 } from "lucide-react";
import Image from "next/image";
import { generalBookingMessage, whatsappHref } from "./content";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.18),transparent_62%)]"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-5 pt-8 pb-8 lg:grid-cols-[1.05fr_0.95fr] lg:pt-10 lg:pb-10">
        <div>
          <p className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[11px] font-medium tracking-[0.14em] text-amber-200 uppercase">
            <MapPin className="h-3 w-3" aria-hidden="true" />
            Dubai World Trade Centre
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl sm:leading-[1.1]">
            Capture Your DWTC Exhibition in Real-Time: Same-Day Media While Your Stand Is Live.
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-snug text-slate-400">
            Elite photo and video production for international exhibitors at DWTC with guaranteed
            same-day output delivery.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <a
              href="#packages"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold !text-slate-950 transition-colors hover:bg-amber-100"
            >
              View packages
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={whatsappHref(generalBookingMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2 text-sm font-semibold !text-white transition-colors hover:border-amber-400/50 hover:bg-white/5"
            >
              Book a crew
            </a>
          </div>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
            <li className="inline-flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-amber-300" aria-hidden="true" />
              Same-day output
            </li>
            <li className="inline-flex items-center gap-2">
              <Share2 className="h-4 w-4 text-amber-300" aria-hidden="true" />
              Update social while your stand is live
            </li>
          </ul>
        </div>

        <div className="relative">
          <div className="aina-media-protect overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/40">
            <div
              className="aina-media-protect relative aspect-[16/10]"
              onContextMenu={(event) => event.preventDefault()}
            >
              <Image
                src="/images/hero-exhibition.jpg"
                alt="Exhibition coverage at Dubai World Trade Centre"
                fill
                priority
                unoptimized
                draggable={false}
                sizes="(min-width: 1024px) 520px, 100vw"
                className="aina-media-protect object-cover"
                onContextMenu={(event) => event.preventDefault()}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
            </div>
          </div>
          <p className="absolute bottom-2 left-2 right-2 m-0 rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-xs text-slate-200 backdrop-blur-md">
            <span className="block text-[10px] tracking-[0.14em] text-amber-300 uppercase">
              On the floor
            </span>
            Same-day files. Post while the stand is live.
          </p>
        </div>
      </div>
    </section>
  );
}
