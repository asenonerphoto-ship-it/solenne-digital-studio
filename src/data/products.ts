import { img } from "@/lib/images";

export type Theme = "apple" | "peach" | "navy" | "forest";
export type Category = "cider" | "merch";

export interface Product {
  slug: string;
  name: string;
  category: Category;
  pack?: "single" | "variety";
  theme: Theme;
  /** PLACEHOLDER prices — confirm before launch */
  price: number;
  unit: string;
  short: string;
  /** Optional sticker on product cards, e.g. "NEW" */
  badge?: string;
  /** Three short card feature lines */
  taglines: [string, string, string];
  description: string;
  image: string;
  hoverImage: string;
  images: [{ src: string; alt: string }, ...{ src: string; alt: string }[]];
  sizes?: string[];
  material?: string;
  care?: string;
  taste?: { sweet: number; refreshing: number; sparkling: number };
  serve?: { title: string; text: string; src: string }[];
}

export const products: Product[] = [
  {
    slug: "crispy-apple",
    badge: "TOP SELLER",
    taglines: ["Fresh-pressed apple bite", "Sweet, sparkling, easy to love", "Made in South Tyrol"],
    image: img.crispyAppleCard,
    hoverImage: img.toast,
    name: "Crispy Apple",
    category: "cider",
    pack: "single",
    theme: "apple",
    price: 29.9,
    unit: "12 cans",
    short: "Our refreshing classic apple cider with a twist.",
    description:
      "Crisp, bright and made with apples from South Tyrol. Fruity and sparkly with a touch of style — the one you open first.",
    images: [
      { src: img.applePool, alt: "Crispy Apple can next to a glass of cider over ice by the pool" },
      { src: img.toast, alt: "Friends toasting with Solenne cans under palm leaves" },
      { src: img.appleGreen, alt: "Hand in a green sweater holding a Crispy Apple can" },
      { src: img.appleGarden, alt: "Crispy Apple being poured into a glass with an apple slice" },
    ],
    taste: { sweet: 45, refreshing: 90, sparkling: 75 },
    serve: [
      { title: "Over ice with lime", text: "Big glass, lots of ice, a wedge of lime. Done.", src: img.appleGarden },
      { title: "With salty snacks", text: "Chips, olives, taralli. Crisp meets salty.", src: img.applePool },
      { title: "Après-ski", text: "Straight from the can, boots still on.", src: img.appleGreen },
    ],
  },
  {
    slug: "white-peach",
    badge: "FAN FAV",
    taglines: ["Juicy white peach twist", "Soft, fruity and fizzy", "Summer in a can"],
    image: img.whitePeachCard,
    hoverImage: img.peachPeaches,
    name: "White Peach",
    category: "cider",
    pack: "single",
    theme: "peach",
    price: 29.9,
    unit: "12 cans",
    short: "Our refreshing classic apple cider with a peachy twist.",
    description:
      "South Tyrolean apples meet juicy white peach. Soft, sunny and sparkling — summer in a can, all year long.",
    images: [
      { src: img.peachLime, alt: "White Peach can on a wooden board with lime and a peach garnish" },
      { src: img.peachPeaches, alt: "White Peach can surrounded by fresh peaches" },
      { src: img.peachTable, alt: "White Peach cider being poured at a lunch table" },
      { src: img.pool, alt: "Solenne can on a striped towel by the pool" },
    ],
    taste: { sweet: 65, refreshing: 80, sparkling: 70 },
    serve: [
      { title: "With a peach slice", text: "Ice, a fresh peach slice, sunshine optional.", src: img.peachGarnish },
      { title: "With salty snacks", text: "Prosciutto, focaccia, friends.", src: img.peachTable },
      { title: "Poolside", text: "Cold can, warm towel, nowhere to be.", src: img.pool },
    ],
  },
  {
    slug: "mixed-pack",
    badge: "NEW",
    taglines: ["Both flavors in one box", "Perfect for sharing", "12 cans of good vibes"],
    image: img.toast,
    hoverImage: img.tray,
    name: "Mixed Pack",
    category: "cider",
    pack: "variety",
    theme: "forest",
    price: 31.9,
    unit: "6 Crispy Apple + 6 White Peach",
    short: "Can't decide? Don't. Both flavors, one box.",
    description: "Six Crispy Apple, six White Peach. The perfect box for parties, road trips and people who like options.",
    images: [
      { src: img.toast, alt: "Two hands toasting with Crispy Apple and White Peach cans" },
      { src: img.tray, alt: "Tray of White Peach cans with straws and peach slices" },
      { src: img.peachLime, alt: "White Peach can with lime on a board" },
      { src: img.applePool, alt: "Crispy Apple can by the pool" },
    ],
    taste: { sweet: 55, refreshing: 85, sparkling: 72 },
    serve: [
      { title: "Party bucket", text: "Fill a bucket with ice. Mix both flavors. Invite everyone.", src: img.tray },
      { title: "With salty snacks", text: "Something crunchy, something salty.", src: img.peachTable },
      { title: "Après-ski", text: "One for you, one for your friend.", src: img.appleGreen },
    ],
  },
  {
    slug: "corduroy-hat",
    taglines: ["Soft corduroy, curved brim", "One size fits most", "Embroidered Solenne logo"],
    image: img.hat,
    hoverImage: img.canHand,
    name: "Corduroy Hat",
    category: "merch",
    theme: "navy",
    price: 34,
    unit: "One size",
    short: "Navy corduroy cap with the Solenne script.",
    description: "Soft navy corduroy, embroidered Solenne logo, adjustable strap. Goes with sunglasses and bad hair days.",
    images: [
      { src: img.hat, alt: "Navy corduroy Solenne hat on a newspaper with sunglasses" },
      { src: img.tray, alt: "Solenne crew serving cider" },
      { src: img.toast, alt: "Friends toasting with cans" },
      { src: img.canHand, alt: "Can held in a ringed hand" },
    ],
    sizes: ["One size"],
    material: "100% cotton corduroy, embroidered logo, adjustable strap.",
    care: "Spot clean only. Do not tumble dry.",
  },
  {
    slug: "fleece-jacket",
    taglines: ["Cozy teddy fleece", "Navy and cream", "Made for après-ski"],
    image: img.fleeceWoman,
    hoverImage: img.fleeceFlat,
    name: "Fleece Jacket",
    category: "merch",
    theme: "navy",
    price: 89,
    unit: "Unisex",
    short: "Cream sherpa fleece with navy stripe. Made for the Dolomites.",
    description:
      "Heavy cream sherpa with a bold navy stripe and the Solenne script on the chest. Warm enough for the lift, cool enough for the bar.",
    images: [
      { src: img.fleeceWoman, alt: "Woman wearing the Solenne fleece jacket in the Dolomites" },
      { src: img.fleeceFlat, alt: "Solenne fleece jacket laid flat on grass" },
      { src: img.fleeceDetail, alt: "Close-up of the sherpa fabric and embroidered logo" },
      { src: img.fleeceCouple, alt: "Two friends wearing Solenne fleece jackets in the mountains" },
    ],
    sizes: ["S", "M", "L", "XL"],
    material: "100% polyester sherpa fleece with navy panel and embroidered logo.",
    care: "Machine wash cold, inside out. Do not iron the embroidery.",
  },
  {
    slug: "crewneck",
    taglines: ["Heavyweight cotton", "Relaxed fit", "Wear it anywhere"],
    image: img.jacket,
    hoverImage: img.fleeceChest,
    name: "Crewneck",
    category: "merch",
    theme: "navy",
    price: 69,
    unit: "Unisex",
    short: "Navy crewneck with back print. Hard cider, always good moments.",
    description: "Heavyweight navy crewneck with the Solenne back print. Your new favorite after-mountain layer.",
    images: [
      { src: img.jacket, alt: "Back of a navy Solenne crewneck with cream print" },
      { src: img.fleeceChest, alt: "Solenne embroidered logo detail" },
      { src: img.fleeceCouple, alt: "Friends wearing Solenne merch outdoors" },
      { src: img.tray, alt: "Solenne crew at a party" },
    ],
    sizes: ["S", "M", "L", "XL"],
    material: "80% organic cotton, 20% recycled polyester. 380 gsm.",
    care: "Machine wash 30°C inside out. Hang to dry.",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const themeClasses: Record<Theme, { page: string; outline: string; accent: string; text: string }> = {
  apple: { page: "bg-yellow text-cream", outline: "border-yellow", accent: "text-navy", text: "text-cream" },
  peach: { page: "bg-yellow text-navy", outline: "border-yellow", accent: "text-yellow", text: "text-navy" },
  navy: { page: "bg-navy text-cream", outline: "border-cream", accent: "text-navy", text: "text-cream" },
  forest: { page: "bg-yellow text-cream", outline: "border-navy", accent: "text-navy", text: "text-cream" },
};

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(n);
