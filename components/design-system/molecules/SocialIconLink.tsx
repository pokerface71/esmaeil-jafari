import React from "react";
import { cn } from "lib/utils";
import { IconBox } from "components/design-system/atoms";

export interface SocialIconLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  /** Hover accent classes, e.g. "hover:text-blue-400 hover:border-blue-400/40". */
  hoverColor?: string;
  size?: number;
  className?: string;
}

/**
 * Molecule: round glass icon link used in the hero social row and footer.
 */
export const SocialIconLink: React.FC<SocialIconLinkProps> = ({
  href,
  label,
  icon,
  hoverColor,
  size = 44,
  className,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    style={{ width: size, height: size }}
    className={cn(
      "rounded-xl glass-light flex items-center justify-center text-muted-foreground border border-white/10 transition-all duration-300 hover:scale-110 hover:shadow-xl",
      hoverColor,
      className
    )}
  >
    {icon}
  </a>
);

export interface SocialListRowProps {
  href: string;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
  tone?: "violet" | "fuchsia" | "sky" | "amber" | "green" | "blue" | "pink";
  className?: string;
}

const rowTones: Record<NonNullable<SocialListRowProps["tone"]>, string> = {
  violet: "bg-violet-500/10 border-violet-400/20 text-violet-300",
  fuchsia: "bg-fuchsia-500/10 border-fuchsia-400/20 text-fuchsia-300",
  sky: "bg-sky-500/10 border-sky-400/20 text-sky-300",
  amber: "bg-amber-400/10 border-amber-300/25 text-amber-300",
  green: "bg-green-500/10 border-green-400/20 text-green-400",
  blue: "bg-blue-500/10 border-blue-400/20 text-blue-400",
  pink: "bg-pink-500/10 border-pink-400/20 text-pink-400",
};

/**
 * Molecule: full-width glass row link (icon box, label + sublabel, arrow)
 * used in the contact section's "connect with me" card.
 */
export const SocialListRow: React.FC<SocialListRowProps> = ({
  href,
  label,
  sublabel,
  icon,
  tone = "violet",
  className,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      "flex items-center gap-4 p-3 rounded-2xl border border-transparent hover:border-white/[0.07] hover:bg-white/[0.03] transition-all duration-300 group",
      className
    )}
  >
    <IconBox
      icon={icon}
      tone={tone}
      className={cn("h-11 w-11 rounded-xl border", rowTones[tone])}
    />
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-foreground">{label}</p>
      {sublabel && <p className="text-xs text-muted-foreground truncate">{sublabel}</p>}
    </div>
    <svg
      className="w-3 h-3 text-muted-foreground/30 group-hover:text-muted-foreground group-hover:translate-x-1 transition-all duration-300 shrink-0 rtl:rotate-180"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </a>
);
