"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { BookingActions, BookingFields, bookingDetailLines, emptyBooking } from "./BookingFields";
import { foreignPrices, formatAed, type PackageTier } from "./content";

export function PackageCard({ tier }: { tier: PackageTier }) {
  const [details, setDetails] = useState(emptyBooking);
  const body = [
    `Hello Aina Creations LLC, I would like to book the "${tier.name}" package for my exhibition at the Dubai World Trade Centre.`,
    "",
    ...bookingDetailLines(details),
  ].join("\n");

  return (
    <article
      className={`flex flex-col rounded-2xl border p-4 ${
        tier.popular
          ? "border-amber-400/60 bg-gradient-to-b from-amber-400/15 to-slate-900 shadow-[0_0_48px_-20px_rgba(245,158,11,0.65)]"
          : "border-white/10 bg-slate-900/70"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold leading-snug text-white">{tier.name}</h3>
        {tier.popular ? (
          <span className="shrink-0 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-slate-950 uppercase">
            Popular
          </span>
        ) : null}
      </div>
      <p className="mt-1 text-xl font-semibold tracking-tight text-white">{formatAed(tier.price)}</p>
      <ul className="mt-0.5 flex flex-wrap gap-x-2 gap-y-0 text-[10px] leading-4 text-slate-500">
        {foreignPrices(tier.price).map((label) => (
          <li key={label} className="whitespace-nowrap">
            {label}
          </li>
        ))}
      </ul>
      <p className="mt-1 text-xs leading-snug text-slate-400">{tier.blurb}</p>
      <ul className="mt-2 flex flex-1 flex-col gap-1">
        {tier.features.map((feature) => (
          <li key={feature} className="flex gap-1.5 text-xs text-slate-200">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300" aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <BookingFields value={details} onChange={setDetails} />
      <BookingActions subject={`Quote request: ${tier.name}`} body={body} popular={tier.popular} />
    </article>
  );
}
