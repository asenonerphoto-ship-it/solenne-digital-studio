import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Gift, Leaf, MapPin, X } from "lucide-react";
import { getProduct, products, type Product } from "@/data/products";
import { img } from "@/lib/images";
import { ShopifyBuyButton } from "@/components/site/ShopifyBuyButton";
import { DEFAULT_PACK_SIZE, PACK_SIZES, getShopifySelection, type PackSize } from "@/config/shopify";
import { Accordion, Button, ProductCard, Reveal, btnClass } from "@/components/site/ui";
import { cn } from "@/lib/utils";
import { Doodles } from "@/components/site/doodles";
import { doodlePlacements } from "@/data/doodles";
import { SectionLabel } from "@/components/site/Retro";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { slug: product.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getProduct(loaderData.slug) : undefined;
    if (!p) return { meta: [{ title: "Product not found — Solenne" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${p.name} — Solenne` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.name} — Solenne` },
        { property: "og:description", content: p.short },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(p.images[0].src.startsWith("https://") ? [{ property: "og:image", content: p.images[0].src }, { name: "twitter:image", content: p.images[0].src }] : []),
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const product = getProduct(slug);
  if (!product) throw notFound();
  return <ProductDetails key={slug} p={product} />;
}

function ProductDetails({ p }: { p: Product }) {
  const isCider = p.category === "cider";
  const [packSize, setPackSize] = useState<PackSize>(DEFAULT_PACK_SIZE);
  const [size, setSize] = useState(p.sizes?.[0] ?? "");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [sizeGuide, setSizeGuide] = useState(false);
  const selection = getShopifySelection(p.slug, isCider ? packSize : size);

  const related = products.filter((x) => x.slug !== p.slug && x.category === p.category).slice(0, 3);

  return (
    <div key={p.slug}>
      <section className="relative bg-cream pb-16 text-navy md:pb-24">
        <div className="mx-auto grid max-w-[1920px] gap-10 px-5 pt-10 md:px-10 md:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Gallery */}
          <div className="product-gallery grid gap-3">
            <Button variant="outline" onClick={() => setLightbox(0)} aria-label={`Enlarge ${p.name} photo 1`} className="overflow-hidden rounded-xl border-0 p-0">
              <img key={p.slug} src={p.images[0].src} alt={p.images[0].alt} className="fade-swap aspect-square w-full object-cover transition-transform duration-700 hover:scale-105" />
            </Button>
            {p.images.slice(1).map((im, i) => (
              <Button variant="outline" key={im.src + i} onClick={() => setLightbox(i + 1)} aria-label={`Enlarge ${p.name} photo ${i + 2}`} className="overflow-hidden rounded-xl border-0 p-0">
                <img src={im.src} alt={im.alt} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105" />
              </Button>
            ))}
          </div>

          {/* Details */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow opacity-80">{isCider ? "Original Hard Cider · 330 ml · 5.1%" : "Solenne Merch"}</p>
            <h1 className="product-title display-lg mt-3">{p.name}</h1>
            <p className="mt-5 text-lg md:text-xl">{p.description}</p>

            {isCider && (
              <div className="mt-8 grid grid-cols-2 gap-3">
                <Link to="/shop/$slug" params={{ slug: "crispy-apple" }} className={cn("rounded-lg border-2 border-navy py-2.5 text-center font-display text-xs uppercase", p.pack === "single" ? "bg-yellow text-navy" : "")}>Single Flavors</Link>
                <Link to="/shop/$slug" params={{ slug: "mixed-pack" }} className={cn("rounded-lg border-2 border-navy py-2.5 text-center font-display text-xs uppercase", p.pack === "variety" ? "bg-yellow text-navy" : "")}>Variety Packs</Link>
              </div>
            )}
            {isCider && p.pack === "single" && (
              <div className="mt-4 flex gap-3">
                {["crispy-apple", "white-peach"].map((s) => {
                  const x = getProduct(s);
                  if (!x) return null;
                  return (
                    <Link key={s} to="/shop/$slug" params={{ slug: s }} className={cn("overflow-hidden rounded-xl border-2 text-center text-xs font-semibold", s === p.slug ? "border-navy" : "border-transparent opacity-70")}>
                      <img src={x.images[0].src} alt="" className="h-16 w-20 object-cover" />
                      <span className="block bg-background py-1 text-navy">{x.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}

            {p.sizes && p.sizes.length > 1 && (
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <p className="eyebrow">Size</p>
                  <Button variant="outline" onClick={() => setSizeGuide(true)} className="border-0 p-0 text-sm underline">Size guide</Button>
                </div>
                <div className="mt-3 flex gap-2">
                  {p.sizes.map((s) => (
                    <Button variant="outline" key={s} onClick={() => setSize(s)} aria-pressed={size === s} className={cn("select-pop h-12 w-14 p-0 border-current", size === s && "bg-yellow text-navy border-navy")}>{s}</Button>
                  ))}
                </div>
              </div>
            )}

            {isCider && (
              <fieldset className="mt-8">
                <legend className="eyebrow">Pack size</legend>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {PACK_SIZES.map((pack) => (
                    <Button key={pack} variant="outline" aria-pressed={packSize === pack} onClick={() => setPackSize(pack)} className={cn("select-pop relative flex h-24 flex-col gap-1 rounded-2xl border-current/30 px-3 py-4 normal-case tracking-normal", packSize === pack && "border-navy bg-yellow text-navy")}>
                      <span className="text-lg font-semibold">{pack} cans</span>
                      {pack === 24 && <span className="text-xs font-light">Best value</span>}
                      {packSize === pack && <Check className="check-draw absolute right-3 top-3 h-4 w-4 opacity-60" aria-hidden />}
                    </Button>
                  ))}
                </div>
              </fieldset>
            )}
            <div className="mt-5">
              <ShopifyBuyButton productId={selection.productId} variantId={selection.variantId} tone="yellow" />
            </div>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link to="/contact" className={btnClass("white", "py-2.5 normal-case")}><MapPin className="h-4 w-4" /> Find me in store</Link>
              <Link to="/contact" className={btnClass("white", "py-2.5 normal-case")}><Gift className="h-4 w-4" /> Send as a gift</Link>
            </div>
            <p className="mt-8 flex items-center gap-2 border-t border-current/30 pt-6 text-sm"><Leaf className="h-4 w-4" />{isCider ? "Infinitely recyclable aluminium cans. Apples sourced in South Tyrol." : "Made to last. Shipped plastic-free."}</p>
            <p className="mt-2 text-xs opacity-70">Prices are placeholders, to be confirmed.</p>
          </div>
        </div>
        <Doodles items={doodlePlacements.productDetails} />
      </section>

      <div className="product-info-band relative overflow-hidden">
        <Doodles items={doodlePlacements.product} />
        {isCider ? <CiderSections p={p} /> : <MerchSections p={p} />}
      </div>

      <section className={cn("collection-band", isCider ? "bg-yellow text-navy" : "bg-navy text-white")}>
        <SectionLabel>You might also like</SectionLabel>
        <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {related.map((r) => <ProductCard key={r.slug} product={r} />)}
        </div>
      </section>

      {lightbox !== null && (
        <div className="lightbox-in fixed inset-0 z-50 grid place-items-center bg-navy/95 p-4" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}>
          <Button variant="outline" className="absolute right-6 top-6 border-0 p-0 text-white" aria-label="Close"><X className="h-8 w-8" /></Button>
          <img src={p.images[lightbox]?.src} alt={p.images[lightbox]?.alt ?? ""} className="max-h-[85vh] max-w-full rounded-[var(--radius-card)]" />
        </div>
      )}
      {sizeGuide && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-navy/80 p-4" role="dialog" aria-modal="true" aria-label="Size guide">
          <div className="w-full max-w-md rounded-[var(--radius-card)] bg-background p-8 text-navy">
            <div className="flex items-center justify-between"><h2 className="text-3xl">Size guide</h2><Button variant="outline" className="border-0 p-0" onClick={() => setSizeGuide(false)} aria-label="Close"><X /></Button></div>
            <table className="mt-6 w-full text-left">
              <thead><tr className="border-b"><th className="py-2">Size</th><th>Chest (cm)</th><th>Length (cm)</th></tr></thead>
              <tbody>{[["S", "104", "68"], ["M", "110", "70"], ["L", "116", "72"], ["XL", "122", "74"]].map((r) => <tr key={r[0]} className="border-b"><td className="py-2 font-semibold">{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td></tr>)}</tbody>
            </table>
            <p className="mt-4 text-xs">PLACEHOLDER measurements — to be confirmed.</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between eyebrow"><span>{label}</span><span>{value}%</span></div>
      <div className="mt-2 h-3 rounded-full bg-navy/20"><div className="h-3 rounded-full bg-navy" style={{ width: `${value}%` }} /></div>
    </div>
  );
}

function CiderSections({ p }: { p: Product }) {
  return (
    <>
      <section className="bg-yellow text-navy">
        <div className="mx-auto grid max-w-[1920px] gap-12 px-5 py-16 md:grid-cols-2 md:px-10 md:py-24">
          <Reveal>
            <h2 className="display-md">About this cider</h2>
            <p className="mt-6 text-lg leading-relaxed">{p.description} Lightly sparkling, never syrupy, made to be shared.</p>
          </Reveal>
          <Reveal className="space-y-6" delay={100}>
            <Bar label="Sweet" value={p.taste?.sweet ?? 0} />
            <Bar label="Refreshing" value={p.taste?.refreshing ?? 0} />
            <Bar label="Sparkling" value={p.taste?.sparkling ?? 0} />
          </Reveal>
        </div>
        <div className="mx-auto grid max-w-[1920px] grid-cols-2 gap-4 px-5 pb-16 md:grid-cols-4 md:px-10">
          {["5.1% ABV", "330 ml", "Made in South Tyrol", "Gluten-free *"].map((f) => (
            <div key={f} className="rounded-[var(--radius-card)] border-2 border-navy p-6 text-center font-display text-xl font-bold uppercase md:text-2xl">{f}</div>
          ))}
        </div>
        <p className="px-5 pb-12 text-center text-xs opacity-70">* To be confirmed.</p>
      </section>

      <section className="mx-auto max-w-[1920px] px-5 py-16 md:px-10 md:py-24">
        <h2 className="display-md">Serve it like this</h2>
        <div className="photo-grid mt-10 grid gap-8 md:grid-cols-3">
          {p.serve?.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <img src={s.src} alt={s.title} loading="lazy" className={cn("aspect-square w-full rounded-[var(--radius-card)] object-cover shadow-tilt", i === 1 ? "rotate-2" : "-rotate-2")} />
              <h3 className="mt-6 text-2xl">{s.title}</h3>
              <p className="mt-2">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-16 md:pb-24">
        <Accordion
          items={[
            { q: "Ingredients", a: "Fermented apple juice from South Tyrol, natural flavors, carbon dioxide. (PLACEHOLDER — to be confirmed)" },
            {
              q: "Nutrition facts",
              a: (
                <table className="w-full max-w-md text-left">
                  <tbody>
                    {[["Energy", "~45 kcal / 100 ml"], ["Carbohydrates", "~4 g"], ["of which sugars", "~3.5 g"], ["Protein", "0 g"], ["Fat", "0 g"]].map((r) => (
                      <tr key={r[0]} className="border-b"><td className="py-2">{r[0]}</td><td>{r[1]}</td></tr>
                    ))}
                  </tbody>
                  <caption className="caption-bottom pt-2 text-left text-xs">PLACEHOLDER values — to be confirmed.</caption>
                </table>
              ),
            },
            { q: "Allergens", a: "May contain sulphites. (PLACEHOLDER — to be confirmed)" },
          ]}
        />
      </section>

      <section className="no-scrollbar flex gap-4 overflow-x-auto px-5 pb-16 md:grid md:grid-cols-4 md:px-10">
        {[img["apple-telephone-yellow"], img["apple-can-snow-splash"], img.pool, img["can-sky-toast"]].map((s, i) => (
          <img key={s} src={s} alt="Solenne lifestyle moment" loading="lazy" className={cn("aspect-square w-64 shrink-0 rounded-[var(--radius-card)] object-cover md:w-full", i % 2 ? "rotate-2" : "-rotate-2")} />
        ))}
      </section>



    </>
  );
}

function MerchSections({ p }: { p: Product }) {
  return (
    <section className="bg-yellow text-navy">
      <div className="mx-auto grid max-w-[1920px] gap-12 px-5 py-16 md:grid-cols-2 md:px-10 md:py-24">
        <Accordion
          items={[
            { q: "Material", a: p.material },
            { q: "Care", a: p.care },
            { q: "Shipping & returns", a: "Free shipping in Italy over €60. Returns within 30 days, unworn and with tags. (PLACEHOLDER — to be confirmed)" },
          ]}
        />
        <div className="photo-grid grid grid-cols-2 gap-4">
          {p.images.slice(0, 4).map((im, i) => (
            <img key={im.src + i} src={im.src} alt={im.alt} loading="lazy" className={cn("aspect-square w-full rounded-[var(--radius-card)] object-cover shadow-tilt", i % 2 ? "rotate-2" : "-rotate-2")} />
          ))}
        </div>
      </div>
    </section>
  );
}
