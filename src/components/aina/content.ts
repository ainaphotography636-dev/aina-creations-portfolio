export const WHATSAPP_NUMBER = "971521251320";
export const WHATSAPP_DISPLAY = "+971521251320";
export const BOOKING_EMAIL = "info@ainaphotography.com";

/**
 * Paste your Stripe Payment Link (Dashboard → Payment Links).
 */
export const STRIPE_PAYMENT_LINK =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK?.trim() || "";

export function whatsappHref(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function mailtoHref(subject: string, body: string) {
  const query = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return `mailto:${BOOKING_EMAIL}?${query}`;
}

export function paymentHref(context?: string, paymentLink?: string) {
  const link = paymentLink?.trim() || STRIPE_PAYMENT_LINK;
  if (link) return link;
  const message = [
    "Hello Aina Creations LLC, I am ready to pay for exhibition media coverage.",
    context ? `Booking: ${context}` : "",
    "Please send a Stripe payment link.",
  ]
    .filter(Boolean)
    .join("\n");
  return whatsappHref(message);
}

export function packageBookingMessage(packageName: string) {
  return `Hello Aina Creations LLC, I would like to book the "${packageName}" package for my exhibition at the Dubai World Trade Centre.`;
}

export const generalBookingMessage =
  "Hello Aina Creations LLC, I would like to book exhibition media coverage at the Dubai World Trade Centre.";

export function formatAed(amount: number) {
  return `AED ${amount.toLocaleString("en-AE")}`;
}

/** Units of each currency per 1 AED. Mid-market rates as of 1 Oct 2026. */
const PER_AED = [
  { code: "USD", rate: 0.2723 },
  { code: "GBP", rate: 0.2063 },
  { code: "EUR", rate: 0.2421 },
  { code: "CNY", rate: 1.8257 },
] as const;

export function foreignPrices(aed: number) {
  return PER_AED.map(({ code, rate }) => {
    const value = Math.round(aed * rate);
    return `${code} ${value.toLocaleString("en-US")}`;
  });
}

export const navLinks = [
  { label: "Who we are", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Packages", href: "#packages" },
] as const;

export type PackageTier = {
  name: string;
  price: number;
  popular?: boolean;
  blurb: string;
  features: string[];
  /** Stripe Payment Link for this package (Pay & Book Now). */
  paymentLink?: string;
};

export const packages: PackageTier[] = [
  {
    name: "The Express Booth Spark",
    price: 1500,
    blurb: "Same-day output to post while your stand is live.",
    paymentLink: "https://buy.stripe.com/9B65kw9gSagn9x37KG63K03",
    features: [
      "1-3 hrs coverage",
      "1 photographer",
      "30 edited + all unedited photos",
      "40-50s edited social reel + raw video clips",
      "Same-day output for social while the stand is live",
    ],
  },
  {
    name: "The Pro Exhibitor Suite",
    price: 2500,
    popular: true,
    blurb: "Half-day (3-4 hours) coverage with same-day files for social.",
    paymentLink: "https://buy.stripe.com/eVq28k78K0FN38F1mi63K04",
    features: [
      "Half-day (3-4 hours) coverage",
      "1 photographer + 1 videographer",
      "60 edited + all unedited photos",
      "1-2 min video highlights + raw video clips",
      "Same-day output. Post while your stand is live",
    ],
  },
  {
    name: "Ultimate Trade Show Takeover",
    price: 3900,
    blurb: "Full-day (6-8 hour) coverage, posted the same day your stand is live.",
    paymentLink: "https://buy.stripe.com/00w9AM8cOgEL38F6GC63K05",
    features: [
      "Full-day (6-8 hour) coverage",
      "1 photographer + 1 videographer",
      "80 edited + all unedited photos",
      "1-2 min highlights",
      "2x extra edited reels",
      "Testimonial/interview clips + raw video clips",
      "Same-day output. Post while your stand is live",
    ],
  },
];
