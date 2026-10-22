import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, infoHead } from "@/components/site/InfoPage";


export const Route = createFileRoute("/privacy")({
  head: infoHead("Privacy Policy", "How Solenne handles your personal data."),
  component: () => (
    <InfoPage title="Privacy Policy">
      <p>We only collect the data you give us through our forms (newsletter, crew applications, wholesale inquiries) and use it to respond to you. We never sell your data.</p><p className="text-sm opacity-70">PLACEHOLDER — full privacy policy to be provided by legal counsel.</p>
    </InfoPage>
  ),
});
