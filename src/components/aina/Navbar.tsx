"use client";

import { Mail, Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import {
  BOOKING_EMAIL,
  generalBookingMessage,
  mailtoHref,
  navLinks,
  whatsappHref,
} from "./content";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <a
          href="#top"
          aria-label="Aina Creations LLC Dubai"
          className="flex min-w-0 flex-col items-center text-center !text-white"
        >
          <img
            src="/images/aina-logo.png?v=spaced"
            alt="aina creations"
            width={757}
            height={399}
            className="h-20 w-auto max-w-none shrink-0 object-contain"
          />
          <span className="mt-1.5 text-[10px] font-medium leading-none tracking-[0.14em] text-amber-200">
            UAE license: 2431667.01
          </span>
        </a>

        <nav aria-label="Page" className="hidden items-center gap-5 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm !text-slate-300 transition-colors hover:!text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={mailtoHref(
              "Exhibition media enquiry",
              generalBookingMessage,
            )}
            aria-label={`Email ${BOOKING_EMAIL}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold !text-white transition-colors hover:border-amber-400/50 hover:bg-white/5"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Email
          </a>
          <a
            href={whatsappHref(generalBookingMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1.5 text-xs font-semibold !text-slate-950 transition-colors hover:bg-amber-300"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </a>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav aria-label="Mobile" className="border-t border-white/10 px-5 py-3 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block rounded-lg px-2 py-2 text-sm !text-slate-200 hover:bg-white/5"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
