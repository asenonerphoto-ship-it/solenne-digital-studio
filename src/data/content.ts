import { img } from "@/lib/images";

export const navLinks = [
  { to: "/shop", label: "Shop" },
  { to: "/our-story", label: "Our Story" },
  { to: "/crew", label: "Our Crew" },
  { to: "/how-its-made", label: "How It's Made" },
  { to: "/b2b", label: "B2B" },
] as const;

export const storyTimeline = [
  { title: "The idea", text: "A trip to Osaka. Vending machines full of colorful cans. One question: why not cider?" },
  { title: "Finding the apples", text: "Back home in South Tyrol, we walked the orchards and met the growers." },
  { title: "First recipe", text: "Dozens of batches, one kitchen, too many tasting nights. Then: the one." },
  { title: "First can", text: "Waves, stripes, a script logo. Life is good — printed on aluminium." },
  { title: "Launch", text: "From the valley to the Dolomites, bars and festivals. Hello, Solenne." },
];

export const madeSteps = [
  { title: "Apples & fruit", text: "Hand-picked apples from South Tyrol's growing region, where alpine sun meets cool nights.", src: img.appleApples },
  { title: "Pressing", text: "The fruit is washed and gently pressed into fresh, cloudy juice within hours of picking.", src: img.peachPeaches },
  { title: "Fermentation", text: "Slow, cool fermentation keeps the fruit bright and the finish crisp.", src: img.appleGarden },
  { title: "Canning", text: "Lightly carbonated and sealed in 330 ml aluminium cans to lock in the sparkle.", src: img.toast },
  { title: "Quality control", text: "Every batch is tasted and tested before it leaves the cellar. No shortcuts.", src: img.canHand },
];

export const b2bSteps = [
  { title: "Inquiry", text: "Tell us about your venue using the form below." },
  { title: "Samples", text: "We send a tasting box so your team can try both flavors." },
  { title: "Order", text: "Pick your mix, cases and POS material." },
  { title: "Delivery", text: "Delivered cold-ready to your door across Italy." },
];

export const crewSteps = [
  { title: "Apply", text: "Fill in the form and tell us who you are." },
  { title: "Meet us", text: "Quick call, good vibes, no pressure." },
  { title: "Join the crew", text: "Get your welcome kit and start sharing Solenne." },
];

export const faqs = [
  { q: "What is hard cider?", a: "Hard cider is fermented apple juice — naturally sparkling, fruity and lightly alcoholic. Solenne is 5.1% ABV." },
  { q: "Where are your apples from?", a: "Our apples come from South Tyrol's growing region in northern Italy." },
  { q: "Is Solenne gluten-free?", a: "Cider is naturally made without grains. Final gluten-free certification is to be confirmed." },
  { q: "How should I serve it?", a: "Cold. Straight from the can or over ice with a slice of lime or peach." },
  { q: "Where do you ship?", a: "We currently ship within Italy. More countries coming soon." },
  { q: "Do I need to be 18?", a: "Yes. You must be of legal drinking age (18+) to buy and enjoy Solenne." },
];
