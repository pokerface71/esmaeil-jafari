import React from "react";

interface SkillCardProps {
  Icon: React.ComponentType<{ size?: string | number; className?: string }>;
  name: string;
  color: string;
  delay: string;
  isCustom?: boolean;
  isVisible: boolean;
  id: string;
}

const SkillCard: React.FC<SkillCardProps> = ({
  Icon,
  name,
  color,
  delay,
  isCustom = false,
  isVisible,
  id,
}) => {
  return (
    <div
      data-animate={id}
      className={`group relative flex flex-col items-center p-5 rounded-2xl glass-card cursor-default ${
        isVisible ? "animate-scale-in" : "opacity-0 scale-90"
      }`}
      id={id}
      style={{ animationDelay: delay }}
    >
      {/* Gradient background on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Icon container */}
      <div className="relative mb-3">
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${
            isCustom
              ? "bg-blue-500/10"
              : `bg-${color}/10`
          }`}
        >
          <Icon
            size={32}
            className={`${
              isCustom
                ? "text-blue-400 group-hover:text-blue-300"
                : `text-${color} group-hover:scale-110`
            } transition-all duration-300`}
          />
        </div>
        {/* Glow effect */}
        <div
          className={`absolute inset-0 rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${
            isCustom ? "bg-blue-500" : `bg-${color}`
          }`}
        />
      </div>

      {/* Name */}
      <span className="relative text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
        {name}
      </span>
    </div>
  );
};

export default SkillCard;
