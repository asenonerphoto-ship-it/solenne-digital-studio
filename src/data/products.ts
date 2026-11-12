import { img } from "@/lib/images";

export type Category = "cider" | "merch";

export interface Product {
  slug: string;
  name: string;
  category: Category;
  pack?: "single" | "variety";
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
    image: img["apple-telephone"],
    hoverImage: img["apple-can-blue-sky"],
    name: "Crispy Apple",
    category: "cider",
    pack: "single",
    price: 29.9,
    unit: "12 cans",
    short: "Our refreshing classic apple cider with a twist.",
    description:
      "Crisp, bright and made with apples from South Tyrol. Fruity and sparkly with a touch of style — the one you open first.",
    images: [
      { src: img["apple-teal-glass"], alt: "Crispy Apple can next to a glass of cider over ice on teal tiles" },
      { src: img["apple-three-hands"], alt: "Three friends holding Crispy Apple cans against a blue sky" },
      { src: img["apple-hand-closeup"], alt: "Crispy Apple can held against a blue sky" },
      { src: img["apple-lime-still-life"], alt: "Crispy Apple can with lime and mint against a blue sky" },
    ],
    taste: { sweet: 45, refreshing: 90, sparkling: 75 },
    serve: [
      { title: "Over ice with lime", text: "Big glass, lots of ice, a wedge of lime. Done.", src: img["apple-pour-garden"] },
      { title: "With salty snacks", text: "Chips, olives, taralli. Crisp meets salty.", src: img["apple-snack-table"] },
      { title: "Après-ski", text: "Straight from the can, boots still on.", src: img["snow-can-mountain-toast"] },
    ],
  },
  {
    slug: "white-peach",
    badge: "FAN FAV",
    taglines: ["Juicy white peach twist", "Soft, fruity and fizzy", "Summer in a can"],
    image: img["peach-headphones"],
    hoverImage: img["peach-beach-couple"],
    name: "White Peach",
    category: "cider",
    pack: "single",
    price: 29.9,
    unit: "12 cans",
    short: "Our refreshing classic apple cider with a peachy twist.",
    description:
      "South Tyrolean apples meet juicy white peach. Soft, sunny and sparkling — summer in a can, all year long.",
    images: [
      { src: img["peach-umbrella"], alt: "White Peach can with a peach slice, straw and umbrella" },
      { src: img["peach-cocktail-table"], alt: "White Peach can with iced cider, citrus and cocktail garnishes" },
      { src: img["poolside-friends"], alt: "Friends enjoying Solenne together beside the pool" },
      { src: img.peachTable, alt: "White Peach cider served on a sunny table" },
    ],
    taste: { sweet: 65, refreshing: 80, sparkling: 70 },
    serve: [
      { title: "With a peach slice", text: "Ice, a fresh peach slice, sunshine optional.", src: img.peachGarnish },
      { title: "With salty snacks", text: "Prosciutto, focaccia, friends.", src: img["apple-sandwich-tattoo"] },
      { title: "Poolside", text: "Cold can, warm towel, nowhere to be.", src: img["poolside-snacks"] },
    ],
  },
  {
    slug: "mixed-pack",
    badge: "NEW",
    taglines: ["Both flavors in one box", "Perfect for sharing", "12 cans of good vibes"],
    image: img["duo-radio"],
    hoverImage: img["duo-radio-yellow"],
    name: "Mixed Pack",
    category: "cider",
    pack: "variety",
    price: 31.9,
    unit: "6 Crispy Apple + 6 White Peach",
    short: "Can't decide? Don't. Both flavors, one box.",
    description: "Six Crispy Apple, six White Peach. The perfect box for parties, road trips and people who like options.",
    images: [
      { src: img["apple-six-can-caddy"], alt: "Six Solenne cans in a yellow carrier" },
      { src: img["apple-bar-pour-apron"], alt: "Solenne cider poured by a bartender in a yellow apron" },
      { src: img["apple-headphones-yellow"], alt: "Crispy Apple can with retro headphones on a yellow table" },
      { src: img["apple-headphones"], alt: "Crispy Apple can by the pool" },
    ],
    taste: { sweet: 55, refreshing: 85, sparkling: 72 },
    serve: [
      { title: "Party bucket", text: "Fill a bucket with ice. Mix both flavors. Invite everyone.", src: img["cider-cooler"] },
      { title: "With salty snacks", text: "Something crunchy, something salty.", src: img["apple-car-picnic"] },
      { title: "Après-ski", text: "One for you, one for your friend.", src: img["apple-green-fleece"] },
    ],
  },
  {
    slug: "corduroy-hat",
    taglines: ["Soft corduroy, curved brim", "One size fits most", "Embroidered Solenne logo"],
    image: img.hat,
    hoverImage: img["cap-can-sunglasses-closeup"],
    name: "Corduroy Hat",
    category: "merch",
    price: 34,
    unit: "One size",
    short: "Navy corduroy cap with the Solenne script.",
    description: "Soft navy corduroy, embroidered Solenne logo, adjustable strap. Goes with sunglasses and bad hair days.",
    images: [
      { src: img.hat, alt: "Navy corduroy Solenne hat on a newspaper with sunglasses" },
      { src: img["merch-stack"], alt: "Solenne hats and clothing stacked together" },
      { src: img["crew-tennis"], alt: "Solenne crew friends at a tennis court" },
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
    price: 89,
    unit: "Unisex",
    short: "Cream sherpa fleece with navy stripe. Made for the Dolomites.",
    description:
      "Heavy cream sherpa with a bold navy stripe and the Solenne script on the chest. Warm enough for the lift, cool enough for the bar.",
    images: [
      { src: img.fleeceWoman, alt: "Woman wearing the Solenne fleece jacket in the Dolomites" },
      { src: img.fleeceFlat, alt: "Solenne fleece jacket laid flat on grass" },
      { src: img.fleeceDetail, alt: "Close-up of the sherpa fabric and embroidered logo" },
      { src: img["fleece-skis-snow"], alt: "Solenne fleece resting beside skis in the snow" },
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
    price: 69,
    unit: "Unisex",
    short: "Navy crewneck with back print. Hard cider, always good moments.",
    description: "Heavyweight navy crewneck with the Solenne back print. Your new favorite after-mountain layer.",
    images: [
      { src: img.jacket, alt: "Back of a navy Solenne crewneck with cream print" },
      { src: img.fleeceChest, alt: "Solenne embroidered logo detail" },
      { src: img["navy-crewneck-ski-portrait"], alt: "Woman wearing a navy Solenne crewneck in the mountains" },
      { src: img["navy-crewneck-mountain-cafe"], alt: "Friends wearing Solenne clothing at a mountain cafe" },
    ],
    sizes: ["S", "M", "L", "XL"],
    material: "80% organic cotton, 20% recycled polyester. 380 gsm.",
    care: "Machine wash 30°C inside out. Hang to dry.",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

