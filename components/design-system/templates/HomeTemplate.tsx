"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { cn } from "lib/utils";
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
  FaArrowRight,
} from "react-icons/fa";
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
  DiWordpress,
} from "react-icons/di";
import {
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

import MuiIcon from "components/design-system/atoms/MuiIcon";
import {
  Badge,
  Button,
  GlassCard,
  GradientText,
  IconBox,
} from "components/design-system/atoms";
import { SocialIconLink } from "components/design-system/molecules/SocialIconLink";
import {
  SkillCard,
  SectionHeader,
  StatCard,
  SocialListRow,
  ContactInfoItem,
} from "components/design-system/molecules";
import {
  AuroraBackground,
  AnimatedRays,
  TechMarquee,
  Footer,
  BackToTop,
  AstronautFly,
  BlogSection,
} from "components/design-system/organisms";
import Header from "components/design-system/organisms/Header";
import { useI18n } from "lib/i18n";
import ScrollProgress from "components/design-system/organisms/ScrollProgress";
import {
  useRevealOnScroll,
  useSpotlight,
  useParallax,
  useTilt,
} from "components/design-system/hooks";
import { experienceTranslations } from "lib/i18n";
import ProfileImage from "../../../assets/Images/esmaeiljafari.jpg";

const skills = [
  { Icon: DiHtml5, name: "HTML5", color: "text-orange-400", tile: "bg-orange-500/10", glow: "bg-orange-500", ring: "border-orange-400/25", delay: "0.05s" },
  { Icon: DiCss3, name: "CSS3", color: "text-blue-400", tile: "bg-blue-500/10", glow: "bg-blue-500", ring: "border-blue-400/25", delay: "0.1s" },
  { Icon: DiSass, name: "SASS", color: "text-pink-400", tile: "bg-pink-500/10", glow: "bg-pink-500", ring: "border-pink-400/25", delay: "0.15s" },
  { Icon: DiJavascript1, name: "JavaScript", color: "text-yellow-300", tile: "bg-yellow-400/10", glow: "bg-yellow-400", ring: "border-yellow-300/25", delay: "0.2s" },
  { Icon: DiReact, name: "React", color: "text-cyan-400", tile: "bg-cyan-500/10", glow: "bg-cyan-400", ring: "border-cyan-400/25", delay: "0.25s" },
  { Icon: SiNextdotjs, name: "Next.js", color: "text-slate-200", tile: "bg-slate-400/10", glow: "bg-slate-300", ring: "border-slate-300/20", delay: "0.3s" },
  { Icon: SiTypescript, name: "TypeScript", color: "text-blue-300", tile: "bg-blue-400/10", glow: "bg-blue-400", ring: "border-blue-300/25", delay: "0.35s" },
  { Icon: SiTailwindcss, name: "Tailwind", color: "text-sky-300", tile: "bg-sky-400/10", glow: "bg-sky-400", ring: "border-sky-300/25", delay: "0.4s" },
  { Icon: SiRedux, name: "Redux", color: "text-purple-400", tile: "bg-purple-500/10", glow: "bg-purple-500", ring: "border-purple-400/25", delay: "0.45s" },
  { Icon: DiNodejs, name: "Node.js", color: "text-green-400", tile: "bg-green-500/10", glow: "bg-green-500", ring: "border-green-400/25", delay: "0.5s" },
  { Icon: DiGit, name: "Git", color: "text-orange-400", tile: "bg-orange-400/10", glow: "bg-orange-400", ring: "border-orange-300/25", delay: "0.55s" },
  { Icon: DiBootstrap, name: "Bootstrap", color: "text-violet-400", tile: "bg-violet-500/10", glow: "bg-violet-500", ring: "border-violet-400/25", delay: "0.6s" },
  { Icon: DiWordpress, name: "WordPress", color: "text-blue-400", tile: "bg-blue-400/10", glow: "bg-blue-400", ring: "border-blue-300/25", delay: "0.65s" },
  { Icon: DiPhotoshop, name: "Photoshop", color: "text-sky-400", tile: "bg-sky-400/10", glow: "bg-sky-400", ring: "border-sky-300/25", delay: "0.7s" },
  { Icon: MuiIcon, name: "MUI", color: "text-blue-400", tile: "bg-blue-500/10", glow: "bg-blue-500", ring: "border-blue-400/25", delay: "0.75s" },
];

const socials = [
  {
    href: "https://www.linkedin.com/in/esmaeil-jafari1992/",
    icon: FaLinkedin,
    label: "LinkedIn",
    color: "hover:text-blue-400 hover:border-blue-400/40 hover:shadow-blue-500/10",
  },
  {
    href: "https://instagram.com/esmaeil_jafari_official",
    icon: FaInstagram,
    label: "Instagram",
    color: "hover:text-pink-400 hover:border-pink-400/40 hover:shadow-pink-500/10",
  },
  {
    href: "https://api.whatsapp.com/send?phone=989035954105",
    icon: FaWhatsapp,
    label: "WhatsApp",
    color: "hover:text-green-400 hover:border-green-400/40 hover:shadow-green-500/10",
  },
];

export interface HomeTemplateProps {
  /**
   * `withHead` is kept for Storybook coverage only. In the app the metadata
   * lives in the route `generateMetadata`; this prop is removed from the
   * app usage (app/page.tsx renders <HomeTemplate /> without it).
   */
  withHead?: boolean;
}

/**
 * Template: the complete home page composition. Sections are pure
 * presentation — all scroll behavior lives in design-system hooks and
 * every visual unit is an atom/molecule/organism from the design system.
 */
const HomeTemplate: React.FC<HomeTemplateProps> = ({ withHead = true }) => {
  const searchParams = useSearchParams();
  const scroll = (searchParams.get("scroll") as string) || "home";
  const isVisible = useRevealOnScroll();
  useSpotlight();
  useParallax();
  useTilt();
  const { t, locale, dir } = useI18n();

  const experiences = experienceTranslations[locale] ?? experienceTranslations.en;

  const refs = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  React.useEffect(() => {
    const scrollOptions: ScrollIntoViewOptions = { behavior: "smooth", block: "start" };
    const target =
      scroll === "experience"
        ? refs.experience.current
        : scroll === "about"
          ? refs.about.current
          : scroll === "skills"
            ? refs.skills.current
            : scroll === "contact"
              ? refs.contact.current
              : refs.home.current;
    target?.scrollIntoView(scrollOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scroll]);

  return (
    <div className="min-h-screen text-foreground">
      <Header />
      <ScrollProgress />

      {/* ==================== HERO ==================== */}
      <section
        ref={refs.home}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <AnimatedRays />
        <AuroraBackground variant="hero" />

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
                id="hero-badge"
                style={{ animationDelay: "0s" }}
                className={cn(
                  "mb-7 inline-flex",
                  isVisible["hero-badge"] ? "animate-fade-in-up" : "opacity-0"
                )}
              >
                <Badge dot="success">{t("hero.badge")}</Badge>
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
                {t("hero.title.greeting")} <GradientText>Esmaeil</GradientText>
                <br className="hidden sm:block" />
                <GradientText>Jafari</GradientText>
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
                <Button variant="primary" onClick={() => { window.location.href = "/?scroll=experience"; }}>
                  {t("hero.cta.experience")}
                  <FaArrowRight className={cn("text-xs", dir === "rtl" && "rotate-180")} />
                </Button>
                <Button variant="secondary" onClick={() => { window.location.href = "/?scroll=contact"; }}>
                  {t("hero.cta.contact")}
                </Button>
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
                {socials.map((social) => (
                  <SocialIconLink
                    key={social.href}
                    href={social.href}
                    label={social.label}
                    hoverColor={social.color}
                    icon={<social.icon size={19} />}
                  />
                ))}
              </div>
            </div>

            {/* Profile Image */}
            <div
              data-animate="hero-image"
              className={`relative shrink-0 ${
                isVisible["hero-image"] ? "animate-scale-in" : "opacity-0 scale-90"
              }`}
              id="hero-image"
              style={{ animationDelay: "0.2s" }}
            >
              <div data-parallax="-0.04" className="portrait-parallax relative">
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
                      <textPath href="#hero-orbit-text" className="fill-violet-200/70">
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
                <GlassCard
                  spotlight
                  data-animate="hero-stat-exp"
                  className={cn(
                    "absolute -bottom-3 rounded-2xl px-4 py-3 animate-bounce-in",
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
                </GlassCard>

                <GlassCard
                  spotlight
                  data-animate="hero-stat-projects"
                  className={cn(
                    "absolute -top-3 rounded-2xl px-4 py-3 animate-bounce-in",
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
                </GlassCard>
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
          <SectionHeader
            num="01"
            chip={t("about.label")}
            title={t("about.title")}
            highlight={t("about.title.highlight")}
            parallaxSpeed={0.06}
          />

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Card */}
            <GlassCard
              spotlight
              data-animate="about-main"
              id="about-main"
              className={cn(
                "relative md:col-span-2 rounded-3xl p-8 bento-about-card",
                isVisible["about-main"] ? "animate-fade-in-up" : "opacity-0"
              )}
            >
              <div
                className={cn(
                  "flex items-center gap-3 mb-6",
                  dir === "rtl" && "flex-row-reverse"
                )}
              >
                <span className="w-11 h-11 rounded-xl bg-violet-500/15 flex items-center justify-center border border-violet-400/20">
                  <FaRocket className="text-violet-300" />
                </span>
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
            </GlassCard>

            {/* Stats Cards */}
            <div className="flex flex-col gap-6">
              <StatCard
                id="about-stat1"
                value="10+"
                label={t("about.stat.years")}
                icon={<FaCalendarAlt />}
                tone="violet"
                index="01.1"
                isVisible={isVisible["about-stat1"]}
              />
              <StatCard
                id="about-stat2"
                value="6"
                label={t("about.stat.companies")}
                icon={<FaGlobe />}
                tone="fuchsia"
                index="01.2"
                isVisible={isVisible["about-stat2"]}
              />
              <StatCard
                id="about-stat3"
                value="50+"
                label={t("about.stat.projects")}
                icon={<FaBolt />}
                tone="amber"
                index="01.3"
                isVisible={isVisible["about-stat3"]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SKILLS ==================== */}
      <section ref={refs.skills} className="relative py-28 overflow-hidden">
        <AuroraBackground variant="cool" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <SectionHeader
            num="02"
            chip={t("skills.label")}
            title={t("skills.title")}
            highlight={t("skills.title.highlight")}
            parallaxSpeed={0.06}
          />

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
          <SectionHeader
            num="03"
            chip={t("experience.label")}
            title={t("experience.title")}
            highlight={t("experience.title.highlight")}
            parallaxSpeed={0.06}
          />

          {/* Timeline */}
          <div className="relative">
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
                  <GlassCard
                    spotlight
                    className="relative experience-card rounded-2xl p-6 sm:p-8 group"
                  >
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

                    <p
                      className={cn(
                        "text-muted-foreground leading-relaxed text-sm mb-4",
                        dir === "rtl" && "text-right"
                      )}
                    >
                      {t(exp.descKey)}
                    </p>

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
                            dir === "rtl" && "rotate-180 group-hover:-translate-x-1"
                          )}
                        />
                      </a>
                    )}

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
                  </GlassCard>
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
          <SectionHeader
            num="04"
            chip={t("github.label")}
            title={t("github.title")}
            highlight={t("github.title.highlight")}
            parallaxSpeed={0.06}
            className="mb-12"
          />
          <GlassCard
            spotlight
            id="github-card"
            className="relative rounded-3xl p-6 sm:p-8 w-full max-w-2xl mx-auto"
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
                src="https://streak-stats.demolab.com/?user=pokerface71&theme=tokyonight&hide_border=true"
                alt="GitHub streak stats"
                width={400}
                height={200}
                className="rounded-xl w-full"
                unoptimized={true}
              />
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ==================== BLOG ==================== */}
      <BlogSection />

      {/* ==================== CONTACT ==================== */}
      <section ref={refs.contact} className="relative py-28 overflow-hidden">
        <AuroraBackground variant="default" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <SectionHeader
            num="05"
            chip={t("contact.label")}
            title={t("contact.title")}
            highlight={t("contact.title.highlight")}
            subtitle={t("hero.desc")}
            parallaxSpeed={0.06}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Info */}
            <GlassCard
              spotlight
              data-animate="contact-info"
              id="contact-info"
              className={cn(
                "relative rounded-3xl p-8 contact-card",
                isVisible["contact-info"] ? "animate-fade-in-up" : "opacity-0"
              )}
            >
              <div className="flex items-center gap-3 mb-7">
                <IconBox tone="violet" icon={<FaEnvelope className="text-sm" />} className="h-9 w-9 rounded-xl" />
                <h3 className="text-lg font-bold tracking-tight">
                  {t("contact.info.title")}
                </h3>
              </div>

              <div className="space-y-5">
                <ContactInfoItem
                  icon={<FaPhone />}
                  category="Phone"
                  value="+98 903 595 4105"
                  tone="violet"
                  className={dir === "rtl" ? "flex-row-reverse" : undefined}
                />
                <ContactInfoItem
                  icon={<FaEnvelope />}
                  category="Email"
                  value="esmaeiljafari1992@gmail.com"
                  tone="fuchsia"
                  className={dir === "rtl" ? "flex-row-reverse" : undefined}
                />
                <ContactInfoItem
                  icon={<FaMapMarkerAlt />}
                  category="Location"
                  value={t("contact.location")}
                  tone="sky"
                  className={dir === "rtl" ? "flex-row-reverse" : undefined}
                />
              </div>
            </GlassCard>

            {/* Social Links Card */}
            <GlassCard
              spotlight
              data-animate="contact-social"
              id="contact-social"
              style={{ animationDelay: "0.15s" }}
              className={cn(
                "relative rounded-3xl p-8 contact-card",
                isVisible["contact-social"] ? "animate-fade-in-up" : "opacity-0"
              )}
            >
              <div className="flex items-center gap-3 mb-7">
                <IconBox tone="fuchsia" icon={<FaInstagram className="text-sm" />} className="h-9 w-9 rounded-xl" />
                <h3 className="text-lg font-bold tracking-tight">
                  {t("contact.social.title")}
                </h3>
              </div>

              <div className="space-y-3">
                <SocialListRow
                  href="https://api.whatsapp.com/send?phone=989035954105"
                  label="WhatsApp"
                  sublabel="+98 903 595 4105"
                  icon={<FaWhatsapp />}
                  tone="green"
                  className={dir === "rtl" ? "flex-row-reverse" : undefined}
                />
                <SocialListRow
                  href="https://www.linkedin.com/in/esmaeil-jafari1992/"
                  label="LinkedIn"
                  sublabel="esmaeil-jafari1992"
                  icon={<FaLinkedin />}
                  tone="blue"
                  className={dir === "rtl" ? "flex-row-reverse" : undefined}
                />
                <SocialListRow
                  href="https://instagram.com/esmaeil_jafari_official"
                  label="Instagram"
                  sublabel="@esmaeil_jafari_official"
                  icon={<FaInstagram />}
                  tone="pink"
                  className={dir === "rtl" ? "flex-row-reverse" : undefined}
                />
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
      <AstronautFly />
    </div>
  );
};

export default HomeTemplate;
