import type { MenuContent } from "./types";

/**
 * Restaurant / bar menu for /menu (CNT-15). Prices are strings so you can write
 * "8" or "from 12" freely. Put a PDF in /public and set `pdf` for a download button.
 */
export const menu: MenuContent = {
  pdf: "", // TODO-CLIENT e.g. "/menu.pdf"
  categories: [
    {
      name: { en: "Starters", el: "Ορεκτικά" },
      items: [
        { name: { en: "Sample starter", el: "Ενδεικτικό ορεκτικό" }, description: { en: "Short description of the dish.", el: "Σύντομη περιγραφή του πιάτου." }, price: "6", image: "/images/placeholder-menu-1.svg" },
        { name: { en: "Another starter", el: "Άλλο ορεκτικό" }, description: { en: "Short description of the dish.", el: "Σύντομη περιγραφή του πιάτου." }, price: "7.5" },
      ],
    },
    {
      name: { en: "Mains", el: "Κύρια" },
      items: [
        { name: { en: "Sample main", el: "Ενδεικτικό κύριο" }, description: { en: "Short description of the dish.", el: "Σύντομη περιγραφή του πιάτου." }, price: "14", image: "/images/placeholder-menu-2.svg" },
        { name: { en: "Another main", el: "Άλλο κύριο" }, price: "16" },
      ],
    },
    {
      name: { en: "Drinks", el: "Ποτά" },
      items: [
        { name: { en: "Sample drink", el: "Ενδεικτικό ποτό" }, price: "4", image: "/images/placeholder-menu-3.svg" },
        { name: { en: "Another drink", el: "Άλλο ποτό" }, price: "5" },
      ],
    },
  ],
};
