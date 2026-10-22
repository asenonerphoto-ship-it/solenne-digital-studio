import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { prefersReducedMotion, useAutoReveal } from "@/lib/motion";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ShopifyProvider } from "@/lib/shopify";
import { AgeGate, Footer, Header } from "@/components/site/Layout";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-forest px-4 text-cream">
      <div className="max-w-md text-center">
        <h1 className="display-xl">404</h1>
        <p className="mt-4 text-lg">This page went to the mountains and never came back.</p>
        <div className="mt-8">
          <Link to="/" className="inline-flex rounded-full bg-cream px-7 py-3.5 text-sm font-semibold uppercase text-forest">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong on our end. You can try refreshing or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Try again
          </button>
          <a href="/" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Solenne — Original Hard Cider from South Tyrol" },
      { name: "description", content: "Solenne Original Hard Cider. Crispy Apple and White Peach, 5.1% ABV, made in South Tyrol. Life is good!" },
      { property: "og:site_name", content: "Solenne" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=DM+Serif+Display&family=Josefin+Sans:wght@300;400;600;700&family=Pacifico&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ShopifyProvider>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-cream focus:px-4 focus:py-2 focus:text-forest">
          Skip to content
        </a>
        <Header />
        <main id="main" className="overflow-x-clip">
          <PageTransition />
        </main>
        <Footer />
        <AgeGate />
      </ShopifyProvider>
    </QueryClientProvider>
  );
}

/** Fade + 16px slide per route, a cream wave wipe on navigation, and auto scroll reveals. */
function PageTransition() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const [wipe, setWipe] = useState(0);
  useAutoReveal(ref, pathname);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    if (!prefersReducedMotion()) setWipe((n) => n + 1);
  }, [pathname]);
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(".btn-fill") as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointerover", onMove, { passive: true });
    return () => document.removeEventListener("pointerover", onMove);
  }, []);
  return (
    <>
      <div key={pathname} ref={ref} className="page-enter">
        <Outlet />
      </div>
      {wipe > 0 && (
        <div key={wipe} className="wave-wipe" aria-hidden onAnimationEnd={() => setWipe(0)}>
          <svg viewBox="0 0 1440 1000" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,80 C240,0 480,0 720,60 C960,120 1200,120 1440,40 V920 C1200,1000 960,1000 720,940 C480,880 240,880 0,960 Z" />
          </svg>
        </div>
      )}
    </>
  );
}
