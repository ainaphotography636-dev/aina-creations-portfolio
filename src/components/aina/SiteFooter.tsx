import { Mail, MapPin, MessageCircle } from "lucide-react";
import {
  BOOKING_EMAIL,
  generalBookingMessage,
  mailtoHref,
  whatsappHref,
} from "./content";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex flex-col items-center text-center">
            <img
              src="/images/aina-logo.png?v=spaced"
              alt="aina creations"
              width={757}
              height={399}
              className="h-20 w-auto max-w-none object-contain"
            />
            <p className="mt-2 text-sm font-semibold leading-none tracking-wide text-white">
              Aina Creations LLC Dubai
            </p>
            <p className="mt-1 text-[10px] font-medium leading-none tracking-[0.14em] text-amber-200">
              UAE license: 2431667.01
            </p>
          </div>
          <p className="mt-3 text-xs leading-snug text-slate-400">
            Dubai-based media company. Same-day photo and video so you can post while your DWTC
            stand is live.
          </p>
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-slate-300">
            <MapPin className="h-4 w-4 text-amber-300" aria-hidden="true" />
            Near Mall of the Emirates, Al Barsha, Dubai, United Arab Emirates
          </p>
        </div>
        <div className="flex flex-col items-start gap-1.5 sm:items-end">
          <a
            href={mailtoHref(
              "Exhibition media enquiry",
              generalBookingMessage,
            )}
            aria-label={`Email ${BOOKING_EMAIL}`}
            className="inline-flex items-center gap-2 text-sm font-medium !text-white hover:!text-amber-200"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Email
          </a>
          <a
            href={whatsappHref(generalBookingMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium !text-amber-300 hover:!text-amber-200"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </a>
          <p className="m-0 text-xs text-slate-500">
            © {new Date().getFullYear()} Aina Creations LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
