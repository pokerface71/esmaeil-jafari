import React from "react";
import { cn } from "lib/utils";

export interface SkillTagProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Atom: mono tech-tag chip. Wraps the `.skill-tag` design-system utility.
 */
export const SkillTag: React.FC<SkillTagProps> = ({ children, className }) => (
  <span className={cn("skill-tag", className)}>{children}</span>
);
