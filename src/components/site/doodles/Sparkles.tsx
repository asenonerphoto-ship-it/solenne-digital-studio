import type { SVGProps } from "react";
export function Sparkles({ className, ...props }: SVGProps<SVGSVGElement>) {
 return <svg viewBox="0 0 170 150" className={className} aria-hidden="true" focusable="false" {...props}><path fill="var(--navy)" d="M62 4Q69 58 124 65Q68 72 60 133Q53 74 0 65Q54 56 62 4ZM145 87Q149 111 170 116Q148 120 144 149Q138 122 118 117Q139 112 145 87Z"/></svg>;
}
