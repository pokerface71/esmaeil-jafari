import React from "react";
import {
  DiBootstrap,
  DiCss3,
  DiGit,
  DiHtml5,
  DiJavascript1,
  DiNodejs,
  DiReact,
  DiSass,
  DiWordpress,
} from "react-icons/di";
import {
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

interface MarqueeItem {
  Icon: React.ComponentType<{ size?: string | number; className?: string }>;
  name: string;
  className: string;
}

const items: MarqueeItem[] = [
  { Icon: DiHtml5, name: "HTML5", className: "text-orange-400" },
  { Icon: DiCss3, name: "CSS3", className: "text-blue-400" },
  { Icon: DiSass, name: "SASS", className: "text-pink-400" },
  { Icon: DiJavascript1, name: "JavaScript", className: "text-yellow-300" },
  { Icon: DiReact, name: "React", className: "text-cyan-400" },
  { Icon: SiNextdotjs, name: "Next.js", className: "text-slate-200" },
  { Icon: SiTypescript, name: "TypeScript", className: "text-blue-300" },
  { Icon: SiTailwindcss, name: "Tailwind CSS", className: "text-sky-300" },
  { Icon: SiRedux, name: "Redux", className: "text-purple-400" },
  { Icon: DiNodejs, name: "Node.js", className: "text-green-400" },
  { Icon: DiGit, name: "Git", className: "text-orange-300" },
  { Icon: DiBootstrap, name: "Bootstrap", className: "text-violet-400" },
  { Icon: DiWordpress, name: "WordPress", className: "text-blue-300" },
];

const Group: React.FC<{ ariaHidden?: boolean }> = ({ ariaHidden }) => (
  <div className="marquee-group" aria-hidden={ariaHidden}>
    {items.map(({ Icon, name, className }) => (
      <span
        key={name}
        className="inline-flex items-center gap-2.5 px-7 py-2 text-sm text-muted-foreground/80 whitespace-nowrap"
      >
        <Icon size={18} className={className} />
        <span className="font-medium tracking-wide">{name}</span>
        <span className="ms-6 text-violet-500/50 text-xs select-none">✦</span>
      </span>
    ))}
  </div>
);

/**
 * Infinite tech ticker inspired by Vengeance UI's marquee rows.
 * Duplicated groups give a seamless loop; pauses on hover.
 */
const TechMarquee: React.FC = () => {
  return (
    <div className="marquee" role="presentation">
      <div
        className="marquee-track"
        style={{ "--marquee-duration": "38s" } as React.CSSProperties}
      >
        <Group />
        <Group ariaHidden />
      </div>
    </div>
  );
};

export default TechMarquee;
