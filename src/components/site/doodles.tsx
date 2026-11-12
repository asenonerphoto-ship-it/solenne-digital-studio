import { useRef } from "react";
import { usePauseOffscreen } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { FlowerEye } from "./doodles/FlowerEye";
import { CanEye } from "./doodles/CanEye";
import { CloudSmile } from "./doodles/CloudSmile";
import { Starburst } from "./doodles/Starburst";
import { Sparkles } from "./doodles/Sparkles";
import { Squiggles } from "./doodles/Squiggles";
import { Smiley } from "./doodles/Smiley";
import { Camera } from "./doodles/Camera";
import { Heart } from "./doodles/Heart";
import { SunWaves } from "./doodles/SunWaves";
import { Peace } from "./doodles/Peace";
import { Apple } from "./doodles/Apple";
import { Arrow } from "./doodles/Arrow";
import { Cassette } from "./doodles/Cassette";
import { CanSmile } from "./doodles/CanSmile";
import { Flower } from "./doodles/Flower";
import { CanWings } from "./doodles/CanWings";
import { Mountain } from "./doodles/Mountain";
import { Rainbow } from "./doodles/Rainbow";
import { CanFlower } from "./doodles/CanFlower";

export { FlowerEye, CanEye, CloudSmile, Starburst, Sparkles, Squiggles, Smiley, Camera, Heart, SunWaves, Peace, Apple, Arrow, Cassette, CanSmile, Flower, CanWings, Mountain, Rainbow, CanFlower };

const shapes = { FlowerEye, CanEye, CloudSmile, Starburst, Sparkles, Squiggles, Smiley, Camera, Heart, SunWaves, Peace, Apple, Arrow, Cassette, CanSmile, Flower, CanWings, Mountain, Rainbow, CanFlower };
export type DoodlePlacement = { shape: keyof typeof shapes; className: string; mobile?: boolean };

export function Doodles({ items }: { items: readonly DoodlePlacement[] }) {
  const ref = useRef<HTMLDivElement>(null);
  usePauseOffscreen(ref);
  return (
    <div ref={ref} className="doodle-layer pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true" data-m-skip>
      {items.map((item, i) => {
        const Shape = shapes[item.shape];
        return <Shape key={i} className={cn("doodle absolute float-y text-navy", !item.mobile && "hidden md:block", item.className)} />;
      })}
    </div>
  );
}
