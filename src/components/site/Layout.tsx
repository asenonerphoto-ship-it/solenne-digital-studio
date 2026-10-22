import { useEffect, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Instagram, Menu, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { navLinks } from "@/data/content";
import { img } from "@/lib/images";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/data/products";
import { isEmail, submitForm } from "@/lib/forms";
import { btnClass } from "./ui";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return <img src={img.logo} alt="Solenne" className={cn("h-10 w-auto md:h-12", className)} />;
}

export function Header() {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);
  return (
    <header className="sticky top-0 z-40 bg-forest text-cream">
      <div className="relative mx-auto flex h-20 max-w-[1920px] items-center justify-between px-5 md:h-24 md:px-10">
        <button className="xl:hidden" onClick={() => setMenu(true)} aria-label="Open menu">
          <Menu className="h-7 w-7" />
        </button>
        <nav className="hidden gap-8 xl:flex" aria-label="Main">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="eyebrow transition-opacity hover:opacity-70" activeProps={{ className: "underline underline-offset-8 decoration-2" }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Link to="/" className="absolute left-1/2 -translate-x-1/2" aria-label="Solenne home">
          <Logo />
        </Link>
        <button onClick={() => setOpen(true)} className="relative" aria-label={`Open cart, ${count} items`}>
          <ShoppingBag className="h-7 w-7" />
          {count > 0 && (
            <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-peach px-1 text-xs font-bold text-forest">{count}</span>
          )}
        </button>
      </div>
      {menu && (
        <div className="fixed inset-0 z-50 flex flex-col bg-forest px-6 py-6 text-cream animate-in fade-in">
          <div className="flex items-center justify-between">
            <Logo />
            <button onClick={() => setMenu(false)} aria-label="Close menu"><X className="h-8 w-8" /></button>
          </div>
          <nav className="mt-16 flex flex-col gap-6" aria-label="Mobile">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setMenu(false)} className="font-display text-5xl font-bold uppercase">
                {l.label}
              </Link>
            ))}
          </nav>
          <p className="mt-auto eyebrow opacity-70">Life is good!</p>
        </div>
      )}
    </header>
  );
}

export function CartDrawer() {
  const { items, open, setOpen, update, remove, total } = useCart();
  return (
    <div className={cn("fixed inset-0 z-50 transition-opacity", open ? "opacity-100" : "pointer-events-none opacity-0")} aria-hidden={!open}>
      <div className="absolute inset-0 bg-forest/60" onClick={() => setOpen(false)} />
      <aside
        role="dialog"
        aria-label="Shopping cart"
        className={cn("absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper text-forest shadow-2xl transition-transform duration-500", open ? "translate-x-0" : "translate-x-full")}
      >
        <div className="flex items-center justify-between bg-forest px-6 py-5 text-cream">
          <h2 className="text-2xl">Your cart</h2>
          <button onClick={() => setOpen(false)} aria-label="Close cart"><X className="h-6 w-6" /></button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {items.length === 0 && <p className="py-10 text-center">Your cart is empty. Time to fix that.</p>}
          {items.map((i) => (
            <div key={i.key} className="flex gap-4 rounded-2xl bg-background p-3">
              <img src={i.image} alt="" className="h-20 w-20 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="font-display font-bold uppercase">{i.name}</p>
                {i.variant && <p className="text-sm">{i.variant}</p>}
                <div className="mt-2 flex items-center gap-3">
                  <button onClick={() => update(i.key, i.qty - 1)} aria-label="Decrease"><Minus className="h-4 w-4" /></button>
                  <span>{i.qty}</span>
                  <button onClick={() => update(i.key, i.qty + 1)} aria-label="Increase"><Plus className="h-4 w-4" /></button>
                  <button onClick={() => remove(i.key)} className="ml-auto text-sm underline">Remove</button>
                </div>
              </div>
              <p className="font-semibold">{formatPrice(i.price * i.qty)}</p>
            </div>
          ))}
        </div>
        <div className="border-t p-6">
          <div className="flex justify-between font-display text-xl font-bold uppercase">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <button className={btnClass("green", "mt-4 w-full")} disabled={!items.length} onClick={() => alert("Checkout coming soon!")}>
            Checkout
          </button>
          <p className="mt-3 text-center text-xs">Prices are placeholders. Checkout is not live yet.</p>
        </div>
      </aside>
    </div>
  );
}

export function AgeGate() {
  const [show, setShow] = useState(false);
  const [denied, setDenied] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("solenne-age-ok") !== "1") setShow(true);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-forest p-6 text-cream" role="dialog" aria-modal="true" aria-labelledby="age-title">
      <div className="max-w-lg text-center">
        <Logo className="mx-auto h-16 md:h-20" />
        <h2 id="age-title" className="display-lg mt-10">Are you 18 or older?</h2>
        {denied ? (
          <p className="mt-8 text-lg">Sorry, come back when you're 18. Life will still be good.</p>
        ) : (
          <div className="mt-10 flex justify-center gap-4">
            <button className={btnClass("cream")} onClick={() => { localStorage.setItem("solenne-age-ok", "1"); setShow(false); }}>Yes, I am</button>
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
                <p className="eyebrow mb-4">{c.title}</p>
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
            <p className="mt-6 rounded-2xl bg-cream px-5 py-4 font-semibold text-forest" role="status">You're in! Check your inbox for your code.</p>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mt-6 flex flex-col gap-3 sm:flex-row">
              <label htmlFor="nl-email" className="sr-only">Email address</label>
              <input id="nl-email" name="email" type="email" placeholder="Your email address" className="flex-1 rounded-full border-2 border-cream/50 bg-transparent px-5 py-3 placeholder:text-cream/50 focus:border-cream focus:outline-none" />
              <button className={btnClass("cream")} disabled={state === "sending"}>{state === "sending" ? "…" : "Subscribe"}</button>
            </form>
          )}
          {state === "error" && <p className="mt-2 text-sm text-peach" role="alert">Please enter a valid email.</p>}
          <div className="mt-8 flex gap-4">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Solenne on Instagram" className="grid h-11 w-11 place-items-center rounded-full border-2 border-cream/50 hover:bg-cream hover:text-forest"><Instagram className="h-5 w-5" /></a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="Solenne on TikTok" className="grid h-11 w-11 place-items-center rounded-full border-2 border-cream/50 hover:bg-cream hover:text-forest">
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
