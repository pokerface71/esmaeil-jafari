import React from "react";
import { cn } from "lib/utils";
import { IconBox } from "components/design-system/atoms";

export interface ContactInfoItemProps {
  icon: React.ReactNode;
  /** Small uppercase category label (e.g. "Email"). */
  category: string;
  /** Main value (e.g. the email address). */
  value: string;
  tone?: "violet" | "fuchsia" | "sky" | "amber" | "green" | "blue" | "pink";
  className?: string;
}

/**
 * Molecule: icon + category + value row used inside the contact info card.
 */
export const ContactInfoItem: React.FC<ContactInfoItemProps> = ({
  icon,
  category,
  value,
  tone = "violet",
  className
}) => (
  <div
    className={cn(
      "group flex items-center gap-4 rounded-2xl border border-transparent p-2 -m-2 transition-all duration-300 hover:border-white/[0.06] hover:bg-white/[0.03]",
      className
    )}
  >
    <IconBox
      icon={icon}
      tone={tone}
      size="md"
      className="group-hover:scale-110"
    />
    <div className="min-w-0">
      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 mb-0.5">
        {category}
      </p>
      <p className="text-sm font-medium text-foreground truncate">{value}</p>
    </div>
  </div>
);
