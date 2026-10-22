import { createFileRoute } from "@tanstack/react-router";
import { CalendarHeart, Percent, Rocket, Shirt } from "lucide-react";
import { img } from "@/lib/images";
import { crewSteps } from "@/data/content";
import { FeatureCard, Reveal, StepTimeline, Words, btnClass } from "@/components/site/ui";
import { LeadForm } from "@/components/site/LeadForm";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/crew")({
  head: () => ({
    meta: [
      { title: "Join the Solenne Crew" },
      { name: "description", content: "Become a Solenne Seller or Face. Free merch, crew discounts, events and 20% commission." },
      { property: "og:title", content: "Join the Solenne Crew" },
      { property: "og:description", content: "Our community of friends who bring Solenne everywhere." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(img.tray.startsWith("https://") ? [{ property: "og:image", content: img.tray }, { name: "twitter:image", content: img.tray }] : []),
    ],
  }),
  component: Crew,
});

function Crew() {
  return (
    <>
      <section className="grid bg-forest text-cream md:grid-cols-2">
        <img src={img.tray} alt="Friends serving a tray of Solenne cans at a party" className="h-[420px] w-full object-cover md:h-full md:min-h-[700px]" />
        <div className="flex flex-col items-end justify-center px-6 py-16 text-right md:px-16 lg:px-24">
          <Words as="h1" className="display-xl" text="Join|the|crew!" />
          <p className="mt-8 max-w-md text-lg">The Crew is our community of friends who bring Solenne to bars, parties, mountains and festivals.</p>
          <a href="#apply" className={btnClass("cream", "mt-8")}>Apply now</a>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1920px] gap-8 px-5 py-16 md:grid-cols-2 md:px-10 md:py-24">
        <Reveal className="h-full rounded-[var(--radius-card)] bg-apple p-10 text-cream md:p-14">
          <p className="eyebrow">Track 01</p>
          <h2 className="display-lg mt-3">Sellers</h2>
          <p className="mt-6 text-lg">Sell Solenne to your friends, bars and shops — and earn 20% commission on every order.</p>
        </Reveal>
        <Reveal delay={100} className="h-full rounded-[var(--radius-card)] bg-peach p-10 text-forest md:p-14">
          <p className="eyebrow">Track 02</p>
          <h2 className="display-lg mt-3">Faces</h2>
          <p className="mt-6 text-lg">Be part of our look. No posting obligations, just good vibes.</p>
        </Reveal>
      </section>

      <section className="bg-forest px-5 py-16 text-cream md:px-10 md:py-24">
        <div className="mx-auto max-w-[1920px]">
          <h2 className="display-md mb-10">Crew benefits</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard icon={<Shirt />} title="Free merch" text="Hats, fleeces and crewnecks for the whole season." />
            <FeatureCard icon={<Percent />} title="Crew discounts" text="Special prices on every order." />
            <FeatureCard icon={<CalendarHeart />} title="Events & festivals" text="Guest lists, après-ski and summer parties." />
            <FeatureCard icon={<Rocket />} title="Early access" text="Taste new flavors before anyone else." />
          </div>
          <h2 className="display-md mb-14 mt-20">How it works</h2>
          <StepTimeline steps={crewSteps} />
        </div>
      </section>

      <section className="mx-auto grid max-w-[1920px] grid-cols-2 gap-4 px-5 py-16 md:grid-cols-4 md:gap-8 md:px-10">
        {[img.fleeceCouple, img.toast, img.fleeceWoman, img.hat].map((s, i) => (
          <img key={s} src={s} alt="Solenne crew at events and outdoors" loading="lazy" className={cn("aspect-square w-full rounded-[var(--radius-card)] object-cover shadow-tilt", i % 2 ? "rotate-2" : "-rotate-2")} />
        ))}
      </section>

      <section id="apply" className="scroll-mt-28 bg-forest px-5 py-16 text-cream md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="display-md mb-10">Apply to the crew</h2>
          <LeadForm
            kind="crew"
            submitLabel="Send application"
            consent="I'm 18+ and agree that Solenne may contact me about my application."
            success={<><h3 className="text-3xl">Welcome aboard!</h3><p className="mt-3">Thanks for applying. We'll get back to you within a few days.</p></>}
            fields={[
              { name: "name", label: "Name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "instagram", label: "Instagram" },
              { name: "city", label: "City", required: true },
              { name: "track", label: "Track", as: "select", options: ["Sellers", "Faces"], required: true, full: true },
              { name: "motivation", label: "Why do you want to join?", as: "textarea", required: true },
            ]}
          />
        </div>
      </section>
    </>
  );
}
