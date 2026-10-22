import { useState, type FormEvent } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Gift, Leaf, MapPin, Minus, Plus, X } from "lucide-react";
import { getProduct, products, formatPrice, themeClasses, type Product } from "@/data/products";
import { img } from "@/lib/images";
import { useCart } from "@/lib/cart";
import { submitForm } from "@/lib/forms";
import { Accordion, FormField, ProductCard, QuoteBlock, Reveal, Stars, WaveDivider, btnClass } from "@/components/site/ui";
import { cn } from "@/lib/utils";

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
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const p = getProduct(slug)!;
  const t = themeClasses[p.theme];
  const isCider = p.category === "cider";
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [purchase, setPurchase] = useState<"once" | "sub">("once");
  const [freq, setFreq] = useState("4 weeks");
  const [size, setSize] = useState(p.sizes?.[0] ?? "");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [sizeGuide, setSizeGuide] = useState(false);
  const price = purchase === "sub" ? p.price * 0.9 : p.price;

  const related = products.filter((x) => x.slug !== p.slug && x.category === p.category).slice(0, 3);
  const onLight = p.theme === "peach";

  return (
    <div key={p.slug}>
      <section className={cn(t.page, "pb-16 md:pb-24")}>
        <div className="mx-auto grid max-w-[1920px] gap-10 px-5 pt-10 md:px-10 md:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Gallery */}
          <div className="grid grid-cols-3 gap-3">
            <button onClick={() => setLightbox(0)} className="col-span-3 overflow-hidden rounded-[var(--radius-card)]">
              <img src={p.images[0].src} alt={p.images[0].alt} className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-105" />
            </button>
            {p.images.slice(1).map((im, i) => (
              <button key={im.src + i} onClick={() => setLightbox(i + 1)} className="overflow-hidden rounded-2xl">
                <img src={im.src} alt={im.alt} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105" />
              </button>
            ))}
          </div>

          {/* Details */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow opacity-80">{isCider ? "Original Hard Cider · 330 ml · 5.1%" : "Solenne Merch"}</p>
            <h1 className="display-lg mt-3 normal-case">{p.name}</h1>
            <Stars className="mt-4" />
            <p className="mt-5 text-lg md:text-xl">{p.description}</p>

            {isCider && (
              <div className="mt-8 grid grid-cols-2 gap-2 rounded-full bg-forest/30 p-1">
                <Link to="/shop/$slug" params={{ slug: "crispy-apple" }} className={cn("rounded-full py-2.5 text-center text-sm font-semibold", p.pack === "single" ? "bg-cream text-forest" : "")}>Single Flavors</Link>
                <Link to="/shop/$slug" params={{ slug: "mixed-pack" }} className={cn("rounded-full py-2.5 text-center text-sm font-semibold", p.pack === "variety" ? "bg-cream text-forest" : "")}>Variety Packs</Link>
              </div>
            )}
            {isCider && p.pack === "single" && (
              <div className="mt-4 flex gap-3">
                {["crispy-apple", "white-peach"].map((s) => {
                  const x = getProduct(s)!;
                  return (
                    <Link key={s} to="/shop/$slug" params={{ slug: s }} className={cn("overflow-hidden rounded-xl border-2 text-center text-xs font-semibold", s === p.slug ? "border-cream" : "border-transparent opacity-70")}>
                      <img src={x.images[0].src} alt="" className="h-16 w-20 object-cover" />
                      <span className="block bg-background py-1 text-forest">{x.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}

            {p.sizes && p.sizes.length > 1 && (
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <p className="eyebrow">Size</p>
                  <button onClick={() => setSizeGuide(true)} className="text-sm underline">Size guide</button>
                </div>
                <div className="mt-3 flex gap-2">
                  {p.sizes.map((s) => (
                    <button key={s} onClick={() => setSize(s)} aria-pressed={size === s} className={cn("h-12 w-14 rounded-full border-2 border-current font-semibold", size === s && "bg-cream text-forest border-cream")}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            <fieldset className="mt-8 space-y-3">
              <legend className="sr-only">Purchase option</legend>
              <label className="flex cursor-pointer items-center gap-4 rounded-2xl bg-background p-4 text-forest">
                <input type="radio" name="purchase" checked={purchase === "once"} onChange={() => setPurchase("once")} className="h-5 w-5 accent-forest" />
                <span className="flex-1 font-semibold">One-time purchase</span>
                <span>{formatPrice(p.price)} <span className="text-xs opacity-70">/ {p.unit}</span></span>
              </label>
              {isCider && (
                <label className="block cursor-pointer rounded-2xl bg-background p-4 text-forest">
                  <span className="flex items-center gap-4">
                    <input type="radio" name="purchase" checked={purchase === "sub"} onChange={() => setPurchase("sub")} className="h-5 w-5 accent-forest" />
                    <span className="flex-1 font-semibold">Subscribe & Save 10%</span>
                    <span>{formatPrice(p.price * 0.9)}</span>
                  </span>
                  {purchase === "sub" && (
                    <span className="mt-3 flex flex-wrap gap-2 pl-9">
                      {["2 weeks", "4 weeks", "8 weeks"].map((f) => (
                        <button type="button" key={f} onClick={() => setFreq(f)} className={cn("rounded-full border border-forest px-3 py-1 text-xs", freq === f && "bg-forest text-cream")}>Every {f}</button>
                      ))}
                    </span>
                  )}
                </label>
              )}
            </fieldset>

            <div className="mt-5 flex gap-3">
              <div className="flex items-center gap-4 rounded-full bg-background px-4 text-forest">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity"><Minus className="h-4 w-4" /></button>
                <span className="w-5 text-center font-semibold" aria-live="polite">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity"><Plus className="h-4 w-4" /></button>
              </div>
              <button
                className={btnClass(onLight ? "green" : "cream", "flex-1")}
                onClick={() => add({ slug: p.slug, name: p.name, price, image: p.images[0].src, variant: [size !== "One size" ? size : "", purchase === "sub" ? `Every ${freq}` : ""].filter(Boolean).join(" · ") || undefined }, qty)}
              >
                Add to cart · {formatPrice(price * qty)}
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link to="/contact" className={btnClass("white", "py-2.5 normal-case")}><MapPin className="h-4 w-4" /> Find me in store</Link>
              <Link to="/contact" className={btnClass("white", "py-2.5 normal-case")}><Gift className="h-4 w-4" /> Send as a gift</Link>
            </div>
            <p className="mt-8 flex items-center gap-2 border-t border-current/30 pt-6 text-sm"><Leaf className="h-4 w-4" />{isCider ? "Infinitely recyclable aluminium cans. Apples sourced in South Tyrol." : "Made to last. Shipped plastic-free."}</p>
            <p className="mt-2 text-xs opacity-70">Prices are placeholders, to be confirmed.</p>
          </div>
        </div>
      </section>

      <WaveDivider top={p.theme === "apple" ? "fill-apple" : p.theme === "peach" ? "fill-peach" : p.theme === "navy" ? "fill-navy" : "fill-forest"} className="bg-forest" />
      {isCider ? <CiderSections p={p} /> : <MerchSections p={p} />}

      <section className="mx-auto max-w-[1920px] px-5 py-16 md:px-10 md:py-24">
        <h2 className="display-md mb-10">You might also like</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => <ProductCard key={r.slug} product={r} dark={r.theme === "forest"} />)}
        </div>
      </section>

      {lightbox !== null && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-forest/95 p-4" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}>
          <button className="absolute right-6 top-6 text-cream" aria-label="Close"><X className="h-8 w-8" /></button>
          <img src={p.images[lightbox].src} alt={p.images[lightbox].alt} className="max-h-[85vh] max-w-full rounded-[var(--radius-card)]" />
        </div>
      )}
      {sizeGuide && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-forest/80 p-4" role="dialog" aria-modal="true" aria-label="Size guide">
          <div className="w-full max-w-md rounded-[var(--radius-card)] bg-background p-8 text-forest">
            <div className="flex items-center justify-between"><h2 className="text-3xl">Size guide</h2><button onClick={() => setSizeGuide(false)} aria-label="Close"><X /></button></div>
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
      <div className="mt-2 h-3 rounded-full bg-cream/20"><div className="h-3 rounded-full bg-cream" style={{ width: `${value}%` }} /></div>
    </div>
  );
}

function CiderSections({ p }: { p: Product }) {
  return (
    <>
      <section className="bg-forest text-cream">
        <div className="mx-auto grid max-w-[1920px] gap-12 px-5 py-16 md:grid-cols-2 md:px-10 md:py-24">
          <Reveal>
            <h2 className="display-md">About this cider</h2>
            <p className="mt-6 text-lg leading-relaxed">{p.description} Lightly sparkling, never syrupy, made to be shared.</p>
          </Reveal>
          <Reveal className="space-y-6" delay={100}>
            <Bar label="Sweet" value={p.taste!.sweet} />
            <Bar label="Refreshing" value={p.taste!.refreshing} />
            <Bar label="Sparkling" value={p.taste!.sparkling} />
          </Reveal>
        </div>
        <div className="mx-auto grid max-w-[1920px] grid-cols-2 gap-4 px-5 pb-16 md:grid-cols-4 md:px-10">
          {["5.1% ABV", "330 ml", "Made in South Tyrol", "Gluten-free *"].map((f) => (
            <div key={f} className="rounded-[var(--radius-card)] border-2 border-cream p-6 text-center font-display text-xl font-bold uppercase md:text-2xl">{f}</div>
          ))}
        </div>
        <p className="px-5 pb-12 text-center text-xs opacity-70">* To be confirmed.</p>
      </section>

      <section className="mx-auto max-w-[1920px] px-5 py-16 md:px-10 md:py-24">
        <h2 className="display-md">Serve it like this</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {p.serve!.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <img src={s.src} alt={s.title} loading="lazy" className={cn("aspect-[4/5] w-full rounded-[var(--radius-card)] object-cover shadow-tilt", i === 1 ? "rotate-2" : "-rotate-2")} />
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
        {[img.toast, img.tray, img.pool, img.peachTable].map((s, i) => (
          <img key={s} src={s} alt="Solenne lifestyle moment" loading="lazy" className={cn("aspect-square w-64 shrink-0 rounded-[var(--radius-card)] object-cover md:w-full", i % 2 ? "rotate-2" : "-rotate-2")} />
        ))}
      </section>

      <section className="relative overflow-hidden text-cream">
        <img src={img.press} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="relative px-5 py-24 md:py-32">
          <p className="eyebrow mb-6 text-center">Pop in the Press</p>
          <QuoteBlock quote="Press quote placeholder — your first review goes here." source="Publication name (placeholder)" />
        </div>
      </section>

      <Reviews />
    </>
  );
}

function Reviews() {
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<Record<string, string>>({});
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const errs: Record<string, string> = {};
    if (!d.name?.trim()) errs.name = "Please add your name.";
    if (!d.review?.trim() || d.review.trim().length < 10) errs.review = "Tell us a little more (10+ characters).";
    setErr(errs);
    if (Object.keys(errs).length) return;
    await submitForm("review", d);
    setSent(true);
  };
  return (
    <section className="bg-paper px-5 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="display-md">Reviews</h2>
        <p className="mt-4 text-lg">No reviews yet. Be the first to tell us what you think.</p>
        {sent ? (
          <p className="mt-8 rounded-2xl bg-forest p-6 text-cream" role="status">Thanks! Your review will appear after moderation.</p>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-5">
            <FormField id="r-name" name="name" label="Name" error={err.name} />
            <FormField id="r-review" name="review" label="Your review" as="textarea" error={err.review} />
            <button className={btnClass("green", "justify-self-start")}>Submit review</button>
          </form>
        )}
      </div>
    </section>
  );
}

function MerchSections({ p }: { p: Product }) {
  return (
    <section className="bg-forest text-cream">
      <div className="mx-auto grid max-w-[1920px] gap-12 px-5 py-16 md:grid-cols-2 md:px-10 md:py-24">
        <Accordion
          items={[
            { q: "Material", a: p.material },
            { q: "Care", a: p.care },
            { q: "Shipping & returns", a: "Free shipping in Italy over €60. Returns within 30 days, unworn and with tags. (PLACEHOLDER — to be confirmed)" },
          ]}
        />
        <div className="grid grid-cols-2 gap-4">
          {p.images.slice(0, 4).map((im, i) => (
            <img key={im.src + i} src={im.src} alt={im.alt} loading="lazy" className={cn("aspect-square w-full rounded-[var(--radius-card)] object-cover shadow-tilt", i % 2 ? "rotate-2" : "-rotate-2")} />
          ))}
        </div>
      </div>
    </section>
  );
}
