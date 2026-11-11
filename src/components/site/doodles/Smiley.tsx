import type { SVGProps } from "react";
export function Smiley({ className, ...props }: SVGProps<SVGSVGElement>) {
 return <svg viewBox="0 0 150 150" className={className} aria-hidden="true" focusable="false" {...props}><circle cx="75" cy="75" r="72" fill="var(--yellow)"/><g fill="var(--navy)"><ellipse cx="50" cy="59" rx="8" ry="12"/><ellipse cx="100" cy="59" rx="8" ry="12"/></g><path d="M39 90Q75 133 113 89" stroke="var(--navy)" stroke-width="8" stroke-linecap="round" fill="none"/></svg>;
}
