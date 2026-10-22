// Paste your real .myshopify.com domain, PUBLIC Storefront access token and
// numeric product/variant IDs here when your external Shopify store is ready.
// Never paste an Admin API token or a private Storefront token into this file.
export const SHOPIFY_DOMAIN = "YOUR-STORE.myshopify.com";
export const STOREFRONT_ACCESS_TOKEN = "YOUR_STOREFRONT_TOKEN";

export interface ShopifySelection { productId: string; variantId: string }
export const PACK_SIZES = [12, 24] as const;
export type PackSize = typeof PACK_SIZES[number];
export const DEFAULT_PACK_SIZE: PackSize = 12;

export const SHOPIFY_PRODUCTS: Record<string, ShopifySelection> = {
  "crispy-apple-12": { productId: "YOUR_CRISPY_APPLE_PRODUCT_ID", variantId: "YOUR_CRISPY_APPLE_12_VARIANT_ID" },
  "crispy-apple-24": { productId: "YOUR_CRISPY_APPLE_PRODUCT_ID", variantId: "YOUR_CRISPY_APPLE_24_VARIANT_ID" },
  "white-peach-12": { productId: "YOUR_WHITE_PEACH_PRODUCT_ID", variantId: "YOUR_WHITE_PEACH_12_VARIANT_ID" },
  "white-peach-24": { productId: "YOUR_WHITE_PEACH_PRODUCT_ID", variantId: "YOUR_WHITE_PEACH_24_VARIANT_ID" },
  "mixed-pack-12": { productId: "YOUR_MIXED_PACK_PRODUCT_ID", variantId: "YOUR_MIXED_PACK_12_VARIANT_ID" },
  "mixed-pack-24": { productId: "YOUR_MIXED_PACK_PRODUCT_ID", variantId: "YOUR_MIXED_PACK_24_VARIANT_ID" },
  "corduroy-hat-One size": { productId: "YOUR_HAT_PRODUCT_ID", variantId: "YOUR_HAT_VARIANT_ID" },
  "fleece-jacket-S": { productId: "YOUR_FLEECE_PRODUCT_ID", variantId: "YOUR_FLEECE_S_VARIANT_ID" },
  "fleece-jacket-M": { productId: "YOUR_FLEECE_PRODUCT_ID", variantId: "YOUR_FLEECE_M_VARIANT_ID" },
  "fleece-jacket-L": { productId: "YOUR_FLEECE_PRODUCT_ID", variantId: "YOUR_FLEECE_L_VARIANT_ID" },
  "fleece-jacket-XL": { productId: "YOUR_FLEECE_PRODUCT_ID", variantId: "YOUR_FLEECE_XL_VARIANT_ID" },
  "crewneck-S": { productId: "YOUR_CREWNECK_PRODUCT_ID", variantId: "YOUR_CREWNECK_S_VARIANT_ID" },
  "crewneck-M": { productId: "YOUR_CREWNECK_PRODUCT_ID", variantId: "YOUR_CREWNECK_M_VARIANT_ID" },
  "crewneck-L": { productId: "YOUR_CREWNECK_PRODUCT_ID", variantId: "YOUR_CREWNECK_L_VARIANT_ID" },
  "crewneck-XL": { productId: "YOUR_CREWNECK_PRODUCT_ID", variantId: "YOUR_CREWNECK_XL_VARIANT_ID" },
};

export function getShopifySelection(slug: string, option: PackSize | string): ShopifySelection {
  return SHOPIFY_PRODUCTS[`${slug}-${option}`] ?? { productId: "", variantId: "" };
}

export function isShopifyConfigured(domain = SHOPIFY_DOMAIN, token = STOREFRONT_ACCESS_TOKEN) {
  return /^[a-z0-9][a-z0-9-]*\.myshopify\.com$/i.test(domain) && !domain.startsWith("YOUR-") && token.length > 0 && !token.startsWith("YOUR_");
}

export function isShopifySelectionConfigured(selection: ShopifySelection) {
  return /^\d+$/.test(selection.productId) && /^\d+$/.test(selection.variantId);
}