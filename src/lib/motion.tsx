import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";

/** Motion layer helpers. Timing/easing tokens live in src/styles.css (--ease-*, --dur-*). */

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

let sharedIO: IntersectionObserver | null = null;
function getIO() {
  if (!sharedIO) {
    sharedIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset["in"] = "true";
          sharedIO?.unobserve(e.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
  }
  return sharedIO;
}

/** Observe one element once; sets data-in="true" when it enters the viewport. */
export function observeOnce(el: Element) {
  getIO().observe(el);
  return () => getIO().unobserve(el);
}

const CANDIDATES = "h1,h2,h3,p,img,article,li,figure,form,blockquote,details,table,a[data-btn],button[data-btn],[data-m-auto]";

/**
 * Auto-assigns scroll reveals to a page's content once per route: headings slide up,
 * photos zoom in, tilted images settle with a bounce, cards pop in with stagger.
 * Only marks elements without an already-marked ancestor; uses data attributes so React never fights it.
 */
export function useAutoReveal(ref: RefObject<HTMLElement | null>, key: string) {
  useIsoLayoutEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    const marked: HTMLElement[] = [];
    const counts = new Map<Element, number>();
    root.querySelectorAll<HTMLElement>(CANDIDATES).forEach((el) => {
      const rotated = el.tagName === "IMG" && (parseFloat(getComputedStyle(el).rotate) || 0) !== 0;
      if ((!rotated && el.closest("[data-m]")) || el.closest("[data-m-skip]") || el.classList.contains("sr-only")) return;
      if (el.closest(".fixed")) return;
      let kind = "up";
      const tag = el.tagName;
      if (tag === "IMG") {
        const rot = parseFloat(getComputedStyle(el).rotate) || 0;
        if (rot) { kind = "tilt"; el.style.setProperty("--rot", `${rot}deg`); }
        else kind = el.parentElement && getComputedStyle(el.parentElement).overflow === "hidden" ? "zoom" : "up";
      } else if (tag === "ARTICLE" || tag === "LI" || tag === "FIGURE") kind = "pop";
      const parent = el.parentElement ?? root;
      const i = counts.get(parent) ?? 0;
      counts.set(parent, i + 1);
      el.dataset["m"] = kind;
      el.style.setProperty("--m-delay", `${Math.min(i, 6) * 80}ms`);
      marked.push(el);
    });
    const io = getIO();
    marked.forEach((el) => io.observe(el));
    return () => marked.forEach((el) => io.unobserve(el));
  }, [key]);
}

/** Calls cb with scroll progress (0..1) of an element passing through the viewport. rAF-throttled. */
export function useScrollProgress(ref: RefObject<HTMLElement | SVGElement | null>, cb: (p: number) => void, offset = 0.5) {
  const cbRef = useRef(cb);
  cbRef.current = cb;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) { cbRef.current(1); return; }
    let raf = 0;
    let active = false;
    const run = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh * offset - r.top) / Math.max(1, r.height);
      cbRef.current(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => { if (active && !raf) raf = requestAnimationFrame(run); };
    const io = new IntersectionObserver(([e]) => { active = !!e?.isIntersecting; if (active) onScroll(); });
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    run();
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [ref, offset]);
}

/** Pauses CSS animations inside an element when it is offscreen. */
export function usePauseOffscreen(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { el.dataset["paused"] = e?.isIntersecting ? "false" : "true"; });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
}
