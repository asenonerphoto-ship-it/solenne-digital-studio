import type { DoodlePlacement } from "@/components/site/doodles";
// Each named section owns movable size, rotation and placement classes.
export const doodlePlacements = {
 homeHello: [{ shape: "FlowerEye", className: "bottom-10 left-3 w-28 -rotate-12 md:left-12 md:w-44", mobile: true }],
 collection: [{ shape: "CanEye", className: "right-5 top-2 w-20 rotate-12" }],
 merch: [{ shape: "CloudSmile", className: "right-10 top-0 w-36 -rotate-6", mobile: true }],
 storyFounders: [{ shape: "Starburst", className: "right-2 top-12 w-32 text-yellow rotate-12", mobile: true }, { shape: "Sparkles", className: "bottom-5 left-5 w-24" }],
 storyTravel: [{ shape: "Squiggles", className: "right-8 bottom-8 w-36 -rotate-12", mobile: true }],
 storyItalian: [{ shape: "CanEye", className: "left-4 bottom-6 w-24 rotate-12" }],
 crewTracks: [{ shape: "Smiley", className: "right-7 top-3 w-24 rotate-12", mobile: true }, { shape: "Starburst", className: "left-8 bottom-2 w-24 text-navy -rotate-12" }],
 crewEnd: [{ shape: "Photographer", className: "bottom-0 right-4 h-[280px] md:right-24", mobile: true }],
 product: [{ shape: "Squiggles", className: "right-4 top-8 w-32 -rotate-12" }, { shape: "Starburst", className: "left-2 bottom-4 w-24 text-navy", mobile: true }],
 made: [{ shape: "FlowerEye", className: "right-0 bottom-0 w-28 rotate-12", mobile: true }, { shape: "Starburst", className: "left-2 top-3 w-16 text-navy" }],
 b2b: [{ shape: "Smiley", className: "right-3 bottom-4 w-28 -rotate-12", mobile: true }],
} satisfies Record<string, DoodlePlacement[]>;
