import { CreditCard, ExternalLink } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import {
  STRIPE_PAYMENT_LINK,
  paymentHref,
  paymentMethods,
  whatsappHref,
} from "./content";

export function Payment() {
  const href = paymentHref();
  const hasStripeLink = Boolean(STRIPE_PAYMENT_LINK);

  return (
    <section id="payment" className="scroll-mt-16 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-8">
        <SectionHeading
          eyebrow="Payment"
          title="Pay securely before the show."
          body="Stripe checkout with Apple Pay, Google Pay, and major cards. Confirm your package, then pay in one step."
        />

        <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {paymentMethods.map((method) => (
            <li
              key={method.name}
              className="rounded-xl border border-white/10 bg-slate-900/70 px-3 py-3"
            >
              <p className="text-sm font-semibold text-white">{method.name}</p>
              <p className="mt-0.5 text-[11px] text-slate-400">{method.detail}</p>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-snug text-slate-400">
            {hasStripeLink
              ? "Opens Stripe Checkout. Apple Pay and Google Pay appear when your device supports them."
              : "Ask on WhatsApp for a Stripe payment link — it will offer Apple Pay, Google Pay, and cards."}
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold !text-slate-950 transition-colors hover:bg-amber-300"
            >
              <CreditCard className="h-4 w-4" aria-hidden="true" />
              {hasStripeLink ? "Pay with Stripe" : "Get payment link"}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            {!hasStripeLink ? (
              <a
                href={whatsappHref(
                  "Hello Aina Creations LLC, please send a Stripe payment link for my DWTC booking (Apple Pay / Google Pay / card).",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold !text-white hover:border-amber-400/40"
              >
                WhatsApp pay help
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
