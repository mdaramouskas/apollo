import type { LegalContent } from "../types";

/**
 * Privacy policy (CNT-07). Generic GDPR text for a brochure site with a
 * contact form and optional consent-based analytics. TODO-CLIENT: review with
 * the client; add any extra processors they use.
 */
export const privacy: LegalContent = {
  title: { en: "Privacy Policy", el: "Πολιτική Απορρήτου" },
  updated: "2026-11-07",
  intro: {
    en: "This policy explains what personal data {legalName} collects through this website, how it is used and what your rights are under the EU General Data Protection Regulation 2016/679 (GDPR).",
    el: "Η παρούσα πολιτική εξηγεί ποια προσωπικά δεδομένα συλλέγει η {legalName} μέσω αυτής της ιστοσελίδας, πώς τα χρησιμοποιεί και ποια είναι τα δικαιώματά σας σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων 2016/679 (GDPR).",
  },
  sections: [
    {
      heading: { en: "Data controller", el: "Υπεύθυνος επεξεργασίας" },
      body: {
        en: "The data controller is {legalName}, {address}. For any matter concerning your personal data you can contact us at {email}.",
        el: "Υπεύθυνος επεξεργασίας είναι η {legalName}, {address}. Για κάθε θέμα σχετικά με τα προσωπικά σας δεδομένα μπορείτε να επικοινωνήσετε στο {email}.",
      },
    },
    {
      heading: { en: "What we collect", el: "Τι συλλέγουμε" },
      body: {
        en: "When you use the contact form we collect the details you enter: name, email address, phone number (if given) and your message. We collect nothing beyond what is needed to answer you.",
        el: "Όταν χρησιμοποιείτε τη φόρμα επικοινωνίας συλλέγουμε τα στοιχεία που εισάγετε: όνομα, email, τηλέφωνο (αν δοθεί) και το μήνυμά σας. Δεν συλλέγουμε τίποτα πέρα από όσα χρειάζονται για να σας απαντήσουμε.",
      },
    },
    {
      heading: { en: "How we use it", el: "Πώς τα χρησιμοποιούμε" },
      body: {
        en: "Your data is used solely to reply to your request and, where you asked for it, to send you our newsletter. We do not sell personal data to third parties.",
        el: "Τα δεδομένα σας χρησιμοποιούνται μόνο για να απαντήσουμε στο αίτημά σας και, εφόσον το ζητήσατε, για την αποστολή του newsletter μας. Δεν πωλούμε προσωπικά δεδομένα σε τρίτους.",
      },
    },
    {
      heading: { en: "Service providers", el: "Πάροχοι υπηρεσιών" },
      body: {
        en: "Messages are delivered through an email service provider (Resend) and the website is hosted on Vercel. Each provider processes data on our behalf under its own data protection terms.",
        el: "Τα μηνύματα παραδίδονται μέσω παρόχου email (Resend) και η ιστοσελίδα φιλοξενείται στο Vercel. Κάθε πάροχος επεξεργάζεται δεδομένα για λογαριασμό μας βάσει των δικών του όρων προστασίας δεδομένων.",
      },
    },
    {
      heading: { en: "Cookies & analytics", el: "Cookies & στατιστικά" },
      body: {
        en: "The website works without tracking cookies. Analytics cookies (Google Analytics / Tag Manager) are set only if you accept them in the cookie banner; you can withdraw consent by clearing your browser data.",
        el: "Η ιστοσελίδα λειτουργεί χωρίς cookies παρακολούθησης. Cookies στατιστικών (Google Analytics / Tag Manager) τοποθετούνται μόνο αν τα αποδεχτείτε στο σχετικό μήνυμα· μπορείτε να ανακαλέσετε τη συναίνεση διαγράφοντας τα δεδομένα του browser σας.",
      },
    },
    {
      heading: { en: "Retention", el: "Διατήρηση" },
      body: {
        en: "Contact messages are kept for as long as needed to handle your request and then deleted, unless a legal obligation requires us to keep them longer.",
        el: "Τα μηνύματα επικοινωνίας διατηρούνται για όσο χρειάζεται η διαχείριση του αιτήματός σας και στη συνέχεια διαγράφονται, εκτός αν νομική υποχρέωση επιβάλλει μεγαλύτερη διατήρηση.",
      },
    },
    {
      heading: { en: "Your rights", el: "Τα δικαιώματά σας" },
      body: {
        en: "You have the right to access, rectify, erase and port your data, and to restrict or object to its processing. Write to {email}. You may also lodge a complaint with the Hellenic Data Protection Authority (www.dpa.gr).",
        el: "Έχετε δικαίωμα πρόσβασης, διόρθωσης, διαγραφής και φορητότητας των δεδομένων σας, καθώς και περιορισμού ή αντίρρησης στην επεξεργασία. Γράψτε μας στο {email}. Μπορείτε επίσης να υποβάλετε καταγγελία στην Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (www.dpa.gr).",
      },
    },
  ],
};
