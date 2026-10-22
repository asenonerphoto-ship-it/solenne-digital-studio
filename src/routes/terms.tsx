import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, infoHead } from "@/components/site/InfoPage";


export const Route = createFileRoute("/terms")({
  head: infoHead("Terms & Conditions", "Terms and conditions for using the Solenne website and shop."),
  component: () => (
    <InfoPage title="Terms & Conditions">
      <p>You must be 18 or older to purchase Solenne. Please enjoy responsibly.</p><p className="text-sm opacity-70">PLACEHOLDER — full terms to be provided by legal counsel.</p>
    </InfoPage>
  ),
});
