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

const experiences = [
  {
    title: "Frontend Developer",
    company: "Otaghak",
    date: "Oct 2025",
    description:
      "Otaghak is a leading online platform for booking villas, apartments, and accommodations across Iran, Turkey, Armenia, and South Africa. As a Frontend Developer, I contributed to the development and enhancement of the platform's user interface, focusing on creating seamless booking experiences and improving user engagement. The platform features over 38,000 accommodations and provides users with comprehensive search and filtering capabilities.",
    extra:
      "During my time at Otaghak, I worked on optimizing the booking flow, enhancing the search functionality, and improving the overall user experience across different device types.",
    website: "https://www.otaghak.com/",
    websiteLabel: "www.otaghak.com",
    tech: "React | Next.js | TypeScript | Modern Frontend Technologies",
  },
  {
    title: "Frontend Developer",
    company: "Dinawin",
    date: "Jan 2022 - Present",
    description:
      "Dinawin is a leading company in the automotive spare parts industry with multiple applications. As a Frontend Developer, my primary responsibility is to modernize and refactor the legacy application from the ground up. This involves implementing modern technologies, improving application performance, and ensuring a seamless user experience across all platforms.",
    highlights: [
      "Baaz.ir — Main platform for automotive spare parts with advanced search capabilities and real-time inventory management",
      "Karban.Baaz.ir — Specialized Task Management System with comprehensive workflow automation",
      "Shop.Baaz.ir — E-commerce platform with integrated payment gateways and order tracking",
      "Akorayan.com — Additional platform for automotive services with CRM features",
    ],
    tech: "React | Next.js | TypeScript | Sass | SignalR | Micro Frontend | Redux | MUI | Zustand | React Query",
  },
  {
    title: "Frontend Developer",
    company: "KetabPlus",
    date: "Mar 2021 - Feb 2022",
    description:
      "KetabPlus is an innovative startup in the book industry, dedicated to promoting reading culture and making books more accessible. I was responsible for refactoring, developing, and maintaining both the public website and the admin panel.",
    tech: "TypeScript | Next.js | React | Redux-Toolkit | ReactBootstrap | Tailwind | SASS",
  },
  {
    title: "Frontend Developer",
    company: "SandBadCell",
    date: "Aug 2019 - Feb 2021",
    description:
      "SandBadCell is a B2B platform developed by Ahoora Company, specializing in business-to-business transactions. I developed and maintained both the public-facing website and the administrative panel.",
    tech: "jQuery | React | Redux | ReactBootstrap | Bootstrap | WordPress | PHP",
  },
  {
    title: "Frontend Developer",
    company: "Seoraz | Simagar",
    date: "Feb 2017 - Aug 2019",
    description:
      "Seoraz is a fully bundled services provider of Web Design, Development, Corporate Identity, Mobile Apps along with SEO and Social Media. I contributed to various web projects focusing on responsive and visually appealing interfaces.",
    tech: "JavaScript | jQuery | React | Bootstrap | WordPress | SEO",
  },
  {
    title: "Frontend Developer",
    company: "WebNegah",
    date: "Jan 2015 - Jan 2017",
    description:
      "WebNegah is a well-established programming company with over 20 years of experience. I designed and developed websites tailored to specific customer requirements using various technologies.",
    tech: "WordPress | DNN | SEO | JavaScript | jQuery | Bootstrap | OpenCart | Photoshop",
  },
];

