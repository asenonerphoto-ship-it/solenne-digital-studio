import { useState, type FormEvent, type ReactNode } from "react";
import { FormField, btnClass } from "./ui";
import { isEmail, submitForm } from "@/lib/forms";

export interface FieldDef {
  name: string;
  label: string;
  type?: string;
  as?: "textarea" | "select";
  options?: string[];
  required?: boolean;
  full?: boolean;
}

export function LeadForm({ kind, fields, consent, submitLabel, success }: { kind: "crew" | "b2b" | "contact"; fields: FieldDef[]; consent: string; submitLabel: string; success: ReactNode }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data: Record<string, string | boolean> = {};
    const errs: Record<string, string> = {};
    for (const f of fields) {
      const v = String(fd.get(f.name) ?? "").trim();
      data[f.name] = v;
      if (f.required && !v) errs[f.name] = "This field is required.";
      else if (f.type === "email" && v && !isEmail(v)) errs[f.name] = "Please enter a valid email.";
    }
    data.consent = fd.get("consent") === "on";
    if (!data.consent) errs.consent = "Please accept to continue.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setState("sending");
    await submitForm(kind, data);
    setState("done");
  };
  if (state === "done") return <div className="rounded-[var(--radius-card)] bg-cream p-8 text-forest" role="status">{success}</div>;
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 md:grid-cols-2">
      {fields.map((f) => (
        <FormField key={f.name} id={`${kind}-${f.name}`} name={f.name} label={f.label + (f.required ? " *" : "")} type={f.type} as={f.as} options={f.options} error={errors[f.name]} className={f.full || f.as === "textarea" ? "md:col-span-2" : ""} />
      ))}
      <div className="md:col-span-2">
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" name="consent" className="mt-1 h-5 w-5 accent-peach" />
          <span>{consent}</span>
        </label>
        {errors.consent && <p className="mt-1.5 text-sm font-semibold text-destructive" role="alert">{errors.consent}</p>}
      </div>
      <button className={btnClass("cream", "md:col-span-2 md:justify-self-start")} disabled={state === "sending"}>{state === "sending" ? "Sending…" : submitLabel}</button>
    </form>
  );
}
