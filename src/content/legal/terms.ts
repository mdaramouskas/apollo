import type { LegalContent } from "../types";

/** Terms of use (CNT-07). TODO-CLIENT: review with the client. */
export const terms: LegalContent = {
  title: { en: "Terms of Use", el: "Όροι Χρήσης" },
  updated: "2026-11-07",
  intro: {
    en: "These terms govern the use of the {legalName} website. By using the website you accept them.",
    el: "Οι παρόντες όροι διέπουν τη χρήση της ιστοσελίδας της {legalName}. Χρησιμοποιώντας την ιστοσελίδα τους αποδέχεστε.",
  },
  sections: [
    {
      heading: { en: "Information", el: "Πληροφορίες" },
      body: {
        en: "We make every reasonable effort to keep the information on this website accurate and up to date, but it is provided for general information only and does not constitute a binding offer.",
        el: "Καταβάλλουμε κάθε εύλογη προσπάθεια ώστε οι πληροφορίες της ιστοσελίδας να είναι ακριβείς και επίκαιρες, παρέχονται όμως για γενική ενημέρωση και δεν αποτελούν δεσμευτική προσφορά.",
      },
    },
    {
      heading: { en: "Intellectual property", el: "Πνευματική ιδιοκτησία" },
      body: {
        en: "The content of this website (texts, photographs, logos, design) belongs to {legalName} and may not be reproduced without prior written permission.",
        el: "Το περιεχόμενο της ιστοσελίδας (κείμενα, φωτογραφίες, λογότυπα, σχεδίαση) ανήκει στην {legalName} και δεν επιτρέπεται η αναπαραγωγή του χωρίς προηγούμενη γραπτή άδεια.",
      },
    },
    {
      heading: { en: "External links", el: "Εξωτερικοί σύνδεσμοι" },
      body: {
        en: "Links to third-party websites (maps, social networks, booking platforms) are provided for convenience; we are not responsible for their content.",
        el: "Σύνδεσμοι προς ιστοσελίδες τρίτων (χάρτες, κοινωνικά δίκτυα, πλατφόρμες κρατήσεων) παρέχονται για ευκολία· δεν ευθυνόμαστε για το περιεχόμενό τους.",
      },
    },
    {
      heading: { en: "Governing law", el: "Εφαρμοστέο δίκαιο" },
      body: {
        en: "These terms are governed by Greek law. We may amend them; the current version is always the one published on this page.",
        el: "Οι όροι διέπονται από το ελληνικό δίκαιο. Μπορούμε να τους τροποποιούμε· ισχύουσα είναι πάντα η έκδοση που δημοσιεύεται σε αυτή τη σελίδα.",
      },
    },
  ],
};
