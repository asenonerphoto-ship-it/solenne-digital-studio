import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, infoHead } from "@/components/site/InfoPage";


export const Route = createFileRoute("/press")({
  head: infoHead("Press", "Press resources and media contact for Solenne."),
  component: () => (
    <InfoPage title="Press">
      <p>Writing about Solenne? We would love to hear from you. Download our press kit or reach out to the team.</p><p><a className="underline" href="/downloads/solenne-press-kit-placeholder.pdf" download>Download press kit (placeholder)</a></p><p>Press contact: press@solenne.example (placeholder)</p>
    </InfoPage>
  ),
});
