import { createFileRoute, Link } from "@tanstack/react-router";
import { img } from "@/lib/images";
import { products } from "@/data/products";
import { Marquee, ProductCard, Reveal, Slider, Words, slideClass, btnClass } from "@/components/site/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Solenne — Original Hard Cider. Life is good!" },
      { name: "description", content: "Italian hard cider from South Tyrol. Crispy Apple and White Peach in 330 ml cans, 5.1% ABV." },
      { property: "og:title", content: "Solenne — Original Hard Cider" },
      { property: "og:description", content: "Italian hard cider from South Tyrol. Life is good!" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(img.hero.startsWith("https://") ? [{ property: "og:image", content: img.hero }, { name: "twitter:image", content: img.hero }] : []),
    ],
  }),
  component: Home,
});

function Home() {
  const ciders = products.filter((p) => p.category === "cider");
  const merch = products.filter((p) => p.category === "merch");
  return (
    <>
      <section className="relative overflow-hidden" data-m-skip>
        <img src={img.hero} alt="Crispy Apple can standing on a mirror in the grass with petals" className="ken-burns aspect-[4/5] w-full object-cover md:aspect-[1920/990]" />
        <h1 className="sr-only">Solenne Original Hard Cider</h1>
      </section>
      <Marquee />

      {/* Say hello */}
      <section className="relative overflow-hidden bg-forest text-cream" style={{ clipPath: "polygon(0 0,100% 0,100% 92%,0 100%)" }}>
        <div className="mx-auto grid max-w-[1920px] items-center gap-12 px-5 pb-32 pt-16 md:grid-cols-2 md:px-10 md:pb-48 md:pt-24">
          <Reveal className="relative">
            <img src={img.pour} alt="Crispy Apple cider being poured into a green glass" className="shadow-photo relative z-10 mx-auto w-[85%] max-w-xl" />
            <div className="float-y absolute -left-2 bottom-10 z-20 h-28 w-28 rounded-full bg-cream shadow-tilt md:h-44 md:w-44" aria-hidden />
          </Reveal>
          <Reveal className="flex flex-col items-end text-right" delay={150}>
            <Words className="display-xl" text="Say hello|to|Solenne" />
            <p className="mt-8 max-w-md text-lg uppercase md:text-xl">We started Solenne with the goal to create a cider that feels and tastes like something Italian made should.</p>
            <p className="mt-4 font-semibold uppercase md:text-xl">We think we did a pretty good job!</p>
            <Link to="/our-story" className={btnClass("cream", "mt-8")}>Explore our story</Link>
          </Reveal>
        </div>
      </section>

      <img src={img.homeSnowChair} alt="Woman relaxing in a striped chair in the snow with a Solenne can" className="-mt-16 h-[40vh] w-full object-cover md:h-[60vh]" style={{ clipPath: "polygon(0 15%,100% 0,100% 100%,0 85%)" }} />

      <section className="mx-auto max-w-[1920px] px-5 py-16 md:px-10 md:py-24">
        <h2 className="display-md mb-10">Our collection</h2>
        <Slider>
          {ciders.map((p) => (
            <div key={p.slug} className={slideClass}><ProductCard product={p} /></div>
          ))}
        </Slider>
      </section>

      <section className="grid bg-forest text-cream md:grid-cols-2">
        <div className="flex flex-col items-end justify-center px-6 py-16 text-right md:px-16 lg:px-24">
          <Reveal className="flex flex-col items-end">
            <Words className="display-xl" text="What|is|Solenne?" />
            <p className="mt-8 max-w-md text-lg uppercase">Apples from South Tyrol, a can inspired by Osaka, and a whole lot of Italian style.</p>
            <Link to="/how-its-made" className={btnClass("cream", "mt-8")}>How it's made</Link>
          </Reveal>
        </div>
        <img src={img.canHand} alt="Hand with gold rings holding a Solenne can against a white tee" className="h-[420px] w-full object-cover md:h-full md:min-h-[700px]" />
      </section>

      <section className="mx-auto max-w-[1920px] px-5 py-16 md:px-10 md:py-24">
        <h2 className="display-md mb-10">Our merch</h2>
        <Slider>
          {merch.map((p) => (
            <div key={p.slug} className={slideClass}><ProductCard product={p} /></div>
          ))}
        </Slider>
      </section>

      <section className="grid bg-forest text-cream md:grid-cols-2">
        <img src={img.tray} alt="Tray of White Peach cans with straws and peach slices at a party" className="h-[420px] w-full object-cover md:h-full md:min-h-[700px]" />
        <div className="flex flex-col items-end justify-center px-6 py-16 text-right md:px-16 lg:px-24">
          <Reveal className="flex flex-col items-end">
            <Words className="display-xl" text="Join|the|crew!" />
            <p className="mt-8 max-w-md text-lg uppercase">Bring Solenne to bars, parties, mountains and festivals. Get free merch and good vibes.</p>
            <Link to="/crew" className={btnClass("cream", "mt-8")}>Explore the crew</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
