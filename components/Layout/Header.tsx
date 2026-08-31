import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "lib/utils";
import { useTheme } from "components/ThemeProvider";

const navItems = [
  { href: "/?scroll=home", label: "Home", key: "home" },
  { href: "/?scroll=about", label: "About", key: "about" },
  { href: "/?scroll=skills", label: "Skills", key: "skills" },
  { href: "/?scroll=experience", label: "Experience", key: "experience" },
  { href: "/?scroll=contact", label: "Contact", key: "contact" },
];

export default function Header() {
  const router = useRouter();
  const currentPath = router.asPath;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (key: string) => currentPath.includes(key);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 z-50 w-full transition-all duration-500",
          isScrolled
            ? "glass py-3 shadow-lg shadow-black/20"
            : "py-4 bg-transparent"
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
                          ? "text-white"
                          : "text-gray-400 hover:text-white"
                      )}
                    >
                      {isActive(item.key) && (
                        <span className="absolute inset-0 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10" />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl transition-all duration-300 hover:bg-white/10"
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

              {/* Download CV Button */}
              <Link
                href="/Esmaeil_jafari-Resume.pdf"
                download
                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white relative overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_100%] group-hover:animate-[gradient-shift_2s_ease_infinite]" />
                <span className="relative z-10 flex items-center gap-2">
                  Download CV
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
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
                </span>
              </Link>

              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="md:hidden p-2 rounded-lg glass-light hover:bg-white/10 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
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
                      "w-full h-0.5 bg-white rounded-full transition-all duration-300 origin-center",
                      isMenuOpen && "rotate-45 translate-y-[7px]"
                    )}
                  />
                  <span
                    className={cn(
                      "w-full h-0.5 bg-white rounded-full transition-all duration-300",
                      isMenuOpen && "opacity-0 scale-x-0"
                    )}
                  />
                  <span
                    className={cn(
                      "w-full h-0.5 bg-white rounded-full transition-all duration-300 origin-center",
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
        />

        {/* Menu Panel */}
        <div
          className={cn(
            "absolute top-0 right-0 w-72 h-full glass p-8 pt-24 transition-transform duration-500 ease-out",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <nav>
            <ul className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <li
                  key={item.key}
                  className="transition-all duration-500"
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 80}ms` : "0ms",
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? "translateX(0)" : "translateX(20px)",
                  }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-300",
                      isActive(item.key)
                        ? "text-white bg-white/10"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {isActive(item.key) && (
                      <span className="w-1 h-6 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500 mr-3" />
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
              transform: isMenuOpen ? "translateX(0)" : "translateX(20px)",
            }}
          >
            <Link
              href="/Esmaeil_jafari-Resume.pdf"
              download
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Download CV
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
