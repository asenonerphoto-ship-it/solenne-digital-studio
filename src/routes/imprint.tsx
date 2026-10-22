import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, infoHead } from "@/components/site/InfoPage";


export const Route = createFileRoute("/imprint")({
  head: infoHead("Imprint", "Legal information about Solenne."),
  component: () => (
    <InfoPage title="Imprint">
      <p>Solenne S.r.l. (PLACEHOLDER)<br />Address, South Tyrol, Italy<br />VAT ID: to be added</p><p className="text-sm opacity-70">Legal details to be confirmed.</p>
    </InfoPage>
  ),
});
