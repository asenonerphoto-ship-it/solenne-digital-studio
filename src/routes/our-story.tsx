import { createFileRoute, Link } from "@tanstack/react-router";
import { Mountain, Sparkles, Sun } from "lucide-react";
import { img } from "@/lib/images";
import { products } from "@/data/products";
import { storyTimeline } from "@/data/content";
import { FeatureCard, ProductCard, QuoteBlock, Reveal, Slider, StepTimeline, Words, btnClass, slideClass } from "@/components/site/ui";
import { PhotoHero, PhotoBand, SectionLabel } from "@/components/site/Retro";
import { Doodles } from "@/components/site/doodles";
import { doodlePlacements } from "@/data/doodles";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story — Solenne Hard Cider" },
      { name: "description", content: "Two friends, a trip to Osaka and the apple valleys of South Tyrol. The story behind Solenne." },
      { property: "og:title", content: "Our Story — Solenne" },
      { property: "og:description", content: "From Osaka to South Tyrol: how Solenne began." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(img["peach-tray-cans"].startsWith("https://") ? [{ property: "og:image", content: img["peach-tray-cans"] }, { name: "twitter:image", content: img["peach-tray-cans"] }] : []),
    ],
  }),
  component: Story,
});

function Story() {
  return (
    <div className="retro-page story-page">
      <PhotoHero src={img["peach-tray-cans"]} alt="Peach cans with fruit and straws" label="Our Story" />
      <h1 className="sr-only">Our Story</h1>

      <section className="story-block story-founders">
        <div className="text-center">
          <SectionLabel tilted>The founders</SectionLabel>
        </div>
        <div className="story-split">
          <Reveal className="story-copy space-y-5 text-lg leading-relaxed [&>p:first-child]:font-display [&>p:first-child]:text-base [&>p:first-child]:text-center [&>p:first-child]:uppercase">
            <p>Solenne started with two friends, one kitchen table and a simple feeling: Italy makes the best food and wine in the world — so why didn't we have a cider that felt the same?</p>
            <p>We grew up between orchards and mountains, skiing in winter and chasing festivals in summer. We wanted a drink that fit that life: light, crisp, a little bit retro and always good company.</p>
            <p>So we made one. With apples from home, a can we're proud to hold, and a name that sounds like the sun.</p>
            <QuoteBlock quote="Life is good. Our cider should taste like it." source="The Solenne founders" className="!text-left pt-6 [&_blockquote]:text-3xl" />
          </Reveal>
          <div className="story-photo"><img src={img.founders} alt="The two Solenne founders smiling" className="w-full object-cover" /></div>
        </div><Doodles items={doodlePlacements.storyFounders} />
      </section>

      <section className="story-block story-split story-travel bg-cream text-navy">
        <div className="story-copy">
          <Reveal>
            <SectionLabel tilted className="rotate-6">Travel stories</SectionLabel>
            <p className="mt-8 max-w-lg text-lg leading-relaxed">In Osaka we found vending machines and corner shops full of colorful canned drinks — playful, crisp, made for the moment. We came home to South Tyrol, one of Europe's great apple valleys, and thought: this is where that idea belongs.</p>
          </Reveal>
        </div>
        <div className="story-photo md:order-first"><img src={img["travel-can-tattoo"]} alt="A Solenne can held in a hand with gold rings" className="w-full object-cover" /></div>
        <Doodles items={doodlePlacements.storyTravel} />
      </section>

      <section className="story-block story-split bg-cream text-navy">
        <div className="story-copy"><SectionLabel tilted>Italian cider</SectionLabel><p className="mt-8 text-lg leading-relaxed">So we made one. With apples from home, a can we're proud to hold, and a name that sounds like the sun.</p></div>
        <div className="story-photo"><img src={img["fleece-ski"]} alt="A Solenne moment in the snow" className="w-full object-cover" /></div><Doodles items={doodlePlacements.storyItalian} />
      </section>
      <section className="bg-paper px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1920px]">
          <h2 className="display-md mb-14">How we got here</h2>
          <StepTimeline steps={storyTimeline} className="text-navy" />
        </div>
      </section>

      <section className="slant-bottom bg-yellow px-5 py-16 text-navy md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1920px] gap-6 md:grid-cols-3">
          <FeatureCard icon={<Mountain />} title="Made in Italy" text="Apples from South Tyrol, made close to home." />
          <FeatureCard icon={<Sparkles />} title="Quality you can taste" text="Real fruit, slow fermentation, no shortcuts." />
          <FeatureCard icon={<Sun />} title="Life is good!" text="Made for friends, mountains and long evenings." />
        </div>
      </section>

      <section className="story-moments photo-grid mx-auto grid max-w-[1920px] grid-cols-2 gap-4 px-5 py-16 md:grid-cols-3 md:gap-6 md:px-10 md:py-24">
        {[img["cheers-palms"], img["apple-headphones"], img["table-peanuts"], img["peach-headphones"], img["tray-sandwich"], img["apple-green-fleece"]].map((s) => (
          <img key={s} src={s} alt="Solenne moments with friends" loading="lazy" />
        ))}
      </section>

      <section className="collection-band bg-yellow">
        <h2 className="display-md mb-10">Our collection</h2>
        <Slider>
          {products.filter((p) => p.category === "cider").map((p) => <div key={p.slug} className={slideClass}><ProductCard product={p} /></div>)}
        </Slider>
      </section>

      <PhotoBand src={img["table-peanuts"]} alt="Cider at a lunch table" />
      <section className="slant-top bg-navy px-5 py-20 text-center text-yellow">
        <h2 className="display-lg">Join the crew</h2>
        <Link to="/crew" className={btnClass("yellow", "mt-8")}>Become part of it</Link>
      </section>
    </div>
  );
}
