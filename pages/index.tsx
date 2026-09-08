import MuiIcon from "@components/Icons/MuiIcon";
import Footer from "@components/Layout/Footer";
import Header from "@components/Layout/Header";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  DiBootstrap,
  DiCss3,
  DiGit,
  DiHtml5,
  DiJavascript1,
  DiNodejs,
  DiPhotoshop,
  DiReact,
  DiSass,
  DiWordpress
} from "react-icons/di";
import {
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaWhatsapp,
  FaCalendarAlt,
  FaCode,
  FaRocket,
  FaGlobe,
  FaBolt,
  FaArrowRight
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiTypescript
} from "react-icons/si";
import AuroraBackground from "@components/Layout/AuroraBackground";
import AnimatedRays from "@components/Layout/AnimatedRays";
import TechMarquee from "@components/Layout/TechMarquee";
import ScrollProgress from "@components/Layout/ScrollProgress";
import BackToTop from "@components/Layout/BackToTop";
import AstronautFly from "@components/Layout/AstronautFly";
import SkillCard from "@components/SkillCard";
import { useI18n, experienceTranslations } from "lib/i18n";
import { cn } from "lib/utils";
import ProfileImage from "../assets/Images/esmaeiljafari.jpg";
interface ScrollRefs {
  home: React.RefObject<HTMLDivElement | null>;
  about: React.RefObject<HTMLDivElement | null>;
  skills: React.RefObject<HTMLDivElement | null>;
  experience: React.RefObject<HTMLDivElement | null>;
  contact: React.RefObject<HTMLDivElement | null>;
}

const skills = [
  {
    Icon: DiHtml5,
    name: "HTML5",
    color: "text-orange-400",
    tile: "bg-orange-500/10",
    glow: "bg-orange-500",
    ring: "border-orange-400/25",
    delay: "0.05s"
  },
  {
    Icon: DiCss3,
    name: "CSS3",
    color: "text-blue-400",
    tile: "bg-blue-500/10",
    glow: "bg-blue-500",
    ring: "border-blue-400/25",
    delay: "0.1s"
  },
  {
    Icon: DiSass,
    name: "SASS",
    color: "text-pink-400",
    tile: "bg-pink-500/10",
    glow: "bg-pink-500",
    ring: "border-pink-400/25",
    delay: "0.15s"
  },
  {
    Icon: DiJavascript1,
    name: "JavaScript",
    color: "text-yellow-300",
    tile: "bg-yellow-400/10",
    glow: "bg-yellow-400",
    ring: "border-yellow-300/25",
    delay: "0.2s"
  },
  {
    Icon: DiReact,
    name: "React",
    color: "text-cyan-400",
    tile: "bg-cyan-500/10",
    glow: "bg-cyan-400",
    ring: "border-cyan-400/25",
    delay: "0.25s"
  },
  {
    Icon: SiNextdotjs,
    name: "Next.js",
    color: "text-slate-200",
    tile: "bg-slate-400/10",
    glow: "bg-slate-300",
    ring: "border-slate-300/20",
    delay: "0.3s"
  },
  {
    Icon: SiTypescript,
    name: "TypeScript",
    color: "text-blue-300",
    tile: "bg-blue-400/10",
    glow: "bg-blue-400",
    ring: "border-blue-300/25",
    delay: "0.35s"
  },
  {
    Icon: SiTailwindcss,
    name: "Tailwind",
    color: "text-sky-300",
    tile: "bg-sky-400/10",
    glow: "bg-sky-400",
    ring: "border-sky-300/25",
    delay: "0.4s"
  },
  {
    Icon: SiRedux,
    name: "Redux",
    color: "text-purple-400",
    tile: "bg-purple-500/10",
    glow: "bg-purple-500",
    ring: "border-purple-400/25",
    delay: "0.45s"
  },
  {
    Icon: DiNodejs,
    name: "Node.js",
    color: "text-green-400",
    tile: "bg-green-500/10",
    glow: "bg-green-500",
    ring: "border-green-400/25",
    delay: "0.5s"
  },
  {
    Icon: DiGit,
    name: "Git",
    color: "text-orange-400",
    tile: "bg-orange-400/10",
    glow: "bg-orange-400",
    ring: "border-orange-300/25",
    delay: "0.55s"
  },
  {
    Icon: DiBootstrap,
    name: "Bootstrap",
    color: "text-violet-400",
    tile: "bg-violet-500/10",
    glow: "bg-violet-500",
    ring: "border-violet-400/25",
    delay: "0.6s"
  },
  {
    Icon: DiWordpress,
    name: "WordPress",
    color: "text-blue-400",
    tile: "bg-blue-400/10",
    glow: "bg-blue-400",
    ring: "border-blue-300/25",
    delay: "0.65s"
  },
  {
    Icon: DiPhotoshop,
    name: "Photoshop",
    color: "text-sky-400",
    tile: "bg-sky-400/10",
    glow: "bg-sky-400",
    ring: "border-sky-300/25",
    delay: "0.7s"
  },
  {
    Icon: MuiIcon,
    name: "MUI",
    color: "text-blue-400",
    tile: "bg-blue-500/10",
    glow: "bg-blue-500",
    ring: "border-blue-400/25",
    delay: "0.75s"
  }
];

