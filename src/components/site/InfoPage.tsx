import type { ReactNode } from "react";

export function InfoPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <section className="bg-forest px-5 py-16 text-cream md:px-10 md:py-24">
        <h1 className="display-lg mx-auto max-w-4xl">{title}</h1>
      </section>
      <section className="mx-auto max-w-4xl space-y-5 px-5 py-16 text-lg leading-relaxed md:py-24">{children}</section>
    </>
  );
}

export const infoHead = (title: string, description: string) => () => ({
  meta: [
    { title: `${title} — Solenne` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} — Solenne` },
    { property: "og:description", content: description },
  ],
});
