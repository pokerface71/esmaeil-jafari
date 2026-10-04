import React from "react";
import { cn } from "lib/utils";

export interface GlassCardProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "ref"
> {
  /** Enables the `.spot-card` cursor-following radial glow. */
  spotlight?: boolean;
  /** Renders as a `<section>` instead of `<div>`. */
  as?: "div" | "section" | "article" | "li";
}

/**
 * Atom: frosted-glass surface. Wraps the `.glass-card` design-system
 * utility and optionally the `.spot-card` cursor glow.
 */
export const GlassCard: React.FC<GlassCardProps> = ({
  spotlight = false,
  as: Tag = "div",
  className,
  children,
  ...props
}) => (
  <Tag
    data-spot={spotlight || undefined}
    className={cn("glass-card", spotlight && "spot-card", className)}
    {...props}
  >
    {children}
  </Tag>
);
