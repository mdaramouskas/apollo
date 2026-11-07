import type { PromoContent } from "./types";

/** Promo bar content (CNT-13). Shown only when the module is on. */
export const promo: PromoContent = {
  text: { en: "Sample promo: spring offer on all services.", el: "Ενδεικτική προσφορά: ανοιξιάτικες τιμές σε όλες τις υπηρεσίες." }, // TODO-CLIENT
  href: "#contact",
  linkLabel: { en: "Ask us", el: "Ρωτήστε μας" },
  until: "", // TODO-CLIENT ISO date, e.g. "2026-06-30T23:59:59+03:00"; empty = no countdown
};
