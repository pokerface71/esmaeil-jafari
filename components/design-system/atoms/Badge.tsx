import React from "react";
import { cn } from "lib/utils";

export interface BadgeProps {
  children: React.ReactNode;
  /** `dot` renders a small status dot in front of the label. */
  dot?: "primary" | "success" | "muted";
  className?: string;
}

const dotClass: Record<NonNullable<BadgeProps["dot"]>, string> = {
  primary: "bg-violet-300",
  success: "bg-emerald-400",
  muted: "bg-muted-foreground/50",
};

/**
 * Atom: small pill label. Used for availability badges and metadata chips.
 */
export const Badge: React.FC<BadgeProps> = ({ children, dot, className }) => (
  <span
    className={cn(
      "inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-light border border-white/10 text-xs font-medium tracking-[0.14em] text-indigo-200/90",
      className
    )}
  >
    {dot && (
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 bg-inherit" />
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", dotClass[dot])} />
      </span>
    )}
    {children}
  </span>
);
