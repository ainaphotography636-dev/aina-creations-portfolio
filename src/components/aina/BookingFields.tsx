"use client";

import { CreditCard, Mail, MessageCircle } from "lucide-react";
import { mailtoHref, paymentHref, whatsappHref } from "./content";

export type BookingDetails = {
  date: string;
  startTime: string;
  endTime: string;
  companyName: string;
  requirements: string;
};

export const emptyBooking: BookingDetails = {
  date: "",
  startTime: "",
  endTime: "",
  companyName: "",
  requirements: "",
};

const inputClass =
  "mt-1 w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-amber-400/50 [color-scheme:dark]";

export function bookingDetailLines(details: BookingDetails) {
  const timing =
    details.startTime || details.endTime
      ? `${details.startTime || "—"} to ${details.endTime || "—"}`
      : "Not provided";

  return [
    `Company: ${details.companyName.trim() || "Not provided"}`,
    `Date: ${details.date || "Not provided"}`,
    `Timing to cover: ${timing}`,
    `Media coverage requirements: ${details.requirements.trim() || "Not provided"}`,
  ];
}

export function BookingFields({
  value,
  onChange,
}: {
  value: BookingDetails;
  onChange: (next: BookingDetails) => void;
}) {
  function set<K extends keyof BookingDetails>(key: K, next: BookingDetails[K]) {
    onChange({ ...value, [key]: next });
  }

  return (
    <div className="mt-3 grid gap-2">
      <label className="text-sm font-medium text-slate-400">
        Date
        <input
          type="date"
          value={value.date}
          onChange={(event) => set("date", event.target.value)}
          className={inputClass}
        />
      </label>
      <div className="grid grid-cols-2 gap-2">
        <label className="text-sm font-medium text-slate-400">
          Cover from
          <input
            type="time"
            value={value.startTime}
            onChange={(event) => set("startTime", event.target.value)}
            className={inputClass}
          />
        </label>
        <label className="text-sm font-medium text-slate-400">
          Cover until
          <input
            type="time"
            value={value.endTime}
            onChange={(event) => set("endTime", event.target.value)}
            className={inputClass}
          />
        </label>
      </div>
      <label className="text-sm font-medium text-slate-400">
        Company name
        <input
          type="text"
          value={value.companyName}
          onChange={(event) => set("companyName", event.target.value)}
          placeholder="Your company"
          className={inputClass}
        />
      </label>
      <label className="text-sm font-medium text-slate-400">
        Media coverage requirements
        <textarea
          value={value.requirements}
          onChange={(event) => set("requirements", event.target.value)}
          rows={3}
          placeholder="Write exactly what you need: stand, shots, interviews, social posts."
          className={`${inputClass} resize-y leading-snug`}
        />
      </label>
    </div>
  );
}

export function BookingActions({
  subject,
  body,
  popular = false,
}: {
  subject: string;
  body: string;
  popular?: boolean;
}) {
  const whatsappClass = popular
    ? "bg-amber-400 !text-slate-950 hover:bg-amber-300"
    : "bg-white !text-slate-950 hover:bg-amber-100";

  return (
    <div className="mt-3 grid grid-cols-2 gap-2">
      <a
        href={mailtoHref(subject, body)}
        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/15 px-3 py-2.5 text-center text-sm font-semibold leading-tight !text-white hover:border-amber-400/40"
      >
        <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
        Send via email
      </a>
      <a
        href={whatsappHref(body)}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2.5 text-center text-sm font-semibold leading-tight transition-colors ${whatsappClass}`}
      >
        <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
        Instant WhatsApp
      </a>
      <a
        href={paymentHref(subject)}
        target="_blank"
        rel="noopener noreferrer"
        className="col-span-2 inline-flex items-center justify-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-2.5 text-center text-sm font-semibold leading-tight !text-amber-200 hover:bg-amber-400/20"
      >
        <CreditCard className="h-4 w-4 shrink-0" aria-hidden="true" />
        Pay & Book Now
      </a>
    </div>
  );
}
