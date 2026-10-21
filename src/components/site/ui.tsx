import { useEffect, useRef, useState, type ReactNode, type ButtonHTMLAttributes, type InputHTMLAttributes } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";
import { formatPrice, themeClasses } from "@/data/products";

/* ---------- Button ---------- */
const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.06em] transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none";
const btnVariants = {
  cream: "bg-cream text-forest shadow-tilt hover:brightness-105",
  orange: "bg-peach text-forest hover:brightness-105",
  green: "bg-forest text-cream hover:bg-apple",
  outline: "border-2 border-current bg-transparent",
  white: "bg-background text-forest hover:bg-paper",
} as const;
export type BtnVariant = keyof typeof btnVariants;
export const btnClass = (v: BtnVariant = "cream", extra?: string) => cn(btnBase, btnVariants[v], extra);

export function Button({ variant = "cream", className, ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant }) {
  return <button className={btnClass(variant, className)} {...p} />;
}

/* ---------- Reveal (fade-up on scroll) ---------- */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-visible={visible} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ---------- Marquee ---------- */
export function Marquee({ text = "ORIGINAL HARD CIDER · MADE IN ITALY · ", className }: { text?: string; className?: string }) {
  const row = Array.from({ length: 8 }, () => text).join("");
  return (
    <div className={cn("overflow-hidden bg-forest py-4 text-cream", className)} aria-label="Original hard cider, made in Italy">
      <div className="flex w-max animate-marquee whitespace-nowrap font-display text-lg font-semibold tracking-[0.06em] md:text-2xl" aria-hidden>
        <span className="pr-2">{row}</span>
        <span className="pr-2">{row}</span>
      </div>
    </div>
  );
}

/* ---------- WaveDivider ---------- */
export function WaveDivider({ top = "fill-background", className, flip }: { top?: string; className?: string; flip?: boolean }) {
  return (
    <div className={cn("relative -mb-px leading-none", className)} aria-hidden>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className={cn("block h-12 w-full md:h-24", flip && "rotate-180")}>
        <path className={top} d="M0,0 H1440 V40 C1260,110 1080,10 900,50 C700,95 520,120 300,80 C170,55 80,60 0,80 Z" />
      </svg>
    </div>
  );
}

export function WaveStripes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 60" className={cn("h-10 w-40", className)} aria-hidden>
      <path d="M0 15 Q50 0 100 15 T200 15 T300 15 T400 15" className="fill-none stroke-apple" strokeWidth="8" />
      <path d="M0 32 Q50 17 100 32 T200 32 T300 32 T400 32" className="fill-none stroke-cream" strokeWidth="8" />
      <path d="M0 49 Q50 34 100 49 T200 49 T300 49 T400 49" className="fill-none stroke-navy" strokeWidth="8" />
    </svg>
  );
}

/* ---------- SectionHeading ---------- */
export function SectionHeading({ eyebrow, title, align = "left", className }: { eyebrow?: string; title: ReactNode; align?: "left" | "right" | "center"; className?: string }) {
  return (
    <div className={cn(align === "right" && "text-right", align === "center" && "text-center", className)}>
      {eyebrow && <p className="eyebrow mb-3 opacity-80">{eyebrow}</p>}
      <h2 className="display-md">{title}</h2>
    </div>
  );
}

/* ---------- Stars ---------- */
export function Stars({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 opacity-40" />
        ))}
      </div>
      <span className="text-sm">Reviews coming soon</span>
    </div>
  );
}

/* ---------- ProductCard ---------- */
export function ProductCard({ product, dark }: { product: Product; dark?: boolean }) {
  const [liked, setLiked] = useState(false);
  const t = themeClasses[product.theme];
  const outline = product.category === "merch" ? "border-cream" : t.outline;
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-[var(--radius-card)] border-[3px] p-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift",
        dark ? "border-forest bg-forest text-cream" : cn("bg-background", outline),
      )}
    >
      <Link to="/shop/$slug" params={{ slug: product.slug }} className="block">
        <div className="overflow-hidden rounded-[1.75rem]">
          <img src={product.images[0].src} alt={product.images[0].alt} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <h3 className={cn("mt-5 text-2xl md:text-3xl", !dark && (product.category === "merch" ? "text-forest" : t.accent))}>{product.name}</h3>
        <p className="mt-2 text-sm md:text-base">{product.short}</p>
      </Link>
      <div className="mt-auto flex items-center justify-between pt-4">
        <Stars className={dark ? "text-cream" : product.category === "merch" ? "text-peach" : t.accent} />
        <span className="font-semibold">{formatPrice(product.price)}</span>
      </div>
      <button
        type="button"
        onClick={() => setLiked((v) => !v)}
        aria-pressed={liked}
        aria-label={liked ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
        className="absolute right-8 top-8 grid h-11 w-11 place-items-center rounded-full bg-background/80 text-forest backdrop-blur transition-transform hover:scale-110"
      >
        <Heart className={cn("h-5 w-5", liked && "fill-peach text-peach")} />
      </button>
    </article>
  );
}