const Home: React.FC = () => {
  const router = useRouter();
  const scroll = router.query.scroll as string;
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

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
    <div className="min-h-screen bg-[hsl(224,30%,6%)] text-white">
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
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <div
                data-animate="hero-badge"
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light border border-white/10 mb-6 text-sm text-gray-400 ${
                  isVisible["hero-badge"] ? "animate-fade-in-up" : "opacity-0"
                }`}
                id="hero-badge"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available for new opportunities
              </div>

              <h1
                data-animate="hero-title"
                className={`text-5xl sm:text-6xl lg:text-7xl font-black mb-4 tracking-tight leading-[1.1] ${
                  isVisible["hero-title"] ? "animate-fade-in-down" : "opacity-0"
                }`}
                id="hero-title"
              >
                Hi, I&apos;m{" "}
                <span className="gradient-text">Esmaeil</span>
              </h1>

              <h2
                data-animate="hero-subtitle"
                className={`text-2xl sm:text-3xl lg:text-4xl font-light text-gray-400 mb-6 ${
                  isVisible["hero-subtitle"] ? "animate-fade-in-up" : "opacity-0"
                }`}
                id="hero-subtitle"
                style={{ animationDelay: "0.15s" }}
              >
                Frontend Developer
              </h2>

              <p
                data-animate="hero-desc"
                className={`text-lg text-gray-500 max-w-lg mb-10 leading-relaxed ${
                  isVisible["hero-desc"] ? "animate-fade-in-up" : "opacity-0"
                }`}
                id="hero-desc"
                style={{ animationDelay: "0.3s" }}
              >
                Crafting elegant, high-performance web experiences with modern technologies.
                Passionate about clean code, intuitive UIs, and continuous learning.
              </p>

              {/* CTA Buttons */}
              <div
                data-animate="hero-cta"
                className={`flex flex-wrap gap-4 justify-center lg:justify-start ${
                  isVisible["hero-cta"] ? "animate-fade-in-up" : "opacity-0"
                }`}
                id="hero-cta"
                style={{ animationDelay: "0.45s" }}
              >
                <a
                  href="/?scroll=experience"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_100%] hover:animate-[gradient-shift_2s_ease_infinite] hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5"
                >
                  View Experience
                  <FaArrowRight className="text-xs" />
                </a>
                <a
                  href="/?scroll=contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-gray-300 glass-light border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                >
                  Get In Touch
                </a>
              </div>

              {/* Social Links */}
              <div
                data-animate="hero-social"
                className={`flex gap-3 mt-10 justify-center lg:justify-start ${
                  isVisible["hero-social"] ? "animate-fade-in-up" : "opacity-0"
                }`}
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
                    className={`w-12 h-12 rounded-xl glass-light flex items-center justify-center text-gray-500 border border-white/5 transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color}`}
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
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-[hsl(224,30%,6%)]">
                <Image
                  src="/Images/esmaeiljafari.jpg"
                  alt="Esmaeil Jafari"
                  fill
                  className="rounded-full object-cover"
                  priority
                />
              </div>

              {/* Floating stats */}
              <div className="absolute -bottom-2 -left-4 glass-card rounded-2xl px-4 py-3 animate-bounce-in" style={{ animationDelay: "0.8s" }}>
                <div className="flex items-center gap-2">
                  <FaRocket className="text-indigo-400 text-sm" />
                  <div>
                    <p className="text-xs text-gray-500">Experience</p>
                    <p className="text-sm font-bold text-white">10+ Years</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-2 -right-4 glass-card rounded-2xl px-4 py-3 animate-bounce-in" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-2">
                  <FaCode className="text-purple-400 text-sm" />
                  <div>
                    <p className="text-xs text-gray-500">Projects</p>
                    <p className="text-sm font-bold text-white">50+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-gray-700 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-gray-500 animate-bounce" />
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
              About Me
            </span>
            <h2
              data-animate="about-title"
              className={`text-4xl sm:text-5xl font-black ${
                isVisible["about-title"] ? "animate-fade-in-down" : "opacity-0"
              }`}
              id="about-title"
            >
              Turning ideas into{" "}
              <span className="gradient-text">reality</span>
            </h2>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Card */}
            <div
              data-animate="about-main"
              className={`md:col-span-2 glass-card rounded-3xl p-8 ${
                isVisible["about-main"] ? "animate-fade-in-up" : "opacity-0"
              }`}
              id="about-main"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <FaRocket className="text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold">My Journey</h3>
              </div>
              <p className="text-gray-400 leading-relaxed mb-4">
                I am a front-end developer with a proven ability to collaborate
                effectively with senior developers. I always enjoy working as a
                team member and have a strong passion for learning new
                technologies.
              </p>
              <p className="text-gray-400 leading-relaxed">
                With experience working in programming teams and coordinating with
                colleagues, I bring a comprehensive approach to building web
                applications that deliver exceptional user experiences and meet
                business objectives.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="flex flex-col gap-6">
              <div
                data-animate="about-stat1"
                className={`glass-card rounded-3xl p-6 ${
                  isVisible["about-stat1"] ? "animate-fade-in-up" : "opacity-0"
                }`}
                id="about-stat1"
                style={{ animationDelay: "0.1s" }}
              >
                <FaCalendarAlt className="text-2xl text-indigo-400 mb-3" />
                <p className="text-3xl font-black gradient-text">10+</p>
                <p className="text-sm text-gray-500 mt-1">Years of Experience</p>
              </div>

              <div
                data-animate="about-stat2"
                className={`glass-card rounded-3xl p-6 ${
                  isVisible["about-stat2"] ? "animate-fade-in-up" : "opacity-0"
                }`}
                id="about-stat2"
                style={{ animationDelay: "0.2s" }}
              >
                <FaGlobe className="text-2xl text-purple-400 mb-3" />
                <p className="text-3xl font-black gradient-text">6</p>
                <p className="text-sm text-gray-500 mt-1">Companies Worked</p>
              </div>

              <div
                data-animate="about-stat3"
                className={`glass-card rounded-3xl p-6 ${
                  isVisible["about-stat3"] ? "animate-fade-in-up" : "opacity-0"
                }`}
                id="about-stat3"
                style={{ animationDelay: "0.3s" }}
              >
                <FaBolt className="text-2xl text-yellow-400 mb-3" />
                <p className="text-3xl font-black gradient-text">50+</p>
                <p className="text-sm text-gray-500 mt-1">Projects Delivered</p>
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
              Tech Stack
            </span>
            <h2
              data-animate="skills-title"
              className={`text-4xl sm:text-5xl font-black ${
                isVisible["skills-title"] ? "animate-fade-in-down" : "opacity-0"
              }`}
              id="skills-title"
            >
              Skills &{" "}
              <span className="gradient-text">Technologies</span>
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
              Career Path
            </span>
            <h2
              data-animate="exp-title"
              className={`text-4xl sm:text-5xl font-black ${
                isVisible["exp-title"] ? "animate-fade-in-down" : "opacity-0"
              }`}
              id="exp-title"
            >
              Work{" "}
              <span className="gradient-text">Experience</span>
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-purple-500/30 to-transparent" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  data-animate={`exp-${index}`}
                  className={`relative pl-16 ${
                    isVisible[`exp-${index}`] ? "animate-slide-in-left" : "opacity-0 translate-x-[-30px]"
                  }`}
                  id={`exp-${index}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[18px] top-8">
                    <div className="timeline-dot" />
                  </div>

                  {/* Card */}
                  <div className="experience-card glass-card rounded-2xl p-6 sm:p-8 group">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-300">
                          {exp.title}
                        </h3>
                        <p className="text-indigo-400 font-semibold">{exp.company}</p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-light border border-white/5 text-xs text-gray-400 w-fit">
                        <FaCalendarAlt className="text-[10px]" />
                        {exp.date}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 leading-relaxed text-sm mb-4">
                      {exp.description}
                    </p>

                    {/* Extra description */}
                    {exp.extra && (
                      <p className="text-gray-500 leading-relaxed text-sm mb-4">
                        {exp.extra}
                      </p>
                    )}

                    {/* Highlights */}
                    {exp.highlights && (
                      <ul className="space-y-2 mb-4">
                        {exp.highlights.map((highlight, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-gray-400"
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                            {highlight}
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
                        className="inline-flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-300 mb-4"
                      >
                        <FaGlobe className="text-xs" />
                        {exp.websiteLabel}
                        <FaArrowRight className="text-[10px] transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    )}

                    {/* Tech tags */}
                    {exp.tech && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
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
              Open Source
            </span>
            <h2 className="text-4xl sm:text-5xl font-black">
              GitHub{" "}
              <span className="gradient-text">Activity</span>
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
              Get In Touch
            </span>
            <h2
              data-animate="contact-title"
              className={`text-4xl sm:text-5xl font-black ${
                isVisible["contact-title"] ? "animate-fade-in-down" : "opacity-0"
              }`}
              id="contact-title"
            >
              Let&apos;s Work{" "}
              <span className="gradient-text">Together</span>
            </h2>
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Info */}
            <div
              data-animate="contact-info"
              className={`glass-card rounded-3xl p-8 ${
                isVisible["contact-info"] ? "animate-fade-in-up" : "opacity-0"
              }`}
              id="contact-info"
            >
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>

              <div className="space-y-5">
                {[
                  { icon: FaPhone, label: "+98 905 267 2239", color: "text-indigo-400" },
                  { icon: FaEnvelope, label: "esmaeiljafari1992@gmail.com", color: "text-purple-400" },
                  { icon: FaMapMarkerAlt, label: "Tehran, Iran", color: "text-pink-400" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/5">
                      <item.icon className={item.color} size={18} />
                    </div>
                    <span className="text-gray-300 text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links Card */}
            <div
              data-animate="contact-social"
              className={`glass-card rounded-3xl p-8 ${
                isVisible["contact-social"] ? "animate-fade-in-up" : "opacity-0"
              }`}
              id="contact-social"
              style={{ animationDelay: "0.15s" }}
            >
              <h3 className="text-xl font-bold mb-6">Connect With Me</h3>

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
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                  >
                    <div className={`w-11 h-11 rounded-xl ${social.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <social.icon className={social.color} size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{social.label}</p>
                      <p className="text-xs text-gray-500">{social.sublabel}</p>
                    </div>
                    <FaArrowRight className="ml-auto text-gray-700 group-hover:text-gray-400 group-hover:translate-x-1 transition-all duration-300 text-xs" />
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
