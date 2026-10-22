import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, infoHead } from "@/components/site/InfoPage";
import { Accordion } from "@/components/site/ui";
import { faqs } from "@/data/content";

export const Route = createFileRoute("/faq")({
  head: infoHead("FAQ", "Answers to common questions about Solenne hard cider."),
  component: () => (
    <InfoPage title="FAQ">
      <Accordion items={faqs} />
    </InfoPage>
  ),
});
