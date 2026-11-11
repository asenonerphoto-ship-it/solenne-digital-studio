import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { img } from "@/lib/images";
import { faqs, madeSteps } from "@/data/content";
import { Accordion, Reveal, Words, btnClass } from "@/components/site/ui";
import { prefersReducedMotion, useScrollProgress } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { Doodles } from "@/components/site/doodles";
import { doodlePlacements } from "@/data/doodles";

export const Route = createFileRoute("/how-its-made")({
  head: () => ({
    meta: [
      { title: "What is Solenne & How It's Made" },
      { name: "description", content: "From orchard to can: how Solenne hard cider is made with apples from South Tyrol." },
      { property: "og:title", content: "How Solenne is made" },
      { property: "og:description", content: "From orchard to can, step by step." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(img["apple-green-fleece"].startsWith("https://") ? [{ property: "og:image", content: img["apple-green-fleece"] }, { name: "twitter:image", content: img["apple-green-fleece"] }] : []),
    ],
  }),
  component: Made,
});

function Counter({ to, suffix, decimals = 0 }: { to: number; suffix: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e) return;
      if (!e.isIntersecting) return;
      io.disconnect();
      if (prefersReducedMotion()) { setV(to); return; }
      const start = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - start) / 1400);
        setV(to * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v.toFixed(decimals)}{suffix}</span>;
}

function Made() {
  const track = useRef<HTMLDivElement>(null);
  const line = useRef<SVGPathElement>(null);
  const [reached, setReached] = useState(-1);
  useScrollProgress(track, (p) => {
    if (line.current) line.current.style.strokeDashoffset = String(1 - p);
    setReached(Math.floor(p * madeSteps.length + 0.35) - 1);
  }, 0.6);
  return (
    <div className="retro-page">
      <section className="overflow-hidden slant-bottom bg-yellow text-navy">
        <div className="mx-auto grid max-w-[1920px] items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-10 md:py-24">
          <div>
            <Words as="h1" className="display-xl" text="What is|Solenne?" />
            <p className="mt-8 max-w-lg text-lg leading-relaxed">An original hard cider with Italian attitude. Crisp, fruity and lightly sparkling — made for sharing, not sipping alone. Our philosophy is simple: real fruit, honest process, great style.</p>
          </div>
          <img src={img["apple-green-fleece"]} alt="Hand holding a Crispy Apple can against a green sweater" className="mx-auto w-[80%] max-w-md rotate-3 rounded-[var(--radius-card)] shadow-tilt" />
        </div>
        <Doodles items={doodlePlacements.made} />
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <h2 className="display-md text-center">From orchard to can</h2>
        <div ref={track} className="relative mt-16">
          <svg className="absolute left-1/2 top-0 hidden h-full w-16 -translate-x-1/2 md:block" viewBox="0 0 40 1000" preserveAspectRatio="none" aria-hidden>
            <path d="M20 0 Q40 62 20 125 T20 250 T20 375 T20 500 T20 625 T20 750 T20 875 T20 1000" ref={line} pathLength={1} strokeDasharray="1" strokeDashoffset="1" className="fill-none stroke-yellow" strokeWidth="4" />
          </svg>
          <ol className="space-y-16 md:space-y-24">
            {madeSteps.map((s, i) => (
              <li key={s.title} className="relative grid items-center gap-8 md:grid-cols-2 md:gap-24">
                <Reveal className={cn(i % 2 && "md:order-2")}>
                  <img src={s.src} alt={s.title} loading="lazy" className={cn("aspect-[4/3] w-full rounded-[var(--radius-card)] object-cover shadow-tilt", i % 2 ? "rotate-2" : "-rotate-2")} />
                </Reveal>
                <Reveal delay={100} className={cn(i % 2 && "md:order-1 md:text-right")}>
                  <span data-in={reached >= i} className="badge-pop grid h-14 w-14 place-items-center rounded-full bg-navy font-display text-2xl font-bold text-cream md:inline-grid">{i + 1}</span>
                  <h3 className="mt-4 text-3xl md:text-4xl">{s.title}</h3>
                  <p className="mt-3 text-lg leading-relaxed">{s.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-yellow px-5 py-16 text-navy md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 text-center md:grid-cols-3">
          <div><p className="display-lg"><Counter to={5.1} decimals={1} suffix="%" /></p><p className="eyebrow mt-2">ABV</p></div>
          <div><p className="display-lg"><Counter to={330} suffix=" ml" /></p><p className="eyebrow mt-2">Classic can</p></div>
          <div><p className="display-lg"><Counter to={100} suffix="%" /></p><p className="eyebrow mt-2">Natural ingredients *</p></div>
        </div>
        <p className="mt-8 text-center text-xs">* To be confirmed.</p>
      </section>

      <section className="grid slant-bottom bg-yellow text-navy md:grid-cols-2">
        <img src={img.pool} alt="Solenne can on a striped towel by a pool" className="h-[360px] w-full object-cover md:h-full" />
        <div className="px-6 py-16 md:px-16 lg:px-24">
          <h2 className="display-md">Sustainability</h2>
          <p className="mt-6 text-lg leading-relaxed">Aluminium cans are infinitely recyclable and chill fast, so less energy goes into keeping them cold. Our apples are sourced regionally in South Tyrol to keep the journey from tree to can short.</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 md:py-24">
        <h2 className="display-md mb-10">FAQ</h2>
        <Accordion items={faqs} />
        <div className="mt-12 text-center"><Link to="/shop" className={btnClass("navy")}>Shop now</Link></div>
      </section>
    </div>
  );
}
