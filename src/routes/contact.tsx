import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, infoHead } from "@/components/site/InfoPage";
import { LeadForm } from "@/components/site/LeadForm";

export const Route = createFileRoute("/contact")({
  head: infoHead("Contact", "Get in touch with the Solenne team."),
  component: () => (
    <InfoPage title="Contact">
      <p className="mb-8">Questions, store finder, gifts or just saying ciao — drop us a line.</p><div className="rounded-[var(--radius-card)] bg-forest p-8 text-cream"><LeadForm kind="contact" submitLabel="Send message" consent="I agree that Solenne may reply to my message." success={<p>Thanks! We will get back to you soon.</p>} fields={[{ name: "name", label: "Name", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "message", label: "Message", as: "textarea", required: true }]} /></div>
    </InfoPage>
  ),
});
