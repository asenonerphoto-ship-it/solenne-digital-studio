import { useEffect, useRef, useState } from "react";
import { isShopifyConfigured, isShopifySelectionConfigured } from "@/config/shopify";
import { useShopify, shopifyTheme, type ShopifyComponent, type ShopifyUI } from "@/lib/shopify";
import { Button } from "./ui";

export function ShopifyBuyButton({ productId, variantId, tone = "cream" }: { productId: string; variantId: string; tone?: "cream" | "orange" }) {
  const node = useRef<HTMLDivElement>(null);
  const { getUI } = useShopify();
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">("loading");
  const configured = isShopifyConfigured() && isShopifySelectionConfigured({ productId, variantId });
  useEffect(() => {
    const mount = node.current;
    if (!configured || !mount) { setStatus("unavailable"); return; }
    let cancelled = false;
    let component: ShopifyComponent | undefined;
    let ui: ShopifyUI | undefined;
    // Keep asynchronous SDK renders isolated from the next pack/size selection.
    const container = document.createElement("div");
    mount.replaceChildren(container);
    const dispose = () => {
      component?.destroy();
      if (ui && component) ui.components.product = ui.components.product.filter((item) => item !== component);
      container.remove();
    };
    setStatus("loading");
    void getUI().then(async (instance) => {
      if (cancelled) return;
      ui = instance;
      const theme = shopifyTheme();
      component = await instance.createComponent("product", {
        id: productId, storefrontVariantId: variantId, node: container,
        options: {
          product: {
            iframe: false,
            contents: { img: false, imgWithCarousel: false, title: false, variantTitle: false, price: false, description: false, options: false, quantity: false, button: true, buttonWithQuantity: false },
            text: { button: "ADD TO CART" },
            buttonDestination: "cart",
            styles: { product: { width: "100%", "max-width": "none", margin: "0" }, button: { "border-radius": "999px", "background-color": tone === "orange" ? theme.peach : theme.cream, color: theme.forest, "font-family": theme.bodyFont } },
          },
        },
      });
      if (cancelled) { dispose(); return; }
      // Do not silently sell the default variant if the configured ID is wrong.
      if (!component || String(component.selectedVariant?.id) !== variantId) { dispose(); setStatus("unavailable"); return; }
      setStatus("ready");
    }).catch(() => { dispose(); if (!cancelled) setStatus("unavailable"); });
    return () => { cancelled = true; dispose(); };
  }, [productId, variantId, tone, configured]);
  return (
    <div className={`shopify-buy-button shopify-buy-button-${tone}`}>
      <div ref={node} hidden={status !== "ready" || !configured} />
      {(status !== "ready" || !configured) && <Button variant={tone === "orange" ? "orange" : "cream"} className="w-full shadow-none" disabled>{configured && status === "loading" ? "Loading…" : "Coming soon"}</Button>}
    </div>
  );
}