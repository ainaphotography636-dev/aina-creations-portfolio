"use client";

import { Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { BookingActions, BookingFields, bookingDetailLines, emptyBooking } from "./BookingFields";
import type { BookingDetails } from "./BookingFields";

type CustomBrief = {
  days: number;
  photographers: number;
  videographers: number;
  photos: number;
  instagramVideos: number;
  youtubeVideos: number;
  interviews: number;
  rawPhotos: boolean;
  rawVideo: boolean;
  sameDayPhotos: boolean;
};

const initialBrief: CustomBrief = {
  days: 1,
  photographers: 1,
  videographers: 1,
  photos: 80,
  instagramVideos: 2,
  youtubeVideos: 1,
  interviews: 1,
  rawPhotos: true,
  rawVideo: true,
  sameDayPhotos: true,
};

function customBookingMessage(brief: CustomBrief, details: BookingDetails) {
  return [
    "Hello Aina Creations LLC, I would like a custom package for my exhibition at the Dubai World Trade Centre.",
    "",
    ...bookingDetailLines(details),
    `Coverage days: ${brief.days}`,
    `Photographers: ${brief.photographers}`,
    `Videographers: ${brief.videographers}`,
    `Edited photos: ${brief.photos}`,
    `Vertical Instagram videos: ${brief.instagramVideos}`,
    `Horizontal YouTube videos: ${brief.youtubeVideos}`,
    `Interview / testimonial clips: ${brief.interviews}`,
    `All unedited photos: ${brief.rawPhotos ? "Yes" : "No"}`,
    `Raw video clips: ${brief.rawVideo ? "Yes" : "No"}`,
    `Same-day output: ${brief.sameDayPhotos ? "Yes" : "No"}`,
  ].join("\n");
}

function Stepper({
  label,
  hint,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2">
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-xs text-slate-500">{hint}</p>
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - step))}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 text-slate-500 hover:text-slate-400 disabled:opacity-30"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-12 text-center text-sm font-semibold text-slate-300 tabular-nums">
          {value.toLocaleString("en-US")}
        </span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + step))}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 text-slate-500 hover:text-slate-400 disabled:opacity-30"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function Toggle({
  label,
  pressed,
  onClick,
}: {
  label: string;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`rounded-full border px-3 py-2 text-xs font-medium transition-colors ${
        pressed
          ? "border-amber-400/60 bg-amber-400/15 !text-amber-200"
          : "border-white/10 !text-slate-400 hover:border-white/20"
      }`}
    >
      {label}
    </button>
  );
}

export function CustomPackage() {
  const [brief, setBrief] = useState<CustomBrief>(initialBrief);
  const [details, setDetails] = useState(emptyBooking);

  const body = useMemo(() => customBookingMessage(brief, details), [brief, details]);

  function setNumber<Key extends keyof CustomBrief>(key: Key, value: CustomBrief[Key]) {
    setBrief((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="mt-3 rounded-2xl border border-amber-400/30 bg-slate-900/70 p-4 sm:p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-medium tracking-[0.18em] text-amber-300 uppercase">
            Custom coverage
          </p>
          <h3 className="mt-1 text-lg font-semibold tracking-tight text-white">Build your own</h3>
          <p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-400">
            Starts at 1 day. Set the crew, then choose how many vertical Instagram and horizontal
            YouTube videos you need.
          </p>
        </div>
        <p className="text-xs font-medium text-amber-200">Custom quote</p>
      </div>

      <div className="mt-4 grid gap-2 md:grid-cols-2">
        <Stepper
          label="Coverage days"
          hint="Minimum 1 day"
          value={brief.days}
          min={1}
          max={14}
          step={1}
          onChange={(days) => setNumber("days", days)}
        />
        <Stepper
          label="Photographers"
          hint="On the stand each day"
          value={brief.photographers}
          min={0}
          max={6}
          step={1}
          onChange={(photographers) => setNumber("photographers", photographers)}
        />
        <Stepper
          label="Videographers"
          hint="On the stand each day"
          value={brief.videographers}
          min={0}
          max={6}
          step={1}
          onChange={(videographers) => setNumber("videographers", videographers)}
        />
        <Stepper
          label="Edited photos"
          hint="Delivered selects"
          value={brief.photos}
          min={0}
          max={500}
          step={10}
          onChange={(photos) => setNumber("photos", photos)}
        />
        <Stepper
          label="Vertical Instagram"
          hint="9:16 videos"
          value={brief.instagramVideos}
          min={0}
          max={20}
          step={1}
          onChange={(instagramVideos) => setNumber("instagramVideos", instagramVideos)}
        />
        <Stepper
          label="Horizontal YouTube"
          hint="16:9 videos"
          value={brief.youtubeVideos}
          min={0}
          max={20}
          step={1}
          onChange={(youtubeVideos) => setNumber("youtubeVideos", youtubeVideos)}
        />
        <Stepper
          label="Interview clips"
          hint="Testimonials and soundbites"
          value={brief.interviews}
          min={0}
          max={12}
          step={1}
          onChange={(interviews) => setNumber("interviews", interviews)}
        />
      </div>

      <fieldset className="mt-3 min-w-0 border-0 p-0">
        <legend className="text-[11px] font-medium tracking-[0.14em] text-slate-400 uppercase">
          Extras
        </legend>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          <Toggle
            label="All unedited photos"
            pressed={brief.rawPhotos}
            onClick={() => setNumber("rawPhotos", !brief.rawPhotos)}
          />
          <Toggle
            label="Raw video clips"
            pressed={brief.rawVideo}
            onClick={() => setNumber("rawVideo", !brief.rawVideo)}
          />
          <Toggle
            label="Same-day output"
            pressed={brief.sameDayPhotos}
            onClick={() => setNumber("sameDayPhotos", !brief.sameDayPhotos)}
          />
        </div>
      </fieldset>

      <BookingFields value={details} onChange={setDetails} />

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-[11px] leading-5 text-slate-500">
          {brief.days} {brief.days === 1 ? "day" : "days"} · {brief.photographers}{" "}
          {brief.photographers === 1 ? "photographer" : "photographers"} · {brief.videographers}{" "}
          {brief.videographers === 1 ? "videographer" : "videographers"} ·           {brief.photos} photos · {brief.instagramVideos} Vertical Instagram · {brief.youtubeVideos}{" "}
          Horizontal YouTube
        </p>
        <div className="sm:w-64">
          <BookingActions subject="Quote request: Custom coverage" body={body} popular />
        </div>
      </div>
    </div>
  );
}
