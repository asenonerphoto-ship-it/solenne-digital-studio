import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Instagram, Menu, ShoppingBag, X } from "lucide-react";
import { prefersReducedMotion } from "@/lib/motion";
import { navLinks } from "@/data/content";
import { img } from "@/lib/images";
import { useShopify } from "@/lib/shopify";
import { isEmail, submitForm } from "@/lib/forms";
import { Button, btnClass } from "./ui";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return <img src={img.logo} alt="Solenne" className={cn("shadow-logo h-10 w-auto md:h-12", className)} />;
}

export function Header() {
  const { count, available, openCart } = useShopify();
  const [menu, setMenu] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bounce, setBounce] = useState(0);
  const prevCount = useRef(count);
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);
  useEffect(() => {
    if (count > prevCount.current) setBounce((b) => b + 1);
    prevCount.current = count;
  }, [count]);
  useEffect(() => {
    let last = window.scrollY, raf = 0;
    const run = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 12);
      if (Math.abs(y - last) > 6) { setHidden(y > last && y > 160); last = y; }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(run); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <header className="site-header sticky top-0 z-40 bg-forest text-cream" data-hidden={hidden && !menu} data-scrolled={scrolled}>
      <div className="relative mx-auto flex h-20 max-w-[1920px] items-center justify-between px-5 md:h-24 md:px-10">
        <button className="xl:hidden" onClick={() => setMenu(true)} aria-label="Open menu">
          <Menu className="h-7 w-7" />
        </button>
        <nav className="hidden gap-8 xl:flex" aria-label="Main">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="nav-link eyebrow transition-opacity hover:opacity-80">
              {l.label}
            </Link>
          ))}
        </nav>
        <Link to="/" className="absolute left-1/2 -translate-x-1/2" aria-label="Solenne home">
          <Logo />
        </Link>
        <Button variant="outline" onClick={openCart} disabled={!available} className="relative h-10 w-10 border-0 p-0" title={available ? "Open cart" : "Coming soon"} aria-label={`Open cart, ${count} items`}>
          <ShoppingBag key={bounce} className={cn("h-7 w-7", bounce > 0 && "cart-bounce")} />
          {count > 0 && (
            <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-peach px-1 text-xs font-bold text-navy">{count}</span>
          )}
        </Button>
      </div>
      {menu && (
        <div className="menu-wave fixed inset-0 z-50 flex h-dvh flex-col bg-forest px-6 py-6 text-cream">
          <div className="flex items-center justify-between">
            <Logo />
            <button onClick={() => setMenu(false)} aria-label="Close menu"><X className="h-8 w-8" /></button>
          </div>
          <nav className="mt-16 flex flex-col gap-6 bg-forest" aria-label="Mobile">
            {navLinks.map((l, i) => (
              <Link key={l.to} to={l.to} onClick={() => setMenu(false)} className="menu-item font-display text-5xl font-bold uppercase" style={{ ["--i" as string]: i }}>
                {l.label}
              </Link>
            ))}
          </nav>
          <p className="menu-item mt-auto eyebrow opacity-70" style={{ ["--i" as string]: navLinks.length }}>Life is good!</p>
        </div>
      )}
    </header>
  );
}

export function AgeGate() {
  const [show, setShow] = useState(false);
  const [denied, setDenied] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const accept = () => {
    localStorage.setItem("solenne-age-ok", "1");
    if (prefersReducedMotion()) return setShow(false);
    setLeaving(true);
  };
  useEffect(() => {
    if (localStorage.getItem("solenne-age-ok") !== "1") setShow(true);
  }, []);
  if (!show) return null;
  return (
    <div className={cn("fixed inset-0 z-[60] grid place-items-center bg-forest p-6 text-cream", leaving && "gate-out")} onAnimationEnd={(e) => { if (leaving && e.target === e.currentTarget) setShow(false); }} role="dialog" aria-modal="true" aria-labelledby="age-title">
      <div className="gate-in max-w-lg text-center">
        <Logo className="mx-auto h-16 md:h-20" />
        <h2 id="age-title" className="display-lg mt-10">Are you 18 or older?</h2>
        {denied ? (
          <p className="mt-8 text-lg">Sorry, come back when you're 18. Life will still be good.</p>
        ) : (
          <div className="mt-10 flex justify-center gap-4">
            <button className={btnClass("cream")} onClick={accept}>Yes, I am</button>
            <button className={btnClass("outline")} onClick={() => setDenied(true)}>No</button>
          </div>
        )}
        <p className="mt-10 text-sm opacity-70">Please enjoy responsibly.</p>
      </div>
    </div>
  );
}

