/**
 * Shared WhatsApp + Telegram community channel buttons.
 *
 * Used by Home, About and the Contact Us card. Captions stay page-specific
 * (each page frames the invite in its own voice) — only the buttons live
 * here so the icons, labels and safety attributes never drift apart.
 * Both links open in a new tab with rel="noopener noreferrer" and carry
 * descriptive aria-labels for screen readers.
 */

export const WHATSAPP_URL = "https://chat.whatsapp.com/F1cm6DYGOTn4PV7JhsTjzk";
export const TELEGRAM_URL = "https://t.me/+xbzQdw9PUk5hNWRk";

const WHATSAPP_ICON = (
  <svg
    viewBox="0 0 448 512"
    className="h-5 w-5 shrink-0 text-ms-blue"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
  </svg>
);

const TELEGRAM_ICON = (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5 shrink-0 text-ms-blue"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
  </svg>
);

const CHANNELS = [
  {
    label: "WhatsApp Group",
    href: WHATSAPP_URL,
    ariaLabel:
      "Join the Power Query Guide WhatsApp group to ask Power Query questions (opens in a new tab)",
    icon: WHATSAPP_ICON,
  },
  {
    label: "Telegram Channel",
    href: TELEGRAM_URL,
    ariaLabel:
      "Join the Power Query Guide Telegram channel to ask Power Query questions (opens in a new tab)",
    icon: TELEGRAM_ICON,
  },
];

/** The two community channel buttons — drop into any page-specific caption. */
export function CommunityChannels({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {CHANNELS.map((channel) => (
        <a
          key={channel.href}
          href={channel.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={channel.ariaLabel}
          className="inline-flex items-center gap-2.5 rounded-lg border border-ms-blue/30 bg-white px-4 py-2.5 text-sm font-semibold text-ms-gray shadow-xs transition-colors hover:border-ms-blue/60 hover:bg-ms-blue-light hover:text-ms-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ms-blue focus-visible:ring-offset-2"
        >
          {channel.icon}
          {channel.label}
        </a>
      ))}
    </div>
  );
}
