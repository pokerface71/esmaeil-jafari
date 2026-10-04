"use client";
import React, { useState, useEffect } from "react";
import { cn } from "lib/utils";
import { useI18n, type Locale } from "lib/i18n";

export interface LanguageSwitcherProps {
  className?: string;
}

const locales: { code: Locale; flag: string; name: string }[] = [
  { code: "en", flag: "🇺🇸", name: "English" },
  { code: "fa", flag: "🇮🇷", name: "فارسی" },
  { code: "ar", flag: "🇸🇦", name: "العربية" },
  { code: "tr", flag: "🇹🇷", name: "Türkçe" }
];

/**
 * Molecule: flag dropdown for switching UI language.
 * RTL-aware positioning and outside-click close.
 */
export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className
}) => {
  const { locale, setLocale, dir } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const close = () => setIsOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [isOpen]);

  const current = locales.find((l) => l.code === locale) ?? locales[0];

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="w-8 h-8 rounded-full flex items-center justify-center text-lg transition-all duration-300 hover:scale-110"
        aria-label="Switch language"
        aria-expanded={isOpen}
      >
        {current.flag}
      </button>

      <div
        className={cn(
          "absolute top-full mt-2 glass-card rounded-xl p-1.5 transition-all duration-300 z-50",
          dir === "rtl" ? "right-0" : "left-0",
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        {locales.map((loc) => (
          <button
            key={loc.code}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLocale(loc.code);
              setIsOpen(false);
            }}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-lg transition-all duration-200",
              locale === loc.code
                ? "bg-indigo-500/15 ring-1 ring-indigo-500/30"
                : "hover:bg-white/10"
            )}
            aria-label={loc.name}
            aria-pressed={locale === loc.code}
          >
            {loc.flag}
          </button>
        ))}
      </div>
    </div>
  );
};
