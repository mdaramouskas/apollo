"use client";

import { useLang } from "@/lib/i18n";
import { site } from "../../site.config";

/** WhatsApp / Viber buttons (INT-09). Numbers from brand.whatsapp / brand.viber (digits only). */
export default function ChatButtons() {
  const { t } = useLang();
  const { whatsapp, viber } = site.brand;
  if (!whatsapp && !viber) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
      {whatsapp && (
        <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label={t.chat.whatsapp} title={t.chat.whatsapp} className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.1.6 2.5.5a2.3 2.3 0 0 0 1.6-1.1c.2-.5.2-1 .1-1.1l-.2-.1z" /></svg>
        </a>
      )}
      {viber && (
        <a href={`viber://chat?number=%2B${viber}`} aria-label={t.chat.viber} title={t.chat.viber} className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7360F2] text-white shadow-lg transition-transform hover:scale-105">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>
        </a>
      )}
    </div>
  );
}
