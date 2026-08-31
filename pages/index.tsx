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
  DiWordpress,
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
  FaArrowRight,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import AuroraBackground from "@components/Layout/AuroraBackground";
import SkillCard from "@components/SkillCard";
import { useI18n, experienceTranslations } from "lib/i18n";
import { cn } from "lib/utils";

interface ScrollRefs {
  home: React.RefObject<HTMLDivElement | null>;
  about: React.RefObject<HTMLDivElement | null>;
  skills: React.RefObject<HTMLDivElement | null>;
  experience: React.RefObject<HTMLDivElement | null>;
  contact: React.RefObject<HTMLDivElement | null>;
}

const skills = [
  { Icon: DiHtml5, name: "HTML5", color: "orange-500", delay: "0.05s" },
  { Icon: DiCss3, name: "CSS3", color: "blue-500", delay: "0.1s" },
  { Icon: DiSass, name: "SASS", color: "pink-400", delay: "0.15s" },
  { Icon: DiJavascript1, name: "JavaScript", color: "yellow-400", delay: "0.2s" },
  { Icon: DiReact, name: "React", color: "cyan-400", delay: "0.25s" },
  { Icon: SiNextdotjs, name: "Next.js", color: "gray-300", delay: "0.3s" },
  { Icon: SiTypescript, name: "TypeScript", color: "blue-400", delay: "0.35s" },
  { Icon: SiTailwindcss, name: "Tailwind", color: "sky-400", delay: "0.4s" },
  { Icon: SiRedux, name: "Redux", color: "purple-400", delay: "0.45s" },
  { Icon: DiNodejs, name: "Node.js", color: "green-400", delay: "0.5s" },
  { Icon: DiGit, name: "Git", color: "orange-400", delay: "0.55s" },
  { Icon: DiBootstrap, name: "Bootstrap", color: "violet-400", delay: "0.6s" },
  { Icon: DiWordpress, name: "WordPress", color: "blue-400", delay: "0.65s" },
  { Icon: DiPhotoshop, name: "Photoshop", color: "sky-400", delay: "0.7s" },
  { Icon: MuiIcon, name: "MUI", color: "blue-400", delay: "0.75s", isCustom: true },
];

