import { Camera, Clapperboard, Timer } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const points = [
  {
    icon: Camera,
    title: "Booth-first coverage",
    body: "Shot around your stand.",
  },
  {
    icon: Clapperboard,
    title: "One vendor",
    body: "Photo, video, and edit from one crew.",
  },
  {
    icon: Timer,
    title: "Same-day output",
    body: "Update social while your DWTC stand is live.",
  },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-16 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-8">
        <SectionHeading
          eyebrow="Who we are"
          title="Exhibition media for global brands."
          body="Same-day photos and reels for DWTC stands, ready to post while your stand is live."
        />
        <ul className="mt-4 grid gap-2 md:grid-cols-3">
          {points.map((point) => (
            <li
              key={point.title}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate-900/60 px-3 py-3"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-400/15 text-amber-300">
                <point.icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-white">{point.title}</h3>
                <p className="mt-0.5 text-xs leading-snug text-slate-400">{point.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
