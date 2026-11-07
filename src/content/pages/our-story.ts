import type { PageContent } from "../types";

/**
 * Example extra page → /our-story (CNT-02 / CNT-03).
 * Copy this file to add another page, then register it in ./index.ts.
 */
export const ourStory: PageContent = {
  slug: "our-story",
  inNav: true,
  navLabel: { en: "Our story", el: "Η ιστορία μας" },
  kicker: { en: "Our story", el: "Η ιστορία μας" },
  title: { en: "How it all started", el: "Πώς ξεκίνησαν όλα" },
  intro: {
    en: "A longer-form page for content that does not fit the one-page home: history, team, process, case studies.",
    el: "Μια σελίδα για περιεχόμενο που δεν χωράει στην αρχική: ιστορία, ομάδα, διαδικασία, παραδείγματα έργων.",
  },
  metaDescription: {
    en: "The story behind the business — who we are and how we work.",
    el: "Η ιστορία πίσω από την επιχείρηση — ποιοι είμαστε και πώς δουλεύουμε.",
  },
  sections: [
    {
      heading: { en: "The beginning", el: "Η αρχή" },
      body: {
        en: "Two or three paragraphs can go here. Keep each section focused on one idea so the page stays easy to scan.",
        el: "Δύο ή τρεις παράγραφοι μπορούν να μπουν εδώ. Κρατήστε κάθε ενότητα σε μία ιδέα για να διαβάζεται εύκολα.",
      },
      image: { src: "/images/placeholder-about-1.svg", alt: { en: "Early days", el: "Τα πρώτα χρόνια" } },
    },
    {
      heading: { en: "How we work", el: "Πώς δουλεύουμε" },
      body: {
        en: "Describe the process a client goes through, from first contact to delivery.",
        el: "Περιγράψτε τη διαδικασία που ακολουθεί ένας πελάτης, από την πρώτη επαφή έως την παράδοση.",
      },
    },
  ],
};
