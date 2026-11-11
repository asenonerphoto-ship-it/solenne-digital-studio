import { createFileRoute } from "@tanstack/react-router";
import { Download, Megaphone, Snowflake, Sparkles, TrendingUp } from "lucide-react";
import { img } from "@/lib/images";
import { b2bSteps } from "@/data/content";
import { getProduct } from "@/data/products";
import { FeatureCard, Reveal, StepTimeline, Words, btnClass } from "@/components/site/ui";
import { LeadForm } from "@/components/site/LeadForm";

import { Doodles } from "@/components/site/doodles";
import { doodlePlacements } from "@/data/doodles";

export const Route = createFileRoute("/b2b")({
  head: () => ({
    meta: [
      { title: "B2B & Wholesale — Solenne for Bars, Restaurants & Shops" },
      { name: "description", content: "Stock Solenne hard cider in your bar, restaurant, hotel or shop. Request samples and wholesale prices." },
      { property: "og:title", content: "Solenne Wholesale" },
      { property: "og:description", content: "Solenne for your bar, restaurant & shop." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(img["peach-tray-cans"].startsWith("https://") ? [{ property: "og:image", content: img["peach-tray-cans"] }, { name: "twitter:image", content: img["peach-tray-cans"] }] : []),
    ],
  }),
  component: B2B,
});

const useCases = [
  { title: "Bars & Clubs", src: img["peach-tray-cans"] },
  { title: "Restaurants", src: img.peachTable },
  { title: "Hotels & Après-Ski", src: img.fleeceCouple },
  { title: "Retail", src: img.appleApples },
  { title: "Events & Festivals", src: img.toast },
];

function B2B() {
  return (
    <div className="retro-page">
      <section className="relative overflow-hidden slant-bottom bg-yellow text-navy">
        <img src={img["peach-tray-cans"]} alt="Moody bar scene with Solenne cans on a tray" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="relative mx-auto max-w-[1920px] px-5 py-28 md:px-10 md:py-40">
          <Words as="h1" className="display-xl max-w-5xl" text="Solenne for your bar, restaurant & shop" />
          <a href="#inquiry" className={btnClass("yellow", "mt-10")}>Request wholesale info</a>
        </div>
        <Doodles items={doodlePlacements.b2b} />
      </section>

      <section className="slant-bottom bg-yellow px-5 py-16 text-navy md:px-10 md:py-24">
        <div className="mx-auto max-w-[1920px]">
          <h2 className="display-md mb-10">Why Solenne?</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard icon={<Sparkles />} title="Stands out" text="A drink your guests haven't seen before — and will order again." />
            <FeatureCard icon={<TrendingUp />} title="Strong margin" text="Premium positioning with healthy margins for your business." />
            <FeatureCard icon={<Snowflake />} title="Easy to store" text="Cans stack, chill fast and never break." />
            <FeatureCard icon={<Megaphone />} title="Great branding" text="POS material and merch to make your fridge pop." />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1920px] px-5 py-16 md:px-10 md:py-24">
        <h2 className="display-md mb-10">Assortment</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {["crispy-apple", "white-peach"].map((s) => {
            const p = getProduct(s);
            if (!p) return null;
            return (
              <div key={s} className={`flex flex-col gap-6 rounded-lg bg-yellow p-5 text-navy sm:flex-row `}>
                <img src={p.images[0].src} alt={p.images[0].alt} className="h-36 w-36 shrink-0 rounded-2xl object-cover md:h-44 md:w-44" />
                <div>
                  <h3 className={`text-3xl text-navy`}>{p.name}</h3>
                  <p className="mt-3">Case: 24 × 330 ml cans</p>
                  <p>Minimum order: 5 cases</p>
                  <p className="mt-2 text-xs opacity-70">PLACEHOLDER — to be confirmed.</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1920px] grid-cols-2 gap-4 px-5 pb-16 md:grid-cols-5 md:px-10">
        {useCases.map((u, i) => (
          <Reveal key={u.title} delay={i * 60} className="relative overflow-hidden rounded-[var(--radius-card)]">
            <img src={u.src} alt={u.title} loading="lazy" className="aspect-[3/4] w-full object-cover" />
            <p className="absolute inset-x-0 bottom-0 bg-navy p-4 font-display text-lg font-bold uppercase text-cream">{u.title}</p>
          </Reveal>
        ))}
      </section>

      <section className="bg-paper px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1920px]">
          <h2 className="display-md mb-14">The process</h2>
          <StepTimeline steps={b2bSteps} />
          <div className="mt-16 flex flex-wrap gap-4">
            <a href="/downloads/solenne-price-list-placeholder.pdf" download className={btnClass("navy")}><Download className="h-4 w-4" /> Price list (PDF)</a>
            <a href="/downloads/solenne-press-kit-placeholder.pdf" download className={btnClass("outline")}><Download className="h-4 w-4" /> Press kit (PDF)</a>
          </div>
        </div>
      </section>

      <section id="inquiry" className="scroll-mt-28 slant-bottom bg-yellow px-5 py-16 text-navy md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="display-md mb-10">Let's talk</h2>
          <LeadForm
            kind="b2b"
            submitLabel="Send inquiry"
            consent="I agree that Solenne may contact me about this inquiry."
            success={<><h3 className="text-3xl">Thanks!</h3><p className="mt-3">Our team will reach out within 2 business days.</p></>}
            fields={[
              { name: "company", label: "Company", required: true },
              { name: "name", label: "Name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "phone", label: "Phone", type: "tel" },
              { name: "location", label: "Location", required: true },
              { name: "businessType", label: "Business type", as: "select", options: ["Bar / Club", "Restaurant", "Hotel / Après-Ski", "Retail", "Events / Festivals", "Other"], required: true },
              { name: "flavors", label: "Flavors of interest", as: "select", options: ["Crispy Apple", "White Peach", "Both"] },
              { name: "quantity", label: "Estimated quantity (cases / month)" },
              { name: "message", label: "Message", as: "textarea" },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
