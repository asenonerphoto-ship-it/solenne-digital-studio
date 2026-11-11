import type { SVGProps } from "react";
export function CloudSmile({ className, ...props }: SVGProps<SVGSVGElement>) {
 return <svg viewBox="0 0 220 150" className={className} aria-hidden="true" focusable="false" {...props}><g fill="none" stroke="var(--yellow)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><path d="M48 115C-5 115 1 59 40 58C30 6 93-2 111 36C138 0 190 18 182 55C232 52 229 117 183 119Z"/><path d="M68 76q13 16 27 0M124 76q13 16 27 0M98 102q14 9 27-1"/></g></svg>;
}
