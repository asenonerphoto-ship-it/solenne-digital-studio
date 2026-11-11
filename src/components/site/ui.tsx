import { Fragment, useEffect, useRef, useState, type ReactNode, type ButtonHTMLAttributes, type InputHTMLAttributes } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";
import { observeOnce, prefersReducedMotion, usePauseOffscreen } from "@/lib/motion";


/* ---------- Button ---------- */
const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-lg px-7 py-3.5 text-sm font-display uppercase tracking-normal btn-fx hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none";
const btnVariants = {
  cream: "btn-fill bg-yellow text-navy hover:brightness-105",
  yellow: "btn-fill bg-yellow text-navy hover:brightness-105",
  navy: "btn-fill bg-navy text-yellow hover:brightness-110",
  outline: "border-2 border-current bg-transparent overflow-visible",
  white: "btn-fill bg-background text-navy hover:bg-paper",
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
export function Marquee({ text = "ORIGINAL HARD CIDER - MADE IN ITALY - ", className }: { text?: string; className?: string }) {
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
    <div ref={wrap} data-m-skip className={cn("overflow-hidden bg-navy py-4 text-yellow", className)} aria-label="Original hard cider, made in Italy">
      <div ref={track} className="flex w-max animate-marquee whitespace-nowrap font-display text-lg font-semibold tracking-normal md:text-2xl" aria-hidden>
        <span className="pr-2">{row}</span>
        <span className="pr-2">{row}</span>
      </div>
    </div>
  );
}

/* ---------- CardSticker: cream flag with scalloped bottom edge (wave motif) ---------- */
export function CardSticker({ text, className }: { text: string; className?: string }) {
  return (
    <span className={cn("pointer-events-none absolute right-2.5 top-0 z-20 flex w-[76px] rotate-[3deg] flex-col items-center text-center", className)} aria-hidden>
      <span className="w-full rounded-t-[10px] bg-yellow px-1.5 pb-1 pt-2 font-display text-[11px] font-bold uppercase leading-[1.2] tracking-normal text-navy">
        {text.split(" ").map((w, i) => <span key={i} className="block">{w}</span>)}
      </span>
      <svg viewBox="0 0 80 12" preserveAspectRatio="none" className="-mt-px block h-3 w-full" aria-hidden>
        <path d="M0 0 H80 V4 Q70 12 60 4 T40 4 T20 4 T0 4 Z" className="fill-yellow" />
      </svg>
    </span>
  );
}

/* ---------- ProductCard: borderless card, square photo, sticker; hover swaps text for actions ---------- */
export function ProductCard({ product }: { product: Product }) {
  const [alternate, setAlternate] = useState(false);
  const touchStart = useRef<number | null>(null);
  const alt = (src: string, fallback: string) => product.images.find((i) => i.src === src)?.alt ?? fallback;
  return (
    <article data-category={product.category} className="product-card group relative flex h-full min-w-0 flex-col">
      <div
        className="card-media relative aspect-square w-full overflow-hidden rounded-2xl"
        data-alternate={alternate}
        onTouchStart={(e) => { touchStart.current = e.touches[0]?.clientX ?? null; }}
        onTouchEnd={(e) => {
          const end = e.changedTouches[0]?.clientX;
          if (touchStart.current !== null && end !== undefined && Math.abs(end - touchStart.current) > 30) setAlternate((v) => !v);
          touchStart.current = null;
        }}
        onClick={() => { if (window.matchMedia("(hover: none), (max-width: 767px)").matches) setAlternate((v) => !v); }}
      >
        <img src={product.image} alt={alt(product.image, product.name)} loading="lazy" draggable={false} className="card-primary absolute inset-0 h-full w-full object-cover" />
        <img src={product.hoverImage} alt={alt(product.hoverImage, `${product.name} lifestyle`)} loading="lazy" draggable={false} className="card-alternate absolute inset-0 h-full w-full object-cover" />
        <Link to="/shop/$slug" params={{ slug: product.slug }} aria-label={`Shop ${product.name}`} className="card-photo-link absolute inset-0 z-[1]" />
        {product.badge && <CardSticker text={product.badge} />}
        <div className="card-dots absolute inset-x-0 bottom-2 z-10 flex justify-center gap-1" aria-label="Product images">
          {[false, true].map((value, i) => (
            <Button variant="outline" key={i} type="button" aria-label={`Show ${product.name} image ${i + 1}`} aria-pressed={alternate === value} onClick={(e) => { e.stopPropagation(); setAlternate(value); }} className="grid h-7 w-7 place-items-center border-0 p-0">
              <span className={cn("h-2 w-2 rounded-full bg-background shadow", alternate !== value && "opacity-50")} />
            </Button>
          ))}
        </div>
      </div>
      <div className="card-body relative pt-4">
        <div className="card-default">
          <h3 className="text-2xl uppercase leading-[1.05] md:text-[1.75rem]">
            <Link to="/shop/$slug" params={{ slug: product.slug }} className="card-link after:absolute after:inset-0 after:z-[1] after:rounded-[22px] focus-visible:outline-none">{product.name}</Link>
          </h3>
          <p className="card-description mt-3 font-light">{product.short}</p>
        </div>
        <div className="card-hover absolute inset-0 flex flex-col items-center justify-center gap-2.5 pt-4" aria-hidden>
          <span className="inline-flex h-[54px] w-full items-center justify-center card-action font-display text-sm uppercase tracking-normal">Shop now</span>
          <span className="card-sub text-xs font-semibold uppercase tracking-normal underline underline-offset-4">
            {product.category === "merch" ? "Choose your size" : "Choose 12 or 24 cans"}
          </span>
        </div>
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
export const slideClass = "w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]";

/* ---------- FeatureCard ---------- */
export function FeatureCard({ icon, title, text, className }: { icon?: ReactNode; title: string; text: string; className?: string }) {
  return (
    <div className={cn("rounded-lg bg-navy p-7 text-yellow transition-transform duration-300 hover:-translate-y-1", className)}>
      {icon && <div className="mb-5 grid h-14 w-14 place-items-center rounded-full bg-yellow text-navy">{icon}</div>}
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
          <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-navy font-display text-xl font-bold text-cream">{i + 1}</span>
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
        <select id={id} name={p.name} className={cn(fieldCls, "[&>option]:text-navy")} aria-invalid={!!error} defaultValue="">
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

