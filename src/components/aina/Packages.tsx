import { CustomPackage } from "./CustomPackage";
import { PackageCard } from "./PackageCard";
import { SectionHeading } from "./SectionHeading";
import { packages } from "./content";

export function Packages() {
  return (
    <section id="packages" className="scroll-mt-16 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-8">
        <SectionHeading
          eyebrow="Photo & Video Packages"
          title="Coverage, priced in AED."
          body="Same-day output for social while your DWTC stand is live. Add date, timing, and company, then email, WhatsApp, or pay with Stripe."
        />
        <div className="mt-4 grid items-stretch gap-2 lg:grid-cols-3">
          {packages.map((tier) => (
            <PackageCard key={tier.name} tier={tier} />
          ))}
        </div>
        <CustomPackage />
      </div>
    </section>
  );
}
