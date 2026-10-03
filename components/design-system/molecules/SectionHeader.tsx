import React from "react";
import { cn } from "lib/utils";
import { CodeChip, GradientText } from "components/design-system/atoms";

export interface SectionHeaderProps {
  /** Mono chip label above the title. */
  chip: string;
  /** Section index rendered inside the chip and as the ghost number. */
  num?: string;
  /** First (plain) part of the title. */
  title: string;
  /** Gradient-highlighted part of the title. */
  highlight?: string;
  /** Optional sub-paragraph below the title. */
  subtitle?: string;
  /** Parallax speed for the ghost number (`data-parallax`). */
  parallaxSpeed?: number;
  className?: string;
}

/**
 * Molecule: numbered section header — ghost background number, mono chip,
 * bold two-tone title and optional subtitle. Composes CodeChip + GradientText.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  chip,
  num,
  title,
  highlight,
  subtitle,
  parallaxSpeed,
  className,
}) => (
  <div className={cn("relative text-center mb-16", className)}>
    {num && (
      <span aria-hidden="true" data-parallax={parallaxSpeed} className="ghost-num">
        {num}
      </span>
    )}
    <CodeChip num={num} className="mb-6 inline-flex">
      {chip}
    </CodeChip>
    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.06]">
      {title}{" "}
      {highlight && <GradientText>{highlight}</GradientText>}
    </h2>
    {subtitle && (
      <p className="mt-5 text-muted-foreground/70 max-w-md mx-auto">{subtitle}</p>
    )}
  </div>
);
