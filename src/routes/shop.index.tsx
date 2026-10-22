import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";
import { ProductCard, Words } from "@/components/site/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop — Solenne Hard Cider & Merch" },
      { name: "description", content: "Shop Solenne Crispy Apple, White Peach, Mixed Packs and merch." },
      { property: "og:title", content: "Shop Solenne" },
      { property: "og:description", content: "Hard cider and merch from South Tyrol." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

function Pill({ active, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement> & { active: boolean }) {
  return <button {...p} aria-pressed={active} className={cn("rounded-full border-2 border-forest px-6 py-2.5 text-sm font-semibold uppercase transition-colors", active ? "bg-forest text-cream" : "hover:bg-paper")} />;
}

function Shop() {
  const [tab, setTab] = useState<"cider" | "merch">("cider");
  const [pack, setPack] = useState<"all" | "single" | "variety">("all");
  const list = products.filter((p) => p.category === tab && (tab === "merch" || pack === "all" || p.pack === pack));
  return (
    <>
      <section className="bg-forest px-5 py-16 text-cream md:px-10 md:py-24">
        <Words as="h1" className="display-xl mx-auto block max-w-[1920px]" text="Shop" />
      </section>
      <section className="mx-auto max-w-[1920px] px-5 py-12 md:px-10">
        <div className="flex flex-wrap gap-3">
          <Pill active={tab === "cider"} onClick={() => setTab("cider")}>Cider</Pill>
          <Pill active={tab === "merch"} onClick={() => setTab("merch")}>Merch</Pill>
          {tab === "cider" && (
            <div className="flex flex-wrap gap-3 md:ml-auto">
              <Pill active={pack === "all"} onClick={() => setPack("all")}>All</Pill>
              <Pill active={pack === "single"} onClick={() => setPack("single")}>Single Flavors</Pill>
              <Pill active={pack === "variety"} onClick={() => setPack("variety")}>Variety Packs</Pill>
            </div>
          )}
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <ProductCard key={p.slug} product={p} dark={p.theme === "forest"} />)}
        </div>
      </section>
    </>
  );
}
