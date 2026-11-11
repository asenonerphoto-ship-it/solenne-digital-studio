import type { SVGProps } from "react";
export function Starburst({ className, ...props }: SVGProps<SVGSVGElement>) {
 return <svg viewBox="0 0 150 150" className={className} aria-hidden="true" focusable="false" {...props}><path fill="currentColor" d="M73 0L88 49L132 18L105 63L150 78L103 91L132 139L85 110L69 150L57 105L8 129L39 87L0 67L45 56L22 12L62 42Z"/></svg>;
}