const Home: React.FC = () => {
  const router = useRouter();
  const scroll = router.query.scroll as string;
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const { t, locale, dir } = useI18n();

  // Get experiences for current locale
  const experiences =
    experienceTranslations[locale] || experienceTranslations.en;

  const refs: ScrollRefs = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null)
  };

  useEffect(() => {
    const scrollOptions: ScrollIntoViewOptions = {
      behavior: "smooth",
      block: "start"
    };

    if (scroll === "experience" && refs.experience.current) {
      refs.experience.current.scrollIntoView(scrollOptions);
    } else if (scroll === "about" && refs.about.current) {
      refs.about.current.scrollIntoView(scrollOptions);
    } else if (scroll === "skills" && refs.skills.current) {
      refs.skills.current.scrollIntoView(scrollOptions);
    } else if (scroll === "contact" && refs.contact.current) {
      refs.contact.current.scrollIntoView(scrollOptions);
    } else if (refs.home.current) {
      refs.home.current.scrollIntoView(scrollOptions);
    }
  }, [scroll]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Single delegated listener driving every .spot-card's cursor glow
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.(
        "[data-spot]"
      ) as HTMLElement | null;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      target.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  // Subtle 3D tilt + glare on the hero portrait, following the cursor
  useEffect(() => {
    const el = document.querySelector("[data-tilt]") as HTMLElement | null;
    if (
      !el ||
      typeof window.matchMedia !== "function" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    let raf = 0;
    let running = false;
    let hovered = false;

    const apply = () => {
      running = false;
      const rx = Number(el.dataset.tx ?? 0);
      const ry = Number(el.dataset.ty ?? 0);
      el.style.transform = `perspective(950px) rotateY(${rx}deg) rotateX(${ry}deg) scale3d(1.035, 1.035, 1)`;
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const inside = px >= -0.15 && px <= 1.15 && py >= -0.15 && py <= 1.15;

      if (!inside) {
        if (hovered) {
          hovered = false;
          el.classList.remove("is-hover");
          el.dataset.tx = "0";
          el.dataset.ty = "0";
          if (!running) {
            running = true;
            raf = requestAnimationFrame(apply);
          }
        }
        return;
      }

      hovered = true;
      el.classList.add("is-hover");
      el.dataset.tx = String((px - 0.5) * 14);
      el.dataset.ty = String(-(py - 0.5) * 12);
      el.style.setProperty("--tx", `${px * 100}%`);
      el.style.setProperty("--ty", `${py * 100}%`);
      if (!running) {
        running = true;
        raf = requestAnimationFrame(apply);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Subtle scroll parallax: rays glow, ghost numbers & portrait drift at
  // different speeds (positive = lags behind scroll, negative = leads it).
  useEffect(() => {
    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]")
    );
    if (!els.length) return;

    const speeds = els.map((el) => Number(el.dataset.parallax ?? 0));
    const measure = () =>
      els.map((el) => el.getBoundingClientRect().top + window.scrollY);
    let bases = measure();

    // Springy ease-out: each layer chases its target offset with a damped
    // spring, so layers glide and settle instead of sliding rigidly.
    const clampTarget = (v: number) => Math.max(-140, Math.min(140, v));
    const pos = new Array<number>(els.length).fill(0);
    const vel = new Array<number>(els.length).fill(0);
    const stiffness = 85; // spring firmness
    const damping = 2 * Math.sqrt(stiffness) * 0.92; // slightly under-damped

    let raf = 0;
    let running = false;
    let last = performance.now();

    const tick = (now: number) => {
      raf = 0;
      running = false;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      const sy = window.scrollY;
      let active = false;

      els.forEach((el, i) => {
        const target = clampTarget((sy - bases[i]) * speeds[i]);
        const accel = (target - pos[i]) * stiffness - vel[i] * damping;
        vel[i] += accel * dt;
        pos[i] += vel[i] * dt;

        if (Math.abs(target - pos[i]) > 0.05 || Math.abs(vel[i]) > 0.05) {
          active = true;
        }
        el.style.setProperty("--py", `${pos[i].toFixed(2)}px`);
      });

      if (active) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const start = () => {
      last = performance.now();
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onScroll = () => start();
    const onResize = () => {
      bases = measure();
      start();
    };

    start();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="min-h-screen text-foreground">
      <Head>
        <title>Esmaeil Jafari — Frontend Developer</title>
        <meta
          name="description"
          content="Professional portfolio of Esmaeil Jafari — Frontend Developer specializing in React, Next.js, and modern web technologies."
        />
      </Head>

      <Header />
      <ScrollProgress />

      {/* ==================== HERO ==================== */}
      <section
        ref={refs.home}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <AnimatedRays />
        <AuroraBackground variant="hero" />

        {/* Dot + grid texture over the top half */}
        <div className="hero-dots" />
        <div className="hero-grid" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
          <div
            className={cn(
              "flex flex-col lg:flex-row items-center justify-between gap-16",
              dir === "rtl" && "lg:flex-row-reverse"
            )}
          >
            {/* Text Content */}
            <div
              className={cn(
                "flex-1 text-center",
                dir === "rtl" ? "lg:text-right" : "lg:text-left"
              )}
            >
              <div
                data-animate="hero-badge"
                className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-light border border-white/10 mb-7 text-xs font-medium tracking-[0.14em] text-indigo-200/90 ${
                  isVisible["hero-badge"] ? "animate-fade-in-up" : "opacity-0"
                }`}
                id="hero-badge"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {t("hero.badge")}
              </div>

              <p
                data-animate="hero-eyebrow"
                className={`font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-violet-300/70 mb-4 ${
                  isVisible["hero-eyebrow"] ? "animate-fade-in-up" : "opacity-0"
                }`}
                id="hero-eyebrow"
                style={{ animationDelay: "0.05s" }}
              >
                {t("hero.subtitle")}
              </p>

              <h1
                data-animate="hero-title"
                className={`text-5xl sm:text-6xl lg:text-7xl font-black mb-5 tracking-[-0.03em] leading-[1.05] ${
                  isVisible["hero-title"] ? "animate-fade-in-down" : "opacity-0"
                }`}
                id="hero-title"
              >
                {t("hero.title.greeting")}{" "}
                <span className="gradient-text">Esmaeil</span>
                <br className="hidden sm:block" />
                <span className="gradient-text">Jafari</span>
              </h1>

              <p
                data-animate="hero-desc"
                className={`text-base sm:text-lg text-muted-foreground/80 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed ${
                  isVisible["hero-desc"] ? "animate-fade-in-up" : "opacity-0"
                }`}
                id="hero-desc"
                style={{ animationDelay: "0.25s" }}
              >
                {t("hero.desc")}
              </p>

              {/* CTA Buttons */}
              <div
                data-animate="hero-cta"
                className={`flex flex-wrap gap-4 justify-center ${
                  dir === "rtl" ? "lg:justify-end" : "lg:justify-start"
                } ${isVisible["hero-cta"] ? "animate-fade-in-up" : "opacity-0"}`}
                id="hero-cta"
                style={{ animationDelay: "0.4s" }}
              >
                <a
                  href="/?scroll=experience"
                  className="btn-primary inline-flex items-center gap-2.5 rounded-xl px-7 py-3.5 text-sm font-semibold text-white"
                >
                  {t("hero.cta.experience")}
                  <FaArrowRight
                    className={cn("text-xs", dir === "rtl" && "rotate-180")}
                  />
                </a>
                <a
                  href="/?scroll=contact"
                  className="btn-ghost inline-flex items-center gap-2.5 rounded-xl px-7 py-3.5 text-sm font-semibold"
                >
                  {t("hero.cta.contact")}
                </a>
              </div>

              {/* Social Links */}
              <div
                data-animate="hero-social"
                className={`flex gap-3 mt-11 justify-center ${
                  dir === "rtl" ? "lg:justify-end" : "lg:justify-start"
                } ${isVisible["hero-social"] ? "animate-fade-in-up" : "opacity-0"}`}
                id="hero-social"
                style={{ animationDelay: "0.55s" }}
              >
                {[
                  {
                    href: "https://www.linkedin.com/in/esmaeil-jafari1992/",
                    icon: FaLinkedin,
                    color:
                      "hover:text-blue-400 hover:border-blue-400/40 hover:shadow-blue-500/10"
                  },
                  {
                    href: "https://instagram.com/esmaeil_jafari_official",
                    icon: FaInstagram,
                    color:
                      "hover:text-pink-400 hover:border-pink-400/40 hover:shadow-pink-500/10"
                  },
                  {
                    href: "https://api.whatsapp.com/send?phone=989035954105",
                    icon: FaWhatsapp,
                    color:
                      "hover:text-green-400 hover:border-green-400/40 hover:shadow-green-500/10"
                  }
                ].map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-xl glass-light flex items-center justify-center text-muted-foreground border border-white/10 transition-all duration-300 hover:scale-110 hover:shadow-xl ${social.color}`}
                  >
                    <social.icon size={19} />
                  </a>
                ))}
              </div>
            </div>

            {/* Profile Image */}
            <div
              data-animate="hero-image"
              className={`relative shrink-0 ${
                isVisible["hero-image"]
                  ? "animate-scale-in"
                  : "opacity-0 scale-90"
              }`}
              id="hero-image"
              style={{ animationDelay: "0.2s" }}
            >
              {/* Parallax layer — photo, orbit ring & chips drift together */}
              <div data-parallax="-0.04" className="portrait-parallax relative">
                {/* Glow */}
                <div className="profile-glow" />

                {/* Rotating circular text ring */}
                <div className="ring-text" aria-hidden="true">
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <defs>
                      <path
                        id="hero-orbit-text"
                        d="M50,50 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"
                        fill="none"
                      />
                    </defs>
                    <text style={{ fontSize: "6px", letterSpacing: "0.24em" }}>
                      <textPath
                        href="#hero-orbit-text"
                        className="fill-violet-200/70"
                      >
                        ESMAEIL JAFARI • FRONTEND DEVELOPER • REACT • NEXT.JS
                      </textPath>
                    </text>
                  </svg>
                </div>

                {/* Image container (3D cursor tilt + glare) */}
                <div
                  data-tilt
                  className="tilt-card relative w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-[#0b0c15] shadow-[0_0_80px_rgba(129,140,248,0.25)]"
                >
                  <Image
                    src={ProfileImage}
                    alt="Esmaeil Jafari"
                    fill
                    className="rounded-full object-cover"
                    priority
                  />
                </div>

                {/* Floating stats */}
                <div
                  data-spot
                  className={cn(
                    "spot-card absolute -bottom-3 glass-card rounded-2xl px-4 py-3 animate-bounce-in",
                    dir === "rtl" ? "-right-4" : "-left-4"
                  )}
                  style={{ animationDelay: "0.8s" }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/15 text-violet-300">
                      <FaRocket className="text-sm" />
                    </span>
                    <div>
                      <p className="text-[10px] text-muted-foreground">
                        {t("hero.stats.experience")}
                      </p>
                      <p className="text-sm font-bold text-foreground">
                        {t("hero.stats.experience.value")}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  data-spot
                  className={cn(
                    "spot-card absolute -top-3 glass-card rounded-2xl px-4 py-3 animate-bounce-in",
                    dir === "rtl" ? "-left-4" : "-right-4"
                  )}
                  style={{ animationDelay: "1s" }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-fuchsia-500/15 text-fuchsia-300">
                      <FaCode className="text-sm" />
                    </span>
                    <div>
                      <p className="text-[10px] text-muted-foreground">
                        {t("hero.stats.projects")}
                      </p>
                      <p className="text-sm font-bold text-foreground">
                        {t("hero.stats.projects.value")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase">
            {t("hero.scroll")}
          </span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-violet-300/80 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ==================== TECH MARQUEE ==================== */}
      <div className="relative border-y border-white/[0.06] bg-white/[0.014] py-5">
        <TechMarquee />
      </div>

      {/* ==================== ABOUT ==================== */}
      <section ref={refs.about} className="relative py-28 overflow-hidden">
        <AuroraBackground variant="default" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="relative text-center mb-16">
            <span aria-hidden="true" data-parallax="0.06" className="ghost-num">
              01
            </span>
            <span
              data-animate="about-label"
              className={`code-chip mb-6 ${
                isVisible["about-label"] ? "animate-fade-in-up" : "opacity-0"
              }`}
              id="about-label"
            >
              <span className="code-chip-num">01</span>
              {t("about.label")}
            </span>
            <h2
              data-animate="about-title"
              className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.06] ${
                isVisible["about-title"] ? "animate-fade-in-down" : "opacity-0"
              }`}
              id="about-title"
            >
              {t("about.title")}{" "}
              <span className="gradient-text">
                {t("about.title.highlight")}
              </span>
            </h2>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Card */}
            <div
              data-spot
              data-animate="about-main"
              className={`spot-card relative md:col-span-2 glass-card rounded-3xl p-8 bento-about-card ${
                isVisible["about-main"] ? "animate-fade-in-up" : "opacity-0"
              }`}
              id="about-main"
            >
              <div
                className={cn(
                  "flex items-center gap-3 mb-6",
                  dir === "rtl" && "flex-row-reverse"
                )}
              >
                <div className="w-11 h-11 rounded-xl bg-violet-500/15 flex items-center justify-center border border-violet-400/20">
                  <FaRocket className="text-violet-300" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">
                  {t("about.journey.title")}
                </h3>
              </div>
              <p
                className={cn(
                  "text-muted-foreground leading-relaxed mb-4",
                  dir === "rtl" && "text-right"
                )}
              >
                {t("about.journey.p1")}
              </p>
              <p
                className={cn(
                  "text-muted-foreground leading-relaxed",
                  dir === "rtl" && "text-right"
                )}
              >
                {t("about.journey.p2")}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="flex flex-col gap-6">
              <div
                data-spot
                data-animate="about-stat1"
                className={`spot-card relative glass-card rounded-3xl p-6 bento-about-card ${
                  isVisible["about-stat1"] ? "animate-fade-in-up" : "opacity-0"
                }`}
                id="about-stat1"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15 border border-violet-400/20">
                    <FaCalendarAlt className="text-sm text-violet-300" />
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground/60">
                    01.1
                  </span>
                </div>
                <p className="text-4xl font-black gradient-text leading-none">
                  10+
                </p>
                <p
                  className={cn(
                    "text-sm text-muted-foreground mt-2",
                    dir === "rtl" && "text-right"
                  )}
                >
                  {t("about.stat.years")}
                </p>
              </div>

              <div
                data-spot
                data-animate="about-stat2"
                className={`spot-card relative glass-card rounded-3xl p-6 bento-about-card ${
                  isVisible["about-stat2"] ? "animate-fade-in-up" : "opacity-0"
                }`}
                id="about-stat2"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-fuchsia-500/15 border border-fuchsia-400/20">
                    <FaGlobe className="text-sm text-fuchsia-300" />
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground/60">
                    01.2
                  </span>
                </div>
                <p className="text-4xl font-black gradient-text leading-none">
                  6
                </p>
                <p
                  className={cn(
                    "text-sm text-muted-foreground mt-2",
                    dir === "rtl" && "text-right"
                  )}
                >
                  {t("about.stat.companies")}
                </p>
              </div>

              <div
                data-spot
                data-animate="about-stat3"
                className={`spot-card relative glass-card rounded-3xl p-6 bento-about-card ${
                  isVisible["about-stat3"] ? "animate-fade-in-up" : "opacity-0"
                }`}
                id="about-stat3"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/10 border border-amber-300/25">
                    <FaBolt className="text-sm text-amber-300" />
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground/60">
                    01.3
                  </span>
                </div>
                <p className="text-4xl font-black gradient-text leading-none">
                  50+
                </p>
                <p
                  className={cn(
                    "text-sm text-muted-foreground mt-2",
                    dir === "rtl" && "text-right"
                  )}
                >
                  {t("about.stat.projects")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SKILLS ==================== */}
      <section ref={refs.skills} className="relative py-28 overflow-hidden">
        <AuroraBackground variant="cool" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="relative text-center mb-16">
            <span aria-hidden="true" data-parallax="0.06" className="ghost-num">
              02
            </span>
            <span
              data-animate="skills-label"
              className={`code-chip mb-6 ${
                isVisible["skills-label"] ? "animate-fade-in-up" : "opacity-0"
              }`}
              id="skills-label"
            >
              <span className="code-chip-num">02</span>
              {t("skills.label")}
            </span>
            <h2
              data-animate="skills-title"
              className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.06] ${
                isVisible["skills-title"] ? "animate-fade-in-down" : "opacity-0"
              }`}
              id="skills-title"
            >
              {t("skills.title")}{" "}
              <span className="gradient-text">
                {t("skills.title.highlight")}
              </span>
            </h2>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {skills.map((skill, index) => (
              <SkillCard
                key={index}
                Icon={skill.Icon}
                name={skill.name}
                color={skill.color}
                tile={skill.tile}
                glow={skill.glow}
                ring={skill.ring}
                delay={skill.delay}
                isVisible={isVisible[`skill-${index}`]}
                id={`skill-${index}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== EXPERIENCE ==================== */}
      <section ref={refs.experience} className="relative py-28 overflow-hidden">
        <AuroraBackground variant="purple" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Section Header */}
          <div className="relative text-center mb-16">
            <span aria-hidden="true" data-parallax="0.06" className="ghost-num">
              03
            </span>
            <span
              data-animate="exp-label"
              className={`code-chip mb-6 ${
                isVisible["exp-label"] ? "animate-fade-in-up" : "opacity-0"
              }`}
              id="exp-label"
            >
              <span className="code-chip-num">03</span>
              {t("experience.label")}
            </span>
            <h2
              data-animate="exp-title"
              className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.06] ${
                isVisible["exp-title"] ? "animate-fade-in-down" : "opacity-0"
              }`}
              id="exp-title"
            >
              {t("experience.title")}{" "}
              <span className="gradient-text">
                {t("experience.title.highlight")}
              </span>
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className={cn(
                "absolute top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/60 via-purple-500/25 to-transparent",
                dir === "rtl" ? "right-6" : "left-6"
              )}
            />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  data-animate={`exp-${index}`}
                  className={`relative ${dir === "rtl" ? "pr-16" : "pl-16"} ${
                    isVisible[`exp-${index}`]
                      ? "animate-slide-in-left"
                      : "opacity-0 translate-x-[-30px]"
                  }`}
                  id={`exp-${index}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Timeline dot */}
                  <div
                    className={cn(
                      "absolute top-8",
                      dir === "rtl" ? "right-[19px]" : "left-[19px]"
                    )}
                  >
                    <div className="timeline-dot" />
                  </div>

                  {/* Card */}
                  <div
                    data-spot
                    className="spot-card relative experience-card glass-card rounded-2xl p-6 sm:p-8 group"
                  >
                    {/* Header */}
                    <div
                      className={cn(
                        "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4",
                        dir === "rtl" && "sm:flex-row-reverse"
                      )}
                    >
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors duration-300">
                          {t(exp.titleKey)}
                        </h3>
                        <p className="text-violet-300 font-semibold text-sm mt-0.5">
                          {t(exp.companyKey)}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] font-mono text-[11px] tracking-wide text-muted-foreground w-fit",
                          dir === "rtl" && "flex-row-reverse"
                        )}
                      >
                        <FaCalendarAlt className="text-[10px] text-violet-300/80" />
                        {t(exp.dateKey)}
                      </span>
                    </div>

                    {/* Description */}
                    <p
                      className={cn(
                        "text-muted-foreground leading-relaxed text-sm mb-4",
                        dir === "rtl" && "text-right"
                      )}
                    >
                      {t(exp.descKey)}
                    </p>

                    {/* Extra description */}
                    {exp.extraKey && (
                      <p
                        className={cn(
                          "text-muted-foreground/70 leading-relaxed text-sm mb-4",
                          dir === "rtl" && "text-right"
                        )}
                      >
                        {t(exp.extraKey)}
                      </p>
                    )}

                    {/* Highlights */}
                    {exp.highlightsKeys && (
                      <ul
                        className={cn(
                          "space-y-2 mb-4",
                          dir === "rtl" && "text-right"
                        )}
                      >
                        {exp.highlightsKeys.map((highlightKey, i) => (
                          <li
                            key={i}
                            className={cn(
                              "flex items-start gap-2.5 text-sm text-muted-foreground",
                              dir === "rtl" && "flex-row-reverse"
                            )}
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                            {t(highlightKey)}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Website link */}
                    {exp.website && (
                      <a
                        href={exp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "inline-flex items-center gap-2 text-sm text-violet-300 hover:text-violet-200 transition-colors duration-300 mb-4",
                          dir === "rtl" && "flex-row-reverse"
                        )}
                      >
                        <FaGlobe className="text-xs" />
                        {exp.websiteLabel}
                        <FaArrowRight
                          className={cn(
                            "text-[10px] transition-transform duration-300 group-hover:translate-x-1",
                            dir === "rtl" &&
                              "rotate-180 group-hover:-translate-x-1"
                          )}
                        />
                      </a>
                    )}

                    {/* Tech tags */}
                    {exp.tech && (
                      <div
                        className={cn(
                          "flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/[0.06]",
                          dir === "rtl" && "flex-row-reverse"
                        )}
                      >
                        {exp.tech.split(" | ").map((tech, i) => (
                          <span key={i} className="skill-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== GITHUB ==================== */}
      <section className="relative py-24 overflow-hidden">
        <AuroraBackground variant="warm" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="relative text-center mb-12">
            <span aria-hidden="true" data-parallax="0.06" className="ghost-num">
              04
            </span>
            <span className="code-chip mb-6 inline-block">
              <span className="code-chip-num">04</span>
              {t("github.label")}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.06]">
              {t("github.title")}{" "}
              <span className="gradient-text">
                {t("github.title.highlight")}
              </span>
            </h2>
          </div>{" "}
          <div
            id="github-card"
            data-spot
            className="spot-card relative glass-card rounded-3xl p-6 sm:p-8 w-full max-w-2xl mx-auto"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                @pokerface71
              </span>
              <a
                href="https://github.com/pokerface71"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-300 hover:text-white hover:border-violet-400/40 hover:bg-violet-500/10"
              >
                github.com/pokerface71
                <FaArrowRight className="text-[9px]" />
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-black/30 p-3">
              <Image
                src="https://github-readme-streak-stats.herokuapp.com/?user=pokerface71&theme=tokyonight&hide_border=true%22%20alt=%22GitHub%20Streak"
                alt="herokuapp"
                width={400}
                height={200}
                className="rounded-xl w-full"
                unoptimized={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section ref={refs.contact} className="relative py-28 overflow-hidden">
        <AuroraBackground variant="default" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Section Header */}
          <div className="relative text-center mb-16">
            <span aria-hidden="true" data-parallax="0.06" className="ghost-num">
              05
            </span>
            <span
              data-animate="contact-label"
              className={`code-chip mb-6 ${
                isVisible["contact-label"] ? "animate-fade-in-up" : "opacity-0"
              }`}
              id="contact-label"
            >
              <span className="code-chip-num">05</span>
              {t("contact.label")}
            </span>
            <h2
              data-animate="contact-title"
              className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.06] ${
                isVisible["contact-title"]
                  ? "animate-fade-in-down"
                  : "opacity-0"
              }`}
              id="contact-title"
            >
              {t("contact.title")}{" "}
              <span className="gradient-text">
                {t("contact.title.highlight")}
              </span>
            </h2>
            <p
              data-animate="contact-sub"
              className={`mt-5 text-muted-foreground/70 max-w-md mx-auto ${
                isVisible["contact-sub"] ? "animate-fade-in-up" : "opacity-0"
              }`}
              id="contact-sub"
              style={{ animationDelay: "0.15s" }}
            >
              {t("hero.desc")}
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Info */}
            <div
              data-spot
              data-animate="contact-info"
              className={`spot-card relative glass-card rounded-3xl p-8 contact-card ${
                isVisible["contact-info"] ? "animate-fade-in-up" : "opacity-0"
              }`}
              id="contact-info"
            >
              <div className="flex items-center gap-3 mb-7">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15 border border-violet-400/20">
                  <FaEnvelope className="text-sm text-violet-300" />
                </span>
                <h3 className="text-lg font-bold tracking-tight">
                  {t("contact.info.title")}
                </h3>
              </div>

              <div className="space-y-5">
                {[
                  {
                    icon: FaPhone,
                    label: "+98 903 595 4105",
                    sub: "Phone",
                    color: "text-violet-300",
                    bg: "bg-violet-500/10 border-violet-400/20"
                  },
                  {
                    icon: FaEnvelope,
                    label: "esmaeiljafari1992@gmail.com",
                    sub: "Email",
                    color: "text-fuchsia-300",
                    bg: "bg-fuchsia-500/10 border-fuchsia-400/20"
                  },
                  {
                    icon: FaMapMarkerAlt,
                    label: t("contact.location"),
                    sub: "Location",
                    color: "text-sky-300",
                    bg: "bg-sky-500/10 border-sky-400/20"
                  }
                ].map((item, i) => (
                  <div
                    key={i}
                    className={cn(
                      "group flex items-center gap-4 rounded-2xl border border-transparent p-2 -m-2 transition-all duration-300 hover:border-white/[0.06] hover:bg-white/[0.03]",
                      dir === "rtl" && "flex-row-reverse"
                    )}
                  >
                    <div
                      className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}
                    >
                      <item.icon className={item.color} size={17} />
                    </div>
                    <div
                      className={cn("min-w-0", dir === "rtl" && "text-right")}
                    >
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 mb-0.5">
                        {item.sub}
                      </p>
                      <p className="text-sm font-medium text-foreground truncate">
                        {item.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links Card */}
            <div
              data-spot
              data-animate="contact-social"
              className={`spot-card relative glass-card rounded-3xl p-8 contact-card ${
                isVisible["contact-social"] ? "animate-fade-in-up" : "opacity-0"
              }`}
              id="contact-social"
              style={{ animationDelay: "0.15s" }}
            >
              <div className="flex items-center gap-3 mb-7">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-fuchsia-500/15 border border-fuchsia-400/20">
                  <FaInstagram className="text-sm text-fuchsia-300" />
                </span>
                <h3 className="text-lg font-bold tracking-tight">
                  {t("contact.social.title")}
                </h3>
              </div>

              <div className="space-y-3">
                {[
                  {
                    icon: FaWhatsapp,
                    label: "WhatsApp",
                    sublabel: "+98 903 595 4105",
                    href: "https://api.whatsapp.com/send?phone=989035954105",
                    color: "text-green-400",
                    bgColor: "bg-green-500/10 border-green-400/20",
                    glow: "hover:shadow-green-500/10"
                  },
                  {
                    icon: FaLinkedin,
                    label: "LinkedIn",
                    sublabel: "esmaeil-jafari1992",
                    href: "https://www.linkedin.com/in/esmaeil-jafari1992/",
                    color: "text-blue-400",
                    bgColor: "bg-blue-500/10 border-blue-400/20",
                    glow: "hover:shadow-blue-500/10"
                  },
                  {
                    icon: FaInstagram,
                    label: "Instagram",
                    sublabel: "@esmaeil_jafari_official",
                    href: "https://instagram.com/esmaeil_jafari_official",
                    color: "text-pink-400",
                    bgColor: "bg-pink-500/10 border-pink-400/20",
                    glow: "hover:shadow-pink-500/10"
                  }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center gap-4 p-3 rounded-2xl border border-transparent hover:border-white/[0.07] hover:bg-white/[0.03] transition-all duration-300 group",
                      dir === "rtl" && "flex-row-reverse"
                    )}
                  >
                    <div
                      className={`w-11 h-11 rounded-xl ${social.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 border`}
                    >
                      <social.icon className={social.color} size={18} />
                    </div>
                    <div
                      className={cn(
                        "flex-1 min-w-0",
                        dir === "rtl" && "text-right"
                      )}
                    >
                      <p className="text-sm font-semibold text-foreground">
                        {social.label}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {social.sublabel}
                      </p>
                    </div>
                    <FaArrowRight
                      className={cn(
                        "text-muted-foreground/30 group-hover:text-muted-foreground group-hover:translate-x-1 transition-all duration-300 text-xs shrink-0",
                        dir === "rtl" && "rotate-180 group-hover:-translate-x-1"
                      )}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
      <AstronautFly />
    </div>
  );
};

export default Home;
