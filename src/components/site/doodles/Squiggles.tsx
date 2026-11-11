import type { SVGProps } from "react";
export function Squiggles({ className, ...props }: SVGProps<SVGSVGElement>) {
 return <svg viewBox="0 0 220 120" className={className} aria-hidden="true" focusable="false" {...props}><g fill="none" stroke="var(--yellow)" stroke-width="9" stroke-linecap="round"><path d="M8 20Q32 0 57 20T107 20T157 20T207 20M8 58Q32 38 57 58T107 58T157 58T207 58M8 96Q32 76 57 96T107 96T157 96T207 96"/></g></svg>;
}
