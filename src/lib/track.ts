// Analytics stub: events are prepared but not sent to GA4 yet.
export type DownPaymentEvent =
  | "down_payment_landing_view"
  | "down_payment_education_start"
  | "down_payment_slider_interaction"
  | "down_payment_percentage_change"
  | "down_payment_amount_change"
  | "down_payment_budget_start"
  | "down_payment_budget_complete"
  | "down_payment_myth_interaction"
  | "down_payment_checklist_interaction"
  | "down_payment_faq_open"
  | "down_payment_inventory_view"
  | "down_payment_vehicle_click"
  | "down_payment_inventory_cta";

export function track(event: DownPaymentEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}

export const mxn = (n: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);

export function splitPrice(price: number, pct: number) {
  const enganche = Math.round(price * (pct / 100));
  return { enganche, restante: price - enganche };
}
