import React from "react";
import { cn } from "lib/utils";

export interface IconBoxProps {
  icon: React.ReactNode;
  /** Token-driven color scheme: `violet | fuchsia | sky | amber | green | blue | pink`. */
  tone?: "violet" | "fuchsia" | "sky" | "amber" | "green" | "blue" | "pink";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const tones: Record<NonNullable<IconBoxProps["tone"]>, string> = {
  violet: "bg-violet-500/15 border-violet-400/20 text-violet-300",
  fuchsia: "bg-fuchsia-500/15 border-fuchsia-400/20 text-fuchsia-300",
  sky: "bg-sky-500/15 border-sky-400/20 text-sky-300",
  amber: "bg-amber-400/10 border-amber-300/25 text-amber-300",
  green: "bg-green-500/15 border-green-400/20 text-green-300",
  blue: "bg-blue-500/15 border-blue-400/20 text-blue-300",
  pink: "bg-pink-500/15 border-pink-400/20 text-pink-300"
};

const sizes: Record<NonNullable<IconBoxProps["size"]>, string> = {
  sm: "h-8 w-8 rounded-lg [&_svg]:w-3.5 [&_svg]:h-3.5",
  md: "h-11 w-11 rounded-xl [&_svg]:w-[17px] [&_svg]:h-[17px]",
  lg: "h-14 w-14 rounded-2xl [&_svg]:w-6 [&_svg]:h-6"
};

/**
 * Atom: tinted square container for a single icon — the repeated
 * icon-in-tinted-tile pattern used across stats, contact and social cards.
 */
export const IconBox: React.FC<IconBoxProps> = ({
  icon,
  tone = "violet",
  size = "md",
  className
}) => (
  <span
    className={cn(
      "inline-flex items-center justify-center border flex-shrink-0 transition-transform duration-300",
      tones[tone],
      sizes[size],
      className
    )}
  >
    {icon}
  </span>
);
