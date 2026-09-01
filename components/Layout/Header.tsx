import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "lib/utils";
import { useTheme } from "components/ThemeProvider";
import { useI18n, Locale } from "lib/i18n";
const locales: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "fa", label: "فارسی", flag: "🇮🇷" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
];

export default function Header() {
  const router = useRouter();
  const scrollParam = (router.query.scroll as string) || "home";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t, dir } = useI18n();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const _navItems = [
    { href: "/?scroll=home", label: t("nav.home"), key: "home" },
    { href: "/?scroll=about", label: t("nav.about"), key: "about" },
    { href: "/?scroll=skills", label: t("nav.skills"), key: "skills" },
    { href: "/?scroll=experience", label: t("nav.experience"), key: "experience" },
    { href: "/?scroll=contact", label: t("nav.contact"), key: "contact" },
  ];
  const navItems = mounted && dir === "rtl" ? [..._navItems].reverse() : _navItems;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = () => setIsLangOpen(false);
    if (isLangOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isLangOpen]);

  const isActive = (key: string) => scrollParam === key;

  const currentLocale = locales.find((l) => l.code === locale) || locales[0];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 z-50 w-full transition-all duration-500 backdrop-blur-xl",
          isScrolled
            ? "bg-background/80 py-3 shadow-lg shadow-black/20 border-b border-white/5"
            : "py-4 bg-background/40"
        )}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl overflow-hidden transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src="/netliheart.svg"
                    width={40}
                    height={40}
                    alt="Logo"
                    className="w-full h-full"
                  />
                </div>
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center gap-1">
                {navItems.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                        isActive(item.key)
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {isActive(item.key) && (
                        <span className="absolute inset-0 rounded-lg bg-indigo-500/10 backdrop-blur-sm border border-indigo-500/20" />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Actions */}
            <div className={cn("flex items-center gap-3", dir === "rtl" && "flex-row-reverse")}>
              {/* Language Switcher - Minimal Flag */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLangOpen(!isLangOpen);
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-lg transition-all duration-300 hover:scale-110"
                  aria-label="Switch language"
                >
                  {currentLocale.flag}
                </button>

                {/* Language Dropdown */}
                <div
                  className={cn(
                    "absolute top-full mt-2 glass-card rounded-xl p-1.5 min-w-0 transition-all duration-300 z-50",
                    dir === "rtl" ? "right-0" : "left-0",
                    isLangOpen
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 scale-95 pointer-events-none"
                  )}
                >
                  {locales.map((loc) => (
                    <button
                      key={loc.code}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLocale(loc.code);
                        setIsLangOpen(false);
                      }}
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-lg transition-all duration-200",
                        locale === loc.code
                          ? "bg-indigo-500/15 ring-1 ring-indigo-500/30"
                          : "hover:bg-white/10"
                      )}
                    >
                      {loc.flag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/10"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2 rounded-lg glass-light hover:bg-white/10 transition-all duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span
                    className={cn(
                      "w-full h-0.5 bg-foreground rounded-full transition-all duration-300 origin-center",
                      isMenuOpen && "rotate-45 translate-y-[7px]"
                    )}
                  />
                  <span
                    className={cn(
                      "w-full h-0.5 bg-foreground rounded-full transition-all duration-300",
                      isMenuOpen && "opacity-0 scale-x-0"
                    )}
                  />
                  <span
                    className={cn(
                      "w-full h-0.5 bg-foreground rounded-full transition-all duration-300 origin-center",
                      isMenuOpen && "-rotate-45 -translate-y-[7px]"
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 top-0 z-40 transition-all duration-500 md:hidden",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />            {/* Menu Panel */}
        <div
          className={cn(
            "absolute top-0 h-full glass p-6 pt-20 transition-transform duration-500 ease-out w-64 sm:w-72",
            dir === "rtl" ? "left-0" : "right-0",
            isMenuOpen ? "translate-x-0" : dir === "rtl" ? "-translate-x-full" : "translate-x-full"
          )}
        >
          {/* Mobile Language Switcher - Minimal Flags */}
          <div className={cn("mb-6 flex justify-center gap-3", dir === "rtl" && "flex-row-reverse")}>
            {locales.map((loc) => (
              <button
                key={loc.code}
                onClick={() => setLocale(loc.code)}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all duration-200",
                  locale === loc.code
                    ? "bg-indigo-500/15 ring-1 ring-indigo-500/30 scale-110"
                    : "hover:bg-white/10"
                )}
              >
                {loc.flag}
              </button>
            ))}
          </div>

          <nav>
            <ul className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <li
                  key={item.key}
                  className="transition-all duration-500"
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 80}ms` : "0ms",
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? "translateX(0)" : dir === "rtl" ? "translateX(-20px)" : "translateX(20px)",
                  }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-300",
                      isActive(item.key)
                        ? "text-foreground bg-indigo-500/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5",
                      dir === "rtl" && "flex-row-reverse"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {isActive(item.key) && (
                      <span className={cn("w-1 h-6 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500", dir === "rtl" ? "mr-3" : "ml-3")} />
                    )}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Download CV */}
          <div
            className="mt-8 transition-all duration-500"
            style={{
              transitionDelay: isMenuOpen ? "400ms" : "0ms",
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen ? "translateX(0)" : dir === "rtl" ? "translateX(-20px)" : "translateX(20px)",
            }}
          >
            <Link
              href="/Esmaeil_jafari-Resume.pdf"
              download
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {locale === "fa" ? "دانلود رزومه" : locale === "ar" ? "تحميل السيرة الذاتية" : locale === "tr" ? "CV İndir" : "Download CV"}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
