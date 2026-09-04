import { STUDIO } from "../data/studio";

type SocialLinksProps = {
  className?: string;
  iconClass?: string;
  compact?: boolean;
};

export default function SocialLinks({
  className = "",
  iconClass = "w-5 h-5",
  compact = false,
}: SocialLinksProps) {
  const items = [
    {
      href: STUDIO.socials.tiktok,
      label: "TikTok",
      icon: (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M14.5 3h2.02a6.5 6.5 0 0 0 5.48 5.4v2.16A8.48 8.48 0 0 1 16.9 8.4v8.22A6.63 6.63 0 1 1 8.8 10.3v2.2a4.43 4.43 0 1 0 3.07 4.22V3h2.63Z" />
        </svg>
      ),
    },
    {
      href: STUDIO.socials.instagram,
      label: "Instagram",
      icon: (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      href: STUDIO.socials.telegram,
      label: "Telegram",
      icon: (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M21.5 4.4 18.7 20c-.2 1-1.2 1.4-2 .9l-5-3.8-2.6 2.5c-.3.3-.8.1-.9-.3l-.6-5.3L3 11.4c-1-.3-.9-1.7.2-2l17.2-5.3c1-.3 1.9.6 1.1 2.3Z" />
        </svg>
      ),
    },
  ];

  const sizeClass = compact
    ? "w-8 h-8"
    : "w-10 h-10";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          aria-label={item.label}
          className={`social-link inline-flex items-center justify-center ${sizeClass} rounded-full transition-transform hover:-translate-y-0.5`}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}
