import type { SVGProps } from "react";
export function FlowerEye({ className, ...props }: SVGProps<SVGSVGElement>) {
 return <svg viewBox="0 0 160 160" className={className} aria-hidden="true" focusable="false" {...props}><path fill="var(--navy)" d="M80 27C57-15 21 10 40 46C-7 33-15 77 30 84C-7 113 24 146 54 122C51 169 99 176 105 128C141 157 173 124 136 100C182 82 159 40 122 52C137 7 92-7 80 27Z"/><path fill="var(--yellow)" d="M43 78Q80 38 118 78Q80 113 43 78"/><ellipse fill="var(--navy)" cx="81" cy="77" rx="13" ry="19"/></svg>;
}
