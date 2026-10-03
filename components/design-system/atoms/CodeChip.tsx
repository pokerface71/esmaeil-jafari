import React from "react";
import { cn } from "lib/utils";

export interface CodeChipProps {
  children: React.ReactNode;
  /** Optional mono number rendered before the label (e.g. section index). */
  num?: string;
  className?: string;
}

/**
 * Atom: mono uppercase label pill used on section headers.
 * Visuals come from the `.code-chip` design-system utility.
 */
export const CodeChip: React.FC<CodeChipProps> = ({ children, num, className }) => (
  <span className={cn("code-chip", className)}>
    {num && <span className="code-chip-num">{num}</span>}
    {children}
  </span>
);
