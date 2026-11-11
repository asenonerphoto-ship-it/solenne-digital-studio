import type { SVGProps } from "react";
export function CanEye({ className, ...props }: SVGProps<SVGSVGElement>) {
 return <svg viewBox="0 0 150 180" className={className} aria-hidden="true" focusable="false" {...props}><g transform="rotate(-13 75 90)"><path fill="var(--navy)" d="M37 25Q75 12 112 25L122 151Q77 176 29 151Z"/><ellipse cx="75" cy="25" rx="37" ry="9" fill="var(--yellow)"/><path fill="var(--cream)" d="M42 91Q76 55 111 91Q76 122 42 91"/><circle cx="77" cy="90" r="13" fill="var(--navy)"/></g></svg>;
}
