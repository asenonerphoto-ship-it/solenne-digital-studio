import { Fragment, useEffect, useRef, useState, type ReactNode, type ButtonHTMLAttributes, type InputHTMLAttributes } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";
import { observeOnce, prefersReducedMotion, usePauseOffscreen } from "@/lib/motion";


/* ---------- Button ---------- */
const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.06em] btn-fx hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none";
const btnVariants = {
  cream: "btn-fill bg-cream text-forest shadow-tilt hover:brightness-105",
  orange: "btn-fill bg-peach text-forest hover:brightness-105",
  green: "btn-fill bg-forest text-cream hover:bg-apple",
  outline: "border-2 border-current bg-transparent overflow-visible",
  white: "btn-fill bg-background text-forest hover:bg-paper",
} as const;
export type BtnVariant = keyof typeof btnVariants;
export const btnClass = (v: BtnVariant = "cream", extra?: string) => cn(btnBase, btnVariants[v], extra);

export function Button({ variant = "cream", className, ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant }) {
  return <button className={btnClass(variant, className)} {...p} />;
}

/* ---------- Reveal (scroll reveal, once) ---------- */
export function Reveal({ children, className, delay = 0, kind = "up" }: { children: ReactNode; className?: string; delay?: number; kind?: "up" | "pop" }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => (ref.current ? observeOnce(ref.current) : undefined), []);
  return (
    <div ref={ref} data-m={kind} className={className} style={{ ["--m-delay" as string]: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ---------- Words: word-by-word headline reveal. Use "|" for line breaks. ---------- */
export function Words({ text, as: Tag = "h2", className }: { text: string; as?: "h1" | "h2"; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => (ref.current ? observeOnce(ref.current) : undefined), []);
  let n = 0;
  return (
    <Tag ref={ref} data-m-skip className={cn("words", className)} aria-label={text.replace(/\|/g, " ")}>
      {text.split("|").map((line, li) => (
        <Fragment key={li}>
          {li > 0 && <br />}
          {line.trim().split(" ").map((w, wi) => (
            <Fragment key={wi}>
              {wi > 0 && " "}
              <span className="w" aria-hidden><span style={{ ["--i" as string]: n++ }}>{w}</span></span>
            </Fragment>
          ))}
        </Fragment>
      ))}
    </Tag>
  );
}

/* ---------- Marquee: slows on hover, nudged by scroll velocity, paused offscreen ---------- */
export function Marquee({ text = "ORIGINAL HARD CIDER · MADE IN ITALY · ", className }: { text?: string; className?: string }) {
  const row = Array.from({ length: 8 }, () => text).join("");
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  usePauseOffscreen(wrap);
  useEffect(() => {
    const el = track.current;
    if (!el || prefersReducedMotion()) return;
    const anim = el.getAnimations()[0];
    if (!anim) return;
    let hover = false, boost = 0, lastY = window.scrollY, raf = 0, rate = 1;
    const tick = () => {
      boost *= 0.92;
      const target = (hover ? 0.35 : 1) + boost;
      rate += (target - rate) * 0.08;
      anim.playbackRate = rate;
      raf = Math.abs(target - rate) > 0.01 || boost > 0.01 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const onScroll = () => { const y = window.scrollY; boost = Math.min(2, boost + Math.abs(y - lastY) / 300); lastY = y; kick(); };
    const enter = () => { hover = true; kick(); };
    const leave = () => { hover = false; kick(); };
    const w = wrap.current;
    w?.addEventListener("pointerenter", enter);
    w?.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); w?.removeEventListener("pointerenter", enter); w?.removeEventListener("pointerleave", leave); window.removeEventListener("scroll", onScroll); };
  }, []);
  return (
    <div ref={wrap} data-m-skip className={cn("overflow-hidden bg-forest py-4 text-cream", className)} aria-label="Original hard cider, made in Italy">
      <div ref={track} className="flex w-max animate-marquee whitespace-nowrap font-display text-lg font-semibold tracking-[0.06em] md:text-2xl" aria-hidden>
        <span className="pr-2">{row}</span>
        <span className="pr-2">{row}</span>
      </div>
    </div>
  );
}

/* ---------- WaveDivider: seamless horizontal drift + gentle wobble ---------- */
const wavePath = "M0,40 C180,100 360,100 540,50 C720,0 900,0 1080,50 C1200,85 1320,90 1440,40 C1620,100 1800,100 1980,50 C2160,0 2340,0 2520,50 C2640,85 2760,90 2880,40 V0 H0 Z";
export function WaveDivider({ top = "fill-background", className, flip }: { top?: string; className?: string; flip?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  usePauseOffscreen(ref);
  return (
    <div ref={ref} data-m-skip className={cn("relative -mb-px overflow-hidden leading-none", className)} aria-hidden>
      <div className={cn("wave-wobble", flip && "rotate-180")}>
        <svg viewBox="0 0 2880 120" preserveAspectRatio="none" className="wave-drift block h-12 w-[200%] md:h-24">
          <path className={top} d={wavePath} />
        </svg>
      </div>
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

/* ---------- ProductCard ---------- */
export function ProductCard({ product, dark: _dark }: { product: Product; dark?: boolean }) {
  const [alternate, setAlternate] = useState(false);
  const touchStart = useRef<number | null>(null);
  const swiped = useRef(false);
  const tint = product.category === "merch" ? "bg-card-merch" : product.theme === "peach" ? "bg-card-peach" : "bg-card-apple";
  return (
    <article className={cn("product-card group flex h-full min-w-0 flex-col text-forest", tint)}>
      <Button
        variant="outline"
        className="product-card-image relative block aspect-[4/5] w-full overflow-hidden rounded-none border-0 p-6"
        aria-label={`Swap ${product.name} image`}
        aria-pressed={alternate}
        onTouchStart={(e) => { touchStart.current = e.touches[0]?.clientX ?? null; swiped.current = false; }}
        onTouchEnd={(e) => {
          const end = e.changedTouches[0]?.clientX;
          if (touchStart.current !== null && end !== undefined && Math.abs(end - touchStart.current) > 30) {
            setAlternate((v) => !v); swiped.current = true;
          }
          touchStart.current = null;
        }}
        onClick={() => { if (!swiped.current) setAlternate((v) => !v); swiped.current = false; }}
      >
        <span className="relative block h-full w-full" data-alternate={alternate}>
          <img src={product.image} alt={product.images.find((i) => i.src === product.image)?.alt ?? product.name} loading="lazy" className="card-primary absolute inset-0 h-full w-full rounded-2xl object-cover" />
          <img src={product.hoverImage} alt={product.images.find((i) => i.src === product.hoverImage)?.alt ?? `${product.name} alternate view`} loading="lazy" className="card-alternate absolute inset-0 h-full w-full rounded-2xl object-cover" />
        </span>
      </Button>
      <div className="card-dots flex justify-center gap-2" aria-label="Product images">
        {[false, true].map((value, i) => <Button key={i} variant="outline" aria-label={`Show ${product.name} image ${i + 1}`} aria-pressed={alternate === value} onClick={() => setAlternate(value)} className="grid h-7 w-7 rounded-full border-0 p-0"><span className={cn("h-1.5 w-1.5 rounded-full bg-forest", alternate !== value && "opacity-25")} /></Button>)}
      </div>
      <div className="flex flex-1 flex-col px-6 pb-6 pt-2">
        <Link to="/shop/$slug" params={{ slug: product.slug }}><h3 className="text-2xl leading-[1.1]">{product.name}</h3></Link>
        <p className="mt-2 text-sm font-light leading-relaxed">{product.short}</p>
        <div className="mt-auto pt-5"><Link to="/shop/$slug" params={{ slug: product.slug }} className={btnClass("green", "card-shop shadow-none")}>Shop now</Link></div>
      </div>
    </article>
  );
}

/* ---------- Slider: native snap + mouse drag with momentum + fading edges ---------- */
export function Slider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let startX = 0, startScroll = 0, lastX = 0, lastT = 0, v = 0, down = false, moved = false, raf = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      cancelAnimationFrame(raf);
      down = true; moved = false; startX = lastX = e.clientX; startScroll = el.scrollLeft; lastT = performance.now(); v = 0;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 6) { moved = true; el.dataset["dragging"] = "true"; }
      if (!moved) return;
      const now = performance.now();
      v = (e.clientX - lastX) / Math.max(1, now - lastT);
      lastX = e.clientX; lastT = now;
      el.scrollLeft = startScroll - dx;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      if (!moved) return;
      let vel = v * 16;
      const glide = () => {
        el.scrollLeft -= vel; vel *= 0.92;
        if (Math.abs(vel) > 0.5 && !prefersReducedMotion()) raf = requestAnimationFrame(glide);
        else el.dataset["dragging"] = "false";
      };
      glide();
    };
    const blockClick = (e: MouseEvent) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("click", blockClick, true);
    el.addEventListener("dragstart", (e) => e.preventDefault());
    return () => { cancelAnimationFrame(raf); el.removeEventListener("pointerdown", onDown); window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); el.removeEventListener("click", blockClick, true); };
  }, []);
  return (
    <div ref={ref} className="slider-fade no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 md:-mx-10 md:gap-8 md:px-10">
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
      <svg data-m-skip ref={(el) => { if (el) observeOnce(el); }} className="line-draw pointer-events-none absolute left-0 right-0 top-7 hidden h-6 w-full md:block" viewBox="0 0 1000 24" preserveAspectRatio="none" aria-hidden>
        <path d="M0 12 Q62 0 125 12 T250 12 T375 12 T500 12 T625 12 T750 12 T875 12 T1000 12" className="fill-none stroke-current opacity-40" strokeWidth="3" pathLength={1} />
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
export function FormField({ label, error, id, as, options, className, ...p }: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string | undefined; id: string; as?: "textarea" | "select" | undefined; options?: string[] | undefined }) {
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
