import { describe, expect, it } from "vitest";
import { DEFAULT_PACK_SIZE, PACK_SIZES, SHOPIFY_PRODUCTS, getShopifySelection, isShopifyConfigured, isShopifySelectionConfigured } from "@/config/shopify";

describe("Solenne Shopify selections", () => {
  it("offers exactly 12 and 24 cans", () => { expect(PACK_SIZES).toEqual([12, 24]); });
  it("defaults to 12 cans", () => { expect(DEFAULT_PACK_SIZE).toBe(12); });
  it.each(["crispy-apple", "white-peach", "mixed-pack"])("maps both pack sizes independently for %s", (slug) => {
    const small = getShopifySelection(slug, 12);
    const large = getShopifySelection(slug, 24);
    expect(small).toEqual(SHIFY(slug, 12));
    expect(large).toEqual(SHIFY(slug, 24));
    expect(small.variantId).not.toBe(large.variantId);
    expect(small.productId).toBeTruthy();
    expect(large.productId).toBeTruthy();
  });
  it.each(["fleece-jacket", "crewneck"])("maps S/M/L/XL independently for %s", (slug) => {
    const variants = ["S", "M", "L", "XL"].map((size) => getShopifySelection(slug, size).variantId);
    expect(variants.every(Boolean)).toBe(true);
    expect(new Set(variants).size).toBe(4);
  });
  it("maps the one-size hat", () => { expect(getShopifySelection("corduroy-hat", "One size").variantId).toBe("YOUR_HAT_VARIANT_ID"); });
  it("keeps placeholder stores unavailable", () => { expect(isShopifyConfigured()).toBe(false); });
  it("requires real numeric product and variant IDs", () => {
    expect(isShopifySelectionConfigured(getShopifySelection("crispy-apple", 12))).toBe(false);
    expect(isShopifySelectionConfigured({ productId: "123", variantId: "456" })).toBe(true);
    expect(isShopifySelectionConfigured({ productId: "123", variantId: "" })).toBe(false);
  });
});

function SHIFY(slug: string, pack: number) {
  const name = slug.replaceAll("-", "_").toUpperCase();
  return { productId: `YOUR_${name}_PRODUCT_ID`, variantId: `YOUR_${name}_${pack}_VARIANT_ID` };
}