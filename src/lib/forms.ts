// Form submission layer. Swap these stubs for real backend calls later.
export type FormPayload = Record<string, string | boolean | string[]>;

export async function submitForm(kind: "newsletter" | "crew" | "b2b" | "contact" | "review", data: FormPayload) {
  await new Promise((r) => setTimeout(r, 600));
  if (typeof window !== "undefined") console.info(`[solenne] ${kind} form submitted`, data);
  return { ok: true as const };
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
