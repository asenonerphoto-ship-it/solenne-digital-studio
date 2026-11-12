import { useRef, type ReactNode } from "react";
import { usePauseOffscreen } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Words } from "./ui";
import { Doodles, type DoodlePlacement } from "./doodles";
export function SectionLabel({ children, tilted = false, className }: { children: ReactNode; tilted?: boolean; className?: string }) {
 return <h2 className={cn("section-label inline-block bg-navy px-5 py-4 font-display text-2xl uppercase text-yellow md:px-10 md:text-4xl", tilted && "-rotate-6", className)}>{children}</h2>;
}
export function PhotoHero({ src, alt, title, label, children, className, doodles }: { src: string; alt: string; title?: string; label?: string; children?: ReactNode; className?: string; doodles?: readonly DoodlePlacement[] }) {
 const ref = useRef<HTMLElement>(null);
 usePauseOffscreen(ref);
 return <section ref={ref} className={cn("photo-hero film-photo relative overflow-hidden", className)} data-m-skip>
 <img src={src} alt={alt} className="ken-burns absolute inset-0 h-full w-full object-cover" />
 {doodles && <Doodles items={doodles} />}
 <div className="hero-content relative z-10 flex h-full flex-col items-end justify-end px-5 py-12 text-right md:px-10 md:py-16">
 {title && <Words as="h1" className="hero-title text-yellow" text={title} />}
 {label && <span className="mt-5 inline-block -rotate-6 bg-yellow px-6 py-3 font-display text-3xl uppercase text-navy md:text-5xl">{label}</span>}
 {children}
 </div></section>;
}
export function PhotoBand({ src, alt, className, children, doodles }: { src: string; alt: string; className?: string; children?: ReactNode; doodles?: readonly DoodlePlacement[] }) {
 return <section className={cn("photo-band film-photo relative overflow-hidden slant-top", className)}>
 <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />{children}{doodles && <Doodles items={doodles} />}</section>;
}
export function TiltPhoto({ src, alt, className }: { src: string; alt: string; className?: string }) {
 return <div className={cn("tilt-photo film-photo relative -rotate-6", className)}><img src={src} alt={alt} loading="lazy" className="relative z-[1] aspect-[4/5] w-full object-cover" /></div>;
}
