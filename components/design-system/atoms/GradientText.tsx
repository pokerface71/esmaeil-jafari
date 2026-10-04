import React from "react";
import { cn } from "lib/utils";

export interface GradientTextProps {
  children: React.ReactNode;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  className?: string;
}

/**
 * Atom: animated brand-gradient text. Wraps the `.gradient-text` utility.
 */
export const GradientText: React.FC<GradientTextProps> = ({
  as: Tag = "span",
  children,
  className
}) => <Tag className={cn("gradient-text", className)}>{children}</Tag>;
