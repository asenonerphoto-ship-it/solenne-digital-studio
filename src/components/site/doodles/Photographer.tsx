import type { SVGProps } from "react";
export function Photographer({ className, ...props }: SVGProps<SVGSVGElement>) {
 return <svg viewBox="0 0 220 300" className={className} aria-hidden="true" focusable="false" {...props}><g fill="none" stroke="var(--yellow)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M81 42Q81 9 118 15L145 37L77 39L64 47M89 43Q74 74 99 85L128 79L134 50M99 86L82 104L52 162L92 187L134 145L149 119L130 89M76 108L117 117L155 81M101 133L136 133L170 101M144 69L190 72L190 101L148 98Z M167 67L173 59L183 62L185 72M159 84a9 9 0 1 0 18 0a9 9 0 1 0-18 0M55 166L26 218L68 234L115 191L145 191L166 244L204 251L205 267L159 266L127 219L77 267L23 264L16 245L40 231M112 191L90 187"/></g></svg>;
}