/* ---------- Slider ---------- */
export function Slider({ children }: { children: ReactNode }) {
  return (
    <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 md:-mx-10 md:gap-8 md:px-10">
      {children}
    </div>
  );
}
export const slideClass = "w-[80%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]";

/* ---------- FeatureCard ---------- */
export function FeatureCard({ icon, title, text, className }: { icon?: ReactNode; title: string; text: string; className?: string }) {
  return (
    <div className={cn("rounded-[var(--radius-card)] border-2 border-cream p-7 transition-transform duration-300 hover:-translate-y-1", className)}>
      {icon && <div className="mb-5 grid h-14 w-14 place-items-center rounded-full bg-cream text-forest">{icon}</div>}
      <h3 className="text-2xl">{title}</h3>
      <p className="mt-3 leading-relaxed">{text}</p>
    </div>
  );
}

/* ---------- QuoteBlock ---------- */
export function QuoteBlock({ quote, source, className }: { quote: string; source: string; className?: string }) {
  return (
    <figure className={cn("mx-auto max-w-3xl text-center", className)}>
      <blockquote className="font-serif text-3xl leading-tight md:text-5xl">“{quote}”</blockquote>
      <figcaption className="eyebrow mt-6 opacity-80">{source}</figcaption>
    </figure>
  );
}

/* ---------- StepTimeline ---------- */
export function StepTimeline({ steps, className }: { steps: { title: string; text: string }[]; className?: string }) {
  return (
    <ol className={cn("relative grid gap-10 md:grid-cols-[repeat(var(--n),minmax(0,1fr))] md:gap-6", className)} style={{ ["--n" as string]: steps.length }}>
      <svg className="pointer-events-none absolute left-0 right-0 top-7 hidden h-6 w-full md:block" viewBox="0 0 1000 24" preserveAspectRatio="none" aria-hidden>
        <path d="M0 12 Q62 0 125 12 T250 12 T375 12 T500 12 T625 12 T750 12 T875 12 T1000 12" className="fill-none stroke-current opacity-40" strokeWidth="3" />
      </svg>
      {steps.map((s, i) => (
        <li key={s.title} className="relative flex gap-5 md:flex-col md:gap-0">
          <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-cream font-display text-xl font-bold text-forest">{i + 1}</span>
          <div className="md:mt-6">
            <h3 className="text-xl md:text-2xl">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed md:text-base">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ---------- Accordion ---------- */
export function Accordion({ items, className }: { items: { q: string; a: ReactNode }[]; className?: string }) {
  return (
    <div className={cn("divide-y divide-current/20 border-y border-current/20", className)}>
      {items.map((it) => (
        <details key={it.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold uppercase md:text-xl [&::-webkit-details-marker]:hidden">
            {it.q}
            <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
          </summary>
          <div className="pt-3 leading-relaxed opacity-90">{it.a}</div>
        </details>
      ))}
    </div>
  );
}

/* ---------- FormField ---------- */
export function FormField({ label, error, id, as, options, className, ...p }: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; id: string; as?: "textarea" | "select"; options?: string[] }) {
  const fieldCls = "mt-2 w-full rounded-2xl border-2 border-current/30 bg-transparent px-4 py-3 text-base placeholder:opacity-50 focus:border-current focus:outline-none";
  return (
    <div className={className}>
      <label htmlFor={id} className="eyebrow">{label}</label>
      {as === "textarea" ? (
        <textarea id={id} name={p.name} rows={4} className={fieldCls} placeholder={p.placeholder} aria-invalid={!!error} />
      ) : as === "select" ? (
        <select id={id} name={p.name} className={cn(fieldCls, "[&>option]:text-forest")} aria-invalid={!!error} defaultValue="">
          <option value="" disabled>Choose…</option>
          {options?.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input id={id} className={fieldCls} aria-invalid={!!error} {...p} />
      )}
      {error && <p className="mt-1.5 text-sm font-semibold text-destructive" role="alert">{error}</p>}
    </div>
  );
}

/* ---------- Split block ---------- */
export function Split({ image, alt, children, imageSide = "right", className, tilt }: { image: string; alt: string; children: ReactNode; imageSide?: "left" | "right"; className?: string; tilt?: boolean }) {
  return (
    <section className={cn("grid bg-forest text-cream md:grid-cols-2", className)}>
      <div className={cn("relative min-h-[380px] overflow-hidden md:min-h-[640px]", imageSide === "left" ? "md:order-1" : "md:order-2", tilt && "flex items-center justify-center p-8 md:p-16")}>
        {/* REPLACE WITH BRAND PHOTO if needed */}
        <img src={image} alt={alt} loading="lazy" className={cn(tilt ? "w-full max-w-md -rotate-3 rounded-[1.75rem] shadow-tilt" : "absolute inset-0 h-full w-full object-cover")} />
      </div>
      <div className={cn("flex flex-col justify-center gap-6 px-6 py-16 md:px-16 lg:px-24", imageSide === "left" ? "md:order-2 md:items-end md:text-right" : "md:order-1 md:items-end md:text-right")}>
        {children}
      </div>
    </section>
  );
}
