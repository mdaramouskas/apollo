/**
 * English dictionary — the reference shape. Every other locale file must
 * export an object with exactly the same keys (TypeScript enforces it via
 * `satisfies Dict` in the locale files).
 *
 * Demo copy is deliberately generic. Replace it per client (CNT-09).
 */
const en = {
  nav: {
    about: "About",
    services: "Services",
    gallery: "Gallery",
    reviews: "Reviews",
    instagram: "Instagram",
    faq: "FAQ",
    location: "Location",
    contact: "Contact",
    menu: "Menu",
    cta: "Get in touch",
    bookExternal: "Book now",
    languageLabel: "Change language",
    menuLabel: "Menu",
    skipToContent: "Skip to content",
  },
  hero: {
    kicker: "Greek restaurant · Argassi, Zakynthos",
    title: "Come and enjoy a feast of flavors",
    subtitle:
      "Apollo is a Greek restaurant in Argassi, Zakynthos. For news and what's cooking, follow us on Instagram or send us a message.",
    cta: "Get in touch",
    secondary: "Where to find us",
  },
  about: {
    kicker: "About us",
    title: "Apollo Greek Cuisine",
    body1:
      "Apollo is a Greek restaurant in Argassi, one of the liveliest villages of Zakynthos. Greek cuisine — a feast of flavors, as we like to say.",
    body2:
      "Come find us in Argassi, or follow us on Instagram to see what's on the table.",
    stats: [] as { value: string; label: string }[],
    imageAlt1: "The restaurant", // TODO-CLIENT real photos
    imageAlt2: "From the kitchen", // TODO-CLIENT real photos
  },
  services: {
    kicker: "Services",
    title: "What we do",
    items: [
      { icon: "spark", title: "Service one", text: "One or two sentences on this service and the result the client gets." },
      { icon: "layers", title: "Service two", text: "One or two sentences on this service and the result the client gets." },
      { icon: "shield", title: "Service three", text: "One or two sentences on this service and the result the client gets." },
      { icon: "clock", title: "Service four", text: "One or two sentences on this service and the result the client gets." },
      { icon: "chat", title: "Service five", text: "One or two sentences on this service and the result the client gets." },
      { icon: "star", title: "Service six", text: "One or two sentences on this service and the result the client gets." },
    ],
  },
  gallery: {
    kicker: "Gallery",
    title: "A look around",
    photoAlt: "Gallery photo {n}",
    prev: "Previous photo",
    next: "Next photo",
    close: "Close",
  },
  reviews: {
    kicker: "Reviews",
    title: "What clients say",
    sampleNotice: "Sample reviews — replace with real client feedback before launch.",
    items: [
      { name: "Sample client A", date: "Sample date", text: "Sample review text. Replace with a real, attributed quote from a client." },
      { name: "Sample client B", date: "Sample date", text: "Sample review text. Replace with a real, attributed quote from a client." },
      { name: "Sample client C", date: "Sample date", text: "Sample review text. Replace with a real, attributed quote from a client." },
    ],
  },
  instagram: {
    kicker: "Instagram",
    title: "Follow along",
    follow: "Follow us",
  },
  faq: {
    kicker: "FAQ",
    title: "Common questions",
    items: [
      { q: "What are your opening hours?", a: "Monday to Friday, 09:00–18:00. Appointments outside these hours are possible on request." },
      { q: "How quickly do you reply?", a: "We answer every message within one working day." },
      { q: "Do you work with clients outside the city?", a: "Yes. Most of our work can be done remotely; we travel when the project needs it." },
      { q: "How do we start?", a: "Send a message through the contact form with a few lines about what you need. We will suggest a first call." },
    ],
  },
  location: {
    kicker: "Location",
    title: "Where to find us",
    body: "You will find us in Argassi, on the east coast of Zakynthos, a short drive from Zakynthos Town.",
    poisTitle: "Nearby",
    openInMaps: "Open in Google Maps",
    mapTitle: "Map of our location",
    pois: [] as { name: string; distance: string }[],
  },
  contact: {
    kicker: "Contact",
    title: "Let's talk",
    body: "Send us a message and we will get back to you as soon as we can.",
    form: {
      name: "Full name",
      email: "Email",
      phone: "Phone (optional)",
      message: "Message",
      consent: "I have read the privacy policy and agree to be contacted about my request.",
      submit: "Send message",
      submitting: "Sending…",
      success: "Thank you — your message has been sent. We will reply shortly.",
      demoNotice: "Demo mode: email sending is not configured, the message was logged on the server.",
      errors: {
        generic: "Something went wrong. Please try again or email us directly.",
        rateLimited: "Too many messages in a short time. Please try again in a few minutes.",
        invalid: "Please check the highlighted fields.",
      },
    },
    detailsTitle: "Contact details",
    hoursTitle: "Opening hours",
  },
  newsletter: {
    title: "Newsletter",
    body: "Occasional news, no spam. Unsubscribe any time.",
    email: "Your email",
    submit: "Subscribe",
    success: "Thanks — please check your inbox.",
    error: "Could not subscribe. Please try again.",
  },
  footer: {
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    license: "Licence no.",
    vat: "VAT",
  },
  sticky: { cta: "Get in touch", book: "Book now" },
  chat: { whatsapp: "Chat on WhatsApp", viber: "Chat on Viber" },
  cookies: {
    text: "We use cookies for analytics only after you agree. See our privacy policy.",
    accept: "Accept",
    decline: "Decline",
    learnMore: "Privacy policy",
  },
  promo: { dismiss: "Dismiss", days: "d", hours: "h", minutes: "m", seconds: "s" },
  comingSoon: {
    title: "Something new is on the way",
    body: "Our website is almost ready. Leave your details and we will let you know the moment it goes live.",
    contact: "In the meantime you can reach us at",
  },
  menuPage: {
    kicker: "Menu",
    title: "Our menu",
    intro: "Prices include VAT. Please tell us about any allergies.",
    downloadPdf: "Download the menu (PDF)",
    backHome: "Back to home",
  },
  legal: {
    backHome: "Back to home",
    updated: "Last updated",
  },
  notFound: {
    title: "Page not found",
    body: "The page you are looking for does not exist or has moved.",
    backHome: "Back to home",
  },
};

export default en;
