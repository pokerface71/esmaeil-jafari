import React from "react";
import { IconType } from "react-icons";

interface SkillCardProps {
  Icon: IconType;
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
      className={`group flex flex-col items-center p-6 neu-flat rounded-xl neu-hover transition-all duration-300 ${
        isVisible ? "animate-scale-in" : "opacity-0 scale-90"
      }`}
      id={id}
      style={{ animationDelay: delay }}
    >
      <Icon
        size={48}
        className={`${
          isCustom
            ? "mb-4 group-hover:opacity-80 transition-opacity duration-300"
            : `text-${color} mb-4 group-hover:text-${color
                .replace("600", "500")
                .replace("500", "400")
                .replace(
                  "400",
                  "300"
                )} transition-all duration-300 group-hover:scale-125 transform`
        }`}
      />
      <span
        className={`text-lg font-medium text-foreground ${
          isCustom
            ? "group-hover:text-blue-600"
            : `group-hover:text-${color}`
        } transition-colors duration-300`}
      >
        {name}
      </span>
    </div>
  );
};

export default SkillCard;
