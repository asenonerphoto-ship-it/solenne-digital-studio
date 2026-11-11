import { createFileRoute, Link } from "@tanstack/react-router";
import { img } from "@/lib/images";
import { products } from "@/data/products";
import { retroCopy } from "@/data/retro";
import { doodlePlacements } from "@/data/doodles";
import { Doodles } from "@/components/site/doodles";
import { PhotoHero, PhotoBand, TiltPhoto, SectionLabel } from "@/components/site/Retro";
import { Marquee, ProductCard, Reveal, Slider, Words, slideClass, btnClass } from "@/components/site/ui";

export const Route = createFileRoute("/")({
 head: () => ({ meta: [
 { title: "Solenne — Original Hard Cider. Good vibes only." },
 { name: "description", content: "Italian hard cider from South Tyrol. Crispy Apple and White Peach in 330 ml cans, 5.1% ABV." },
 { property: "og:title", content: "Solenne — Original Hard Cider" },
 { property: "og:description", content: "Italian hard cider from South Tyrol. Life is good!" },
 { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
 ...(img["hero-hat-can-sky"].startsWith("https://") ? [{ property: "og:image", content: img["hero-hat-can-sky"] }, { name: "twitter:image", content: img["hero-hat-can-sky"] }] : []),
 ] }), component: Home,
});
function Home() {
 return <>
 <PhotoHero src={img["hero-hat-can-sky"]} alt="Solenne can on a striped towel" title={retroCopy.homeHero} />
 <Marquee />
 <section className="slant-bottom relative bg-yellow text-navy">
 <div className="mx-auto grid max-w-[1600px] items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-10 md:py-24">
 <Reveal className="px-5 md:px-14"><TiltPhoto src={img["travel-can-tattoo"]} alt="A hand holding a Solenne can" /></Reveal>
 <Reveal className="flex flex-col items-end text-right" delay={150}>
 <Words className="display-xl text-white" text={retroCopy.homeHello} />
 <p className="mt-8 max-w-md text-lg uppercase">{retroCopy.hello}</p>
 <p className="mt-4 max-w-md font-display uppercase">{retroCopy.helloBold}</p>
 <Link to="/our-story" className={btnClass("navy", "mt-8")}>Explore our story</Link>
 </Reveal></div><Doodles items={doodlePlacements.homeHello} />
 </section>
 <PhotoBand src={img["crew-flatlay-1"]} alt="Solenne cans and fruit on a tray" />
 <section className="relative bg-cream"><SectionLabel>Our collection</SectionLabel><Doodles items={doodlePlacements.collection} />
 <div className="collection-band bg-yellow"><Slider>{products.filter(p => p.category === "cider").map(p => <div key={p.slug} className={slideClass}><ProductCard product={p} /></div>)}</Slider></div></section>
 <section className="slant-bottom grid bg-yellow text-navy md:grid-cols-2">
 <div className="flex flex-col items-end justify-center px-6 py-16 text-right md:px-14 md:py-24"><Reveal className="flex flex-col items-end">
 <Words className="display-xl text-white" text="What is|Solenne?" /><p className="mt-8 max-w-md text-lg uppercase">{retroCopy.what}</p>
 <Link to="/how-its-made" className={btnClass("navy", "mt-8")}>How it's made</Link></Reveal></div>
 <div className="film-photo relative min-h-[420px]"><img src={img["pour-can-tiles"]} alt="Solenne cider pouring into a green glass" className="h-full w-full object-cover" /></div>
 </section>
 <section className="relative bg-cream"><SectionLabel>The merch</SectionLabel><Doodles items={doodlePlacements.merch} />
 <div className="collection-band bg-navy"><Slider>{products.filter(p => p.category === "merch").map(p => <div key={p.slug} className={slideClass}><ProductCard product={p} /></div>)}</Slider></div></section>
 <PhotoBand src={img["merch-stack"]} alt="Solenne fleece laid out on grass" />
 </>;
}
