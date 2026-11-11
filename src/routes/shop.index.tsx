import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";
import { img } from "@/lib/images";
import { ProductCard } from "@/components/site/ui";
import { PhotoHero, SectionLabel } from "@/components/site/Retro";
import { Doodles } from "@/components/site/doodles";
import { doodlePlacements } from "@/data/doodles";
export const Route = createFileRoute("/shop/")({
 head: () => ({meta: [
 { title: "Shop — Solenne Hard Cider & Merch" }, { name: "description", content: "Shop Solenne Crispy Apple, White Peach, Mixed Packs and merch." },
 { property: "og:title", content: "Shop Solenne" }, { property: "og:description", content: "Hard cider and merch from South Tyrol." },
 { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
 ...(img["shop-fridge-jacket"].startsWith("https://") ? [{property: "og:image", content: img["shop-fridge-jacket"]}, {name: "twitter:image", content: img["shop-fridge-jacket"]}] : []),
 ]}), component: Shop,
});
function Shop() {
 return <>
 <PhotoHero src={img["shop-fridge-jacket"]} alt="Solenne navy crewneck" title="Shop" label="Life is good!" />
 {(["cider", "merch"] as const).map(category => <section key={category} className="relative bg-cream">
 <SectionLabel>{category === "cider" ? "Our drinks" : "The merch"}</SectionLabel>
 <Doodles items={category === "cider" ? doodlePlacements.collection : doodlePlacements.merch} />
 <div className={category === "cider" ? "collection-band bg-yellow" : "collection-band bg-navy"}>
 <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
 {products.filter(p => p.category === category).map(p => <ProductCard key={p.slug} product={p} />)}</div></div>
 </section>)}
 </>;
}
