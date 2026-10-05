"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/work" },
  { label: "Exhibition Services", href: "/gallery" },
  { label: "Rate Card", href: "/about" },
  { label: "Contact", href: "#contact" },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

function rise(delay: number, reduceMotion: boolean | null) {
  if (reduceMotion) {
    return {};
  }

  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  };
}

function isActive(href: string, pathname: string) {
  if (href.startsWith("#")) {
    return false;
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function MarkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 text-amber-100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 8.5h2.2l1.3-2h7l1.3 2H20a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 20 19.5H4A1.5 1.5 0 0 1 2.5 18v-8A1.5 1.5 0 0 1 4 8.5Z"
      />
      <circle cx="12" cy="14" r="2.6" />
    </svg>
  );
}

export function HeroSection() {
  const pathname = usePathname() ?? "";
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-label="Introduction"
      className="relative flex min-h-svh w-full flex-col overflow-hidden bg-zinc-950 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.16),transparent_58%)] font-sans text-white antialiased"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[28rem] w-[min(100%,46rem)] -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl"
      />

      <div className="fixed top-5 left-1/2 z-50 w-[min(calc(100%-1.5rem),48rem)] -translate-x-1/2">
        <motion.nav aria-label="Primary" {...rise(0, reduceMotion)}>
          <div className="overflow-x-auto rounded-full border border-zinc-800 bg-zinc-900/80 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <ul className="mx-auto flex w-max items-center gap-0.5 px-1.5 py-1.5 sm:gap-1 sm:px-2">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href, pathname);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`block rounded-full px-2 py-1.5 text-[12px] whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70 sm:px-3 sm:text-sm ${
                        active ? "bg-zinc-800 text-white!" : "text-zinc-400! hover:text-white!"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.nav>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pt-28 pb-10 text-center">
        <motion.p
          {...rise(0.12, reduceMotion)}
          className="m-0 inline-flex items-center gap-2 rounded-full border border-zinc-700/80 bg-zinc-900/70 px-3.5 py-1 text-[11px] font-medium tracking-[0.16em] text-zinc-300 uppercase shadow-[0_0_28px_-8px_rgba(245,158,11,0.85)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_2px_rgba(251,191,36,0.9)]" />
          Aina Creation LLC • Dubai & GCC
        </motion.p>

        <motion.h1
          {...rise(0.24, reduceMotion)}
          className="m-0 mt-6 max-w-4xl text-5xl font-extrabold tracking-tight text-white text-balance sm:text-7xl sm:leading-[1.05]"
        >
          Capturing high-impact media for global exhibitors.
        </motion.h1>

        <motion.p
          {...rise(0.36, reduceMotion)}
          className="m-0 mt-6 max-w-2xl text-lg font-normal text-zinc-400 text-pretty sm:text-xl sm:leading-relaxed"
        >
          Official exhibition photography, VIP coverage, and same-day social media reels across
          DWTC, ADNEC, and premier UAE venues.
        </motion.p>

        <motion.div {...rise(0.46, reduceMotion)} className="mt-8 max-w-xl">
          <p className="m-0 inline-flex items-center gap-3 rounded-full border border-zinc-800 bg-zinc-900/80 py-1.5 pr-4 pl-1.5 text-left text-xs text-zinc-300 sm:text-sm">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-800 shadow-[0_0_16px_-2px_rgba(245,158,11,0.75)] ring-1 ring-amber-400/50">
              <MarkIcon />
            </span>
            Trusted by international exhibitors at GITEX, Gulfood, and ISM Middle East
          </p>
        </motion.div>
      </div>

      <motion.div
        {...rise(0.58, reduceMotion)}
        className="relative z-10 mx-auto w-full max-w-5xl px-4 [perspective:1600px] sm:px-6"
      >
        <div className="origin-top [transform:rotateX(8deg)_translateY(1rem)] sm:[transform:rotateX(16deg)_translateY(2.75rem)]">
          <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/40">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="/images/hero-exhibition.jpg"
                alt="Audience seated in a large conference hall during an exhibition event"
                fill
                priority
                unoptimized
                sizes="(min-width: 1024px) 960px, 100vw"
                className="object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-zinc-950/10" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
