import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, infoHead } from "@/components/site/InfoPage";


export const Route = createFileRoute("/shipping")({
  head: infoHead("Shipping & Returns", "Shipping and returns information for Solenne orders."),
  component: () => (
    <InfoPage title="Shipping & Returns">
      <p>We currently ship within Italy. Orders leave our warehouse within 1–3 business days. Free shipping over €60.</p><p>Merch can be returned unworn within 30 days. For hygiene and safety reasons, opened cider cannot be returned.</p><p className="text-sm opacity-70">PLACEHOLDER — shipping terms to be confirmed.</p>
    </InfoPage>
  ),
});