const footerCols = [
  { title: "Shop", links: [{ to: "/shop", label: "All products" }, { to: "/how-its-made", label: "Our Cider" }, { to: "/b2b", label: "Wholesale" }] },
  { title: "Learn", links: [{ to: "/our-story", label: "Our Story" }, { to: "/how-its-made", label: "How It's Made" }, { to: "/crew", label: "Crew" }] },
  { title: "Help", links: [{ to: "/faq", label: "FAQ" }, { to: "/contact", label: "Contact" }, { to: "/shipping", label: "Shipping" }] },
  { title: "More", links: [{ to: "/b2b", label: "B2B" }, { to: "/press", label: "Press" }] },
] as const;

export function Footer() {
  const [state, setState] = useState<"idle" | "error" | "sending" | "done">("idle");
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "");
    if (!isEmail(email)) return setState("error");
    setState("sending");
    await submitForm("newsletter", { email });
    setState("done");
  };
  return (
    <footer className="bg-forest text-cream">
      <div className="mx-auto grid max-w-[1920px] gap-12 px-5 py-16 md:px-10 lg:grid-cols-[1fr_1.2fr] lg:py-24">
        <div>
          <Logo className="h-14 md:h-16" />
          <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerCols.map((c) => (
              <div key={c.title}>
                <h3 className="mb-4 text-sm leading-tight">{c.title}</h3>
                <ul className="space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.label}><Link to={l.to} className="opacity-80 hover:opacity-100">{l.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:justify-self-end lg:max-w-lg">
          <h2 className="display-md">Join the crew</h2>
          <p className="mt-3 text-lg">Get 10% off your first order.</p>
          {state === "done" ? (
            <p className="mt-6 flex items-center gap-3 rounded-2xl bg-cream px-5 py-4 font-semibold text-navy" role="status"><span className="check-burst h-7 w-7 rounded-full bg-forest text-cream"><Check className="check-draw h-4 w-4" /></span>You're in! Check your inbox for your code.</p>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mt-6 flex flex-col gap-3 sm:flex-row">
              <label htmlFor="nl-email" className="sr-only">Email address</label>
              <input id="nl-email" name="email" type="email" placeholder="Your email address" className="flex-1 rounded-full border-2 border-cream/50 bg-transparent px-5 py-3 placeholder:text-cream/50 focus:border-cream focus:outline-none" />
              <button className={btnClass("cream")} disabled={state === "sending"}>{state === "sending" ? "…" : "Subscribe"}</button>
            </form>
          )}
          {state === "error" && <p className="mt-2 text-sm text-cream" role="alert">Please enter a valid email.</p>}
          <div className="mt-8 flex gap-4">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Solenne on Instagram" className="grid h-11 w-11 place-items-center rounded-full border-2 border-cream/50 hover:bg-cream hover:text-navy"><Instagram className="h-5 w-5" /></a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="Solenne on TikTok" className="grid h-11 w-11 place-items-center rounded-full border-2 border-cream/50 hover:bg-cream hover:text-navy">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden><path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.7V9a7.4 7.4 0 0 0 4.3 1.4V7.3a4.3 4.3 0 0 1-3.2-1.5Z" /></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/15">
        <div className="mx-auto flex max-w-[1920px] flex-col gap-4 px-5 py-6 text-sm md:flex-row md:items-center md:justify-between md:px-10">
          <p>© {new Date().getFullYear()} Solenne. Please enjoy responsibly. 18+</p>
          <div className="flex gap-6">
            <Link to="/imprint" className="opacity-80 hover:opacity-100">Imprint</Link>
            <Link to="/privacy" className="opacity-80 hover:opacity-100">Privacy</Link>
            <Link to="/terms" className="opacity-80 hover:opacity-100">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
