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
import { Photographer } from "./doodles/Photographer";
export { FlowerEye };
export { CanEye };
export { CloudSmile };
export { Starburst };
export { Sparkles };
export { Squiggles };
export { Smiley };
export { Photographer };

const shapes = { FlowerEye, CanEye, CloudSmile, Starburst, Sparkles, Squiggles, Smiley, Photographer };
export type DoodlePlacement = { shape: keyof typeof shapes; className: string; mobile?: boolean };
export function Doodles({ items }: { items: readonly DoodlePlacement[] }) {
 const ref = useRef<HTMLDivElement>(null);
 usePauseOffscreen(ref);
 return <div ref={ref} className="doodle-layer pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true" data-m-skip>{items.map((item, i) => {
 const Shape = shapes[item.shape];
 return <Shape key={i} className={cn("doodle absolute float-y", !item.mobile && "hidden md:block", item.className)} />;
 })}</div>;
}
