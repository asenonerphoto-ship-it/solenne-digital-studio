import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { isShopifyConfigured, SHOPIFY_DOMAIN, STOREFRONT_ACCESS_TOKEN } from "@/config/shopify";

export interface ShopifyComponent {
  destroy: () => void;
  selectedVariant?: { id: string };
}
interface ShopifyCart { lineItems?: Array<{ quantity: number }> }
export interface ShopifyUI {
  createComponent: (type: "product", config: Record<string, unknown>) => Promise<ShopifyComponent | undefined>;
  createCart: (config: Record<string, unknown>) => Promise<ShopifyCart>;
  openCart: () => void;
  closeCart: () => void;
  components: { product: ShopifyComponent[]; cart: ShopifyCart[] };
}
interface ShopifySDK {
  buildClient: (config: { domain: string; storefrontAccessToken: string }) => unknown;
  UI: { onReady: (client: unknown) => Promise<ShopifyUI> };
}
declare global { interface Window { ShopifyBuy?: ShopifySDK } }

// Browser-only SDK loading; placeholder stores never trigger a script or API request.
let sdkPromise: Promise<ShopifySDK> | undefined;
function loadSDK() {
  if (window.ShopifyBuy?.UI) return Promise.resolve(window.ShopifyBuy);
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise<ShopifySDK>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
    script.async = true;
    script.onload = () => window.ShopifyBuy?.UI ? resolve(window.ShopifyBuy) : reject(new Error("Shopify SDK unavailable"));
    script.onerror = () => { script.remove(); reject(new Error("Shopify SDK failed to load")); };
    document.head.appendChild(script);
  }).catch((error: unknown) => { sdkPromise = undefined; throw error; });
  return sdkPromise;
}

export function shopifyTheme() {
  const css = getComputedStyle(document.documentElement);
  const token = (name: string) => css.getPropertyValue(name).trim();
  return {
    forest: token("--forest"), cream: token("--cream"), peach: token("--peach"), paper: token("--paper"),
    bodyFont: css.getPropertyValue("--font-sans").trim(), displayFont: css.getPropertyValue("--font-display").trim(),
  };
}

interface ShopifyContextValue { count: number; available: boolean; getUI: () => Promise<ShopifyUI>; openCart: () => void }
const ShopifyContext = createContext<ShopifyContextValue | null>(null);

export function ShopifyProvider({ children }: { children: ReactNode }) {
  const uiPromise = useRef<Promise<ShopifyUI> | null>(null);
  const uiRef = useRef<ShopifyUI | null>(null);
  const [count, setCount] = useState(0);
  const [available, setAvailable] = useState(false);
  const getUI = () => {
    if (!isShopifyConfigured()) return Promise.reject(new Error("Shopify is not configured"));
    if (uiPromise.current) return uiPromise.current;
    uiPromise.current = loadSDK().then(async (sdk) => {
      const ui = await sdk.UI.onReady(sdk.buildClient({ domain: SHOPIFY_DOMAIN, storefrontAccessToken: STOREFRONT_ACCESS_TOKEN }));
      const theme = shopifyTheme();
      await ui.createCart({
        toggles: [],
        options: {
          cart: {
            text: { title: "Your cart", button: "Checkout" },
            styles: {
              cart: { "background-color": theme.paper, "font-family": theme.bodyFont, color: theme.forest },
              title: { "font-family": theme.displayFont, color: theme.forest },
              button: { "border-radius": "999px", "background-color": theme.forest, color: theme.cream, ":hover": { "background-color": theme.forest }, ":focus": { "background-color": theme.forest } },
            },
          },
        },
      });
      uiRef.current = ui;
      setAvailable(true);
      return ui;
    }).catch((error: unknown) => { uiPromise.current = null; setAvailable(false); throw error; });
    return uiPromise.current;
  };
  useEffect(() => {
    if (!isShopifyConfigured()) return;
    let active = true;
    void getUI().catch(() => { if (active) setAvailable(false); });
    // Read the SDK's updated cart model, not its pre-update quantity events.
    const timer = window.setInterval(() => {
      const total = uiRef.current?.components.cart[0]?.lineItems?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
      if (active) setCount((previous) => previous === total ? previous : total);
    }, 300);
    return () => { active = false; window.clearInterval(timer); uiRef.current?.closeCart(); };
  }, []);
  return <ShopifyContext.Provider value={{ count, available, getUI, openCart: () => { uiRef.current?.openCart(); } }}>{children}</ShopifyContext.Provider>;
}

export function useShopify() {
  const context = useContext(ShopifyContext);
  if (!context) throw new Error("useShopify requires ShopifyProvider");
  return context;
}