const Home: React.FC = () => {
  const router = useRouter();
  const scroll = router.query.scroll as string;
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const { t, locale, dir } = useI18n();

  // Get experiences for current locale
  const experiences = experienceTranslations[locale] || experienceTranslations.en;

  const refs: ScrollRefs = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const scrollOptions: ScrollIntoViewOptions = {
      behavior: "smooth",
      block: "start",
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
              [entry.target.id]: true,
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

  return (
    <div className="min-h-screen text-foreground">
      <Head>
        <title>Esmaeil Jafari — Frontend Developer</title>
        <meta
          name="description"
          content="Professional portfolio of Esmaeil Jafari — Frontend Developer specializing in React, Next.js, and modern web technologies."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {/* ==================== HERO ==================== */}
      <section
        ref={refs.home}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <AuroraBackground variant="hero" />

        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03] light:opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
          <div className={cn("flex flex-col lg:flex-row items-center justify-between gap-16", dir === "rtl" && "lg:flex-row-reverse")}>
            {/* Text Content */}
            <div className={cn("flex-1 text-center", dir === "rtl" ? "lg:text-right" : "lg:text-left")}>
              <div
                data-animate="hero-badge"
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light border border-black/5 dark:border-white/10 mb-6 text-sm text-muted-foreground ${
                  isVisible["hero-badge"] ? "animate-fade-in-up" : "opacity-0"
                }`}
                id="hero-badge"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                {t("hero.badge")}
              </div>

              <h1
                data-animate="hero-title"
                className={`text-5xl sm:text-6xl lg:text-7xl font-black mb-4 tracking-tight leading-[1.1] ${
                  isVisible["hero-title"] ? "animate-fade-in-down" : "opacity-0"
                }`}
                id="hero-title"
              >
                {t("hero.title.greeting")}{" "}
                <span className="gradient-text">Esmaeil</span>
              </h1>

              <h2
                data-animate="hero-subtitle"
                className={`text-2xl sm:text-3xl lg:text-4xl font-light text-muted-foreground mb-6 ${
                  isVisible["hero-subtitle"] ? "animate-fade-in-up" : "opacity-0"
                }`}
                id="hero-subtitle"
                style={{ animationDelay: "0.15s" }}
              >
                {t("hero.subtitle")}
              </h2>

              <p
                data-animate="hero-desc"
                className={`text-lg text-muted-foreground/70 max-w-lg mb-10 leading-relaxed ${
                  isVisible["hero-desc"] ? "animate-fade-in-up" : "opacity-0"
                }`}
                id="hero-desc"
                style={{ animationDelay: "0.3s" }}
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
                style={{ animationDelay: "0.45s" }}
              >
                <a
                  href="/?scroll=experience"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_100%] hover:animate-[gradient-shift_2s_ease_infinite] hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5"
                >
                  {t("hero.cta.experience")}
                  <FaArrowRight className={cn("text-xs", dir === "rtl" && "rotate-180")} />
                </a>
                <a
                  href="/?scroll=contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-muted-foreground glass-light border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground transition-all duration-300 hover:-translate-y-0.5"
                >
                  {t("hero.cta.contact")}
                </a>
              </div>

              {/* Social Links */}
              <div
                data-animate="hero-social"
                className={`flex gap-3 mt-10 justify-center ${
                  dir === "rtl" ? "lg:justify-end" : "lg:justify-start"
                } ${isVisible["hero-social"] ? "animate-fade-in-up" : "opacity-0"}`}
                id="hero-social"
                style={{ animationDelay: "0.6s" }}
              >
                {[
                  { href: "https://www.linkedin.com/in/esmaeil-jafari1992/", icon: FaLinkedin, color: "hover:text-blue-400 hover:border-blue-400/30" },
                  { href: "https://instagram.com/esmaeil_jafari_official", icon: FaInstagram, color: "hover:text-pink-400 hover:border-pink-400/30" },
                  { href: "https://api.whatsapp.com/send?phone=989052672239", icon: FaWhatsapp, color: "hover:text-green-400 hover:border-green-400/30" },
                ].map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-xl glass-light flex items-center justify-center text-muted-foreground border border-black/5 dark:border-white/5 transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color}`}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Profile Image */}
            <div
              data-animate="hero-image"
              className={`relative flex-shrink-0 ${
                isVisible["hero-image"] ? "animate-scale-in" : "opacity-0 scale-90"
              }`}
              id="hero-image"
              style={{ animationDelay: "0.2s" }}
            >
              {/* Glow */}
              <div className="profile-glow" />

              {/* Rotating ring */}
              <div className="profile-ring" />

              {/* Image container */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-background">
                <Image
                  src="/Images/esmaeiljafari.jpg"
                  alt="Esmaeil Jafari"
                  fill
                  className="rounded-full object-cover"
                  priority
                />
              </div>

              {/* Floating stats */}
              <div className={cn("absolute -bottom-2 glass-card rounded-2xl px-4 py-3 animate-bounce-in", dir === "rtl" ? "-right-4" : "-left-4")} style={{ animationDelay: "0.8s" }}>
                <div className="flex items-center gap-2">
                  <FaRocket className="text-indigo-400 text-sm" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t("hero.stats.experience")}</p>
                    <p className="text-sm font-bold text-foreground">{t("hero.stats.experience.value")}</p>
                  </div>
                </div>
              </div>

              <div className={cn("absolute -top-2 glass-card rounded-2xl px-4 py-3 animate-bounce-in", dir === "rtl" ? "-left-4" : "-right-4")} style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-2">
                  <FaCode className="text-purple-400 text-sm" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t("hero.stats.projects")}</p>
                    <p className="text-sm font-bold text-foreground">{t("hero.stats.projects.value")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50">
          <span className="text-xs tracking-widest uppercase">{t("hero.scroll")}</span>
          <div className="w-5 h-8 rounded-full border border-muted-foreground/30 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-muted-foreground/50 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ==================== ABOUT ==================== */}
      <section
        ref={refs.about}
        className="relative py-28 overflow-hidden"
      >
        <AuroraBackground variant="default" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span
              data-animate="about-label"
              className={`inline-block text-xs font-semibold tracking-[0.2em] uppercase text-indigo-400 mb-4 ${
                isVisible["about-label"] ? "animate-fade-in-up" : "opacity-0"
              }`}
              id="about-label"
            >
              {t("about.label")}
            </span>
            <h2
              data-animate="about-title"
              className={`text-4xl sm:text-5xl font-black ${
                isVisible["about-title"] ? "animate-fade-in-down" : "opacity-0"
              }`}
              id="about-title"
            >
              {t("about.title")}{" "}
              <span className="gradient-text">{t("about.title.highlight")}</span>
            </h2>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Card */}
            <div
              data-animate="about-main"
              className={`md:col-span-2 glass-card rounded-3xl p-8 bento-about-card ${
                isVisible["about-main"] ? "animate-fade-in-up" : "opacity-0"
              }`}
              id="about-main"
            >
              <div className={cn("flex items-center gap-3 mb-6", dir === "rtl" && "flex-row-reverse")}>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <FaRocket className="text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold">{t("about.journey.title")}</h3>
              </div>
              <p className={cn("text-muted-foreground leading-relaxed mb-4", dir === "rtl" && "text-right")}>
                {t("about.journey.p1")}
              </p>
              <p className={cn("text-muted-foreground leading-relaxed", dir === "rtl" && "text-right")}>
                {t("about.journey.p2")}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="flex flex-col gap-6">
              <div
                data-animate="about-stat1"
                className={`glass-card rounded-3xl p-6 bento-about-card ${
                  isVisible["about-stat1"] ? "animate-fade-in-up" : "opacity-0"
                }`}
                id="about-stat1"
                style={{ animationDelay: "0.1s" }}
              >
                <FaCalendarAlt className="text-2xl text-indigo-400 mb-3" />
                <p className="text-3xl font-black gradient-text">10+</p>
                <p className={cn("text-sm text-muted-foreground mt-1", dir === "rtl" && "text-right")}>{t("about.stat.years")}</p>
              </div>

              <div
                data-animate="about-stat2"
                className={`glass-card rounded-3xl p-6 bento-about-card ${
                  isVisible["about-stat2"] ? "animate-fade-in-up" : "opacity-0"
                }`}
                id="about-stat2"
                style={{ animationDelay: "0.2s" }}
              >
                <FaGlobe className="text-2xl text-purple-400 mb-3" />
                <p className="text-3xl font-black gradient-text">6</p>
                <p className={cn("text-sm text-muted-foreground mt-1", dir === "rtl" && "text-right")}>{t("about.stat.companies")}</p>
              </div>

              <div
                data-animate="about-stat3"
                className={`glass-card rounded-3xl p-6 bento-about-card ${
                  isVisible["about-stat3"] ? "animate-fade-in-up" : "opacity-0"
                }`}
                id="about-stat3"
                style={{ animationDelay: "0.3s" }}
              >
                <FaBolt className="text-2xl text-yellow-400 mb-3" />
                <p className="text-3xl font-black gradient-text">50+</p>
                <p className={cn("text-sm text-muted-foreground mt-1", dir === "rtl" && "text-right")}>{t("about.stat.projects")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SKILLS ==================== */}
      <section
        ref={refs.skills}
        className="relative py-28 overflow-hidden"
      >
        <AuroraBackground variant="cool" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span
              data-animate="skills-label"
              className={`inline-block text-xs font-semibold tracking-[0.2em] uppercase text-indigo-400 mb-4 ${
                isVisible["skills-label"] ? "animate-fade-in-up" : "opacity-0"
              }`}
              id="skills-label"
            >
              {t("skills.label")}
            </span>
            <h2
              data-animate="skills-title"
              className={`text-4xl sm:text-5xl font-black ${
                isVisible["skills-title"] ? "animate-fade-in-down" : "opacity-0"
              }`}
              id="skills-title"
            >
              {t("skills.title")}{" "}
              <span className="gradient-text">{t("skills.title.highlight")}</span>
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
                delay={skill.delay}
                isCustom={skill.isCustom}
                isVisible={isVisible[`skill-${index}`]}
                id={`skill-${index}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== EXPERIENCE ==================== */}
      <section
        ref={refs.experience}
        className="relative py-28 overflow-hidden"
      >
        <AuroraBackground variant="purple" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span
              data-animate="exp-label"
              className={`inline-block text-xs font-semibold tracking-[0.2em] uppercase text-indigo-400 mb-4 ${
                isVisible["exp-label"] ? "animate-fade-in-up" : "opacity-0"
              }`}
              id="exp-label"
            >
              {t("experience.label")}
            </span>
            <h2
              data-animate="exp-title"
              className={`text-4xl sm:text-5xl font-black ${
                isVisible["exp-title"] ? "animate-fade-in-down" : "opacity-0"
              }`}
              id="exp-title"
            >
              {t("experience.title")}{" "}
              <span className="gradient-text">{t("experience.title.highlight")}</span>
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className={cn("absolute top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-purple-500/30 to-transparent", dir === "rtl" ? "right-6" : "left-6")} />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  data-animate={`exp-${index}`}
                  className={`relative ${dir === "rtl" ? "pr-16" : "pl-16"} ${
                    isVisible[`exp-${index}`] ? "animate-slide-in-left" : "opacity-0 translate-x-[-30px]"
                  }`}
                  id={`exp-${index}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Timeline dot */}
                  <div className={cn("absolute top-8", dir === "rtl" ? "right-[18px]" : "left-[18px]")}>
                    <div className="timeline-dot" />
                  </div>

                  {/* Card */}
                  <div className="experience-card glass-card rounded-2xl p-6 sm:p-8 group">
                    {/* Header */}
                    <div className={cn("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4", dir === "rtl" && "sm:flex-row-reverse")}>
                      <div>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-indigo-300 dark:group-hover:text-indigo-300 transition-colors duration-300">
                          {t(exp.titleKey)}
                        </h3>
                        <p className="text-indigo-400 font-semibold">{t(exp.companyKey)}</p>
                      </div>
                      <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-light border border-black/5 dark:border-white/5 text-xs text-muted-foreground w-fit", dir === "rtl" && "flex-row-reverse")}>
                        <FaCalendarAlt className="text-[10px]" />
                        {t(exp.dateKey)}
                      </span>
                    </div>

                    {/* Description */}
                    <p className={cn("text-muted-foreground leading-relaxed text-sm mb-4", dir === "rtl" && "text-right")}>
                      {t(exp.descKey)}
                    </p>

                    {/* Extra description */}
                    {exp.extraKey && (
                      <p className={cn("text-muted-foreground/70 leading-relaxed text-sm mb-4", dir === "rtl" && "text-right")}>
                        {t(exp.extraKey)}
                      </p>
                    )}

                    {/* Highlights */}
                    {exp.highlightsKeys && (
                      <ul className={cn("space-y-2 mb-4", dir === "rtl" && "text-right")}>
                        {exp.highlightsKeys.map((highlightKey, i) => (
                          <li
                            key={i}
                            className={cn("flex items-start gap-2 text-sm text-muted-foreground", dir === "rtl" && "flex-row-reverse")}
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
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
                        className={cn("inline-flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-300 mb-4", dir === "rtl" && "flex-row-reverse")}
                      >
                        <FaGlobe className="text-xs" />
                        {exp.websiteLabel}
                        <FaArrowRight className={cn("text-[10px] transition-transform duration-300 group-hover:translate-x-1", dir === "rtl" && "rotate-180 group-hover:-translate-x-1")} />
                      </a>
                    )}

                    {/* Tech tags */}
                    {exp.tech && (
                      <div className={cn("flex flex-wrap gap-2 mt-4 pt-4 border-t border-black/5 dark:border-white/5", dir === "rtl" && "flex-row-reverse")}>
                        {exp.tech.split(" | ").map((tech, i) => (
                          <span
                            key={i}
                            className="skill-tag text-xs"
                          >
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
      <section className="relative py-20 overflow-hidden">
        <AuroraBackground variant="warm" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-indigo-400 mb-4">
              {t("github.label")}
            </span>
            <h2 className="text-4xl sm:text-5xl font-black">
              {t("github.title")}{" "}
              <span className="gradient-text">{t("github.title.highlight")}</span>
            </h2>
          </div>

          <div className="flex justify-center">
            <div className="glass-card rounded-2xl p-4 w-full max-w-md">
              <Image
                src="https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=pokerface71&layout=compact&langs_count=8&theme=algolia"
                alt="Top Languages"
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
      <section
        ref={refs.contact}
        className="relative py-28 overflow-hidden"
      >
        <AuroraBackground variant="default" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span
              data-animate="contact-label"
              className={`inline-block text-xs font-semibold tracking-[0.2em] uppercase text-indigo-400 mb-4 ${
                isVisible["contact-label"] ? "animate-fade-in-up" : "opacity-0"
              }`}
              id="contact-label"
            >
              {t("contact.label")}
            </span>
            <h2
              data-animate="contact-title"
              className={`text-4xl sm:text-5xl font-black ${
                isVisible["contact-title"] ? "animate-fade-in-down" : "opacity-0"
              }`}
              id="contact-title"
            >
              {t("contact.title")}{" "}
              <span className="gradient-text">{t("contact.title.highlight")}</span>
            </h2>
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Info */}
            <div
              data-animate="contact-info"
              className={`glass-card rounded-3xl p-8 contact-card ${
                isVisible["contact-info"] ? "animate-fade-in-up" : "opacity-0"
              }`}
              id="contact-info"
            >
              <h3 className="text-xl font-bold mb-6">{t("contact.info.title")}</h3>

              <div className="space-y-5">
                {[
                  { icon: FaPhone, label: "+98 905 267 2239", color: "text-indigo-400" },
                  { icon: FaEnvelope, label: "esmaeiljafari1992@gmail.com", color: "text-purple-400" },
                  { icon: FaMapMarkerAlt, label: t("contact.location"), color: "text-pink-400" },
                ].map((item, i) => (
                  <div key={i} className={cn("flex items-center gap-4", dir === "rtl" && "flex-row-reverse")}>
                    <div className="w-11 h-11 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center flex-shrink-0 border border-black/5 dark:border-white/5">
                      <item.icon className={item.color} size={18} />
                    </div>
                    <span className="text-muted-foreground text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links Card */}
            <div
              data-animate="contact-social"
              className={`glass-card rounded-3xl p-8 contact-card ${
                isVisible["contact-social"] ? "animate-fade-in-up" : "opacity-0"
              }`}
              id="contact-social"
              style={{ animationDelay: "0.15s" }}
            >
              <h3 className="text-xl font-bold mb-6">{t("contact.social.title")}</h3>

              <div className="space-y-4">
                {[
                  {
                    icon: FaWhatsapp,
                    label: "WhatsApp",
                    sublabel: "+98 905 267 2239",
                    href: "https://api.whatsapp.com/send?phone=989052672239",
                    color: "text-green-400",
                    bgColor: "bg-green-500/10",
                  },
                  {
                    icon: FaLinkedin,
                    label: "LinkedIn",
                    sublabel: "esmaeil-jafari1992",
                    href: "https://www.linkedin.com/in/esmaeil-jafari1992/",
                    color: "text-blue-400",
                    bgColor: "bg-blue-500/10",
                  },
                  {
                    icon: FaInstagram,
                    label: "Instagram",
                    sublabel: "@esmaeil_jafari_official",
                    href: "https://instagram.com/esmaeil_jafari_official",
                    color: "text-pink-400",
                    bgColor: "bg-pink-500/10",
                  },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("flex items-center gap-4 p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 group", dir === "rtl" && "flex-row-reverse")}
                  >
                    <div className={`w-11 h-11 rounded-xl ${social.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <social.icon className={social.color} size={18} />
                    </div>
                    <div className={cn(dir === "rtl" && "text-right flex-1")}>
                      <p className="text-sm font-semibold text-foreground">{social.label}</p>
                      <p className="text-xs text-muted-foreground">{social.sublabel}</p>
                    </div>
                    <FaArrowRight className={cn("ml-auto text-muted-foreground/30 group-hover:text-muted-foreground group-hover:translate-x-1 transition-all duration-300 text-xs", dir === "rtl" && "mr-auto ml-0 rotate-180 group-hover:-translate-x-1")} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
