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
  FaWhatsapp
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiTypescript
} from "react-icons/si";
import FloatingCircles from "@components/Layout/FloatingCircles";

interface ScrollRefs {
  home: React.RefObject<HTMLDivElement | null>;
  about: React.RefObject<HTMLDivElement | null>;
  skills: React.RefObject<HTMLDivElement | null>;
  experience: React.RefObject<HTMLDivElement | null>;
  contact: React.RefObject<HTMLDivElement | null>;
}

const Home: React.FC = () => {
  const router = useRouter();
  const scroll = router.query.scroll as string;
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

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

  // Intersection Observer for scroll animations
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

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Esmaeil Jafari - Frontend Developer</title>
        <meta
          name="description"
          content="Professional resume of Esmaeil Jafari"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {/* Hero Section */}
      <section
        ref={refs.home}
        className="pt-24 pb-20 bg-background relative overflow-hidden"
      >
        <FloatingCircles
          colors={["#ffffff", "#a5b4fc", "#818cf8", "#6366f1"]}
        />
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1
                data-animate="hero-title"
                className={`text-5xl md:text-6xl font-bold mb-4 tracking-tight text-foreground ${
                  isVisible["hero-title"] ? "animate-fade-in-down" : "opacity-0"
                }`}
                id="hero-title"
              >
                Esmaeil Jafari
              </h1>
              <h2
                data-animate="hero-subtitle"
                className={`text-3xl md:text-4xl font-semibold mb-6 text-primary ${
                  isVisible["hero-subtitle"]
                    ? "animate-fade-in-up"
                    : "opacity-0"
                }`}
                id="hero-subtitle"
                style={{ animationDelay: "0.2s" }}
              >
                Frontend Developer
              </h2>
              <p
                data-animate="hero-description"
                className={`text-xl mb-8 text-muted-foreground ${
                  isVisible["hero-description"]
                    ? "animate-fade-in-up"
                    : "opacity-0"
                }`}
                id="hero-description"
                style={{ animationDelay: "0.4s" }}
              >
                Passionate about creating elegant solutions to complex problems
              </p>
              <div
                data-animate="hero-social"
                className={`flex space-x-4 ${
                  isVisible["hero-social"] ? "animate-fade-in-up" : "opacity-0"
                }`}
                id="hero-social"
                style={{ animationDelay: "0.6s" }}
              >
                <a
                  href="https://www.linkedin.com/in/esmaeil-jafari1992/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neu-flat rounded-full p-4 neu-hover neu-active transition-all duration-300 text-foreground hover:text-primary hover:scale-110 transform"
                >
                  <FaLinkedin size={28} />
                </a>
                <a
                  href="https://instagram.com/esmaeil_jafari_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neu-flat rounded-full p-4 neu-hover neu-active transition-all duration-300 text-foreground hover:text-pink-500 hover:scale-110 transform"
                >
                  <FaInstagram size={28} />
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=989052672239"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neu-flat rounded-full p-4 neu-hover neu-active transition-all duration-300 text-foreground hover:text-green-500 hover:scale-110 transform"
                >
                  <FaWhatsapp size={28} />
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div
                data-animate="hero-image"
                className={`relative w-64 h-64 rounded-full overflow-hidden neu-flat neu-hover transition-all duration-300 animate-float ${
                  isVisible["hero-image"]
                    ? "animate-scale-in"
                    : "opacity-0 scale-90"
                }`}
                id="hero-image"
                style={{ animationDelay: "0.3s" }}
              >
                <Image
                  src="/Images/esmaeiljafari.jpg"
                  alt="Esmaeil Jafari"
                  fill
                  className="rounded-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        ref={refs.about}
        className="py-20 bg-background relative overflow-hidden"
      >
        <FloatingCircles
          colors={["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"]}
        />
        <div className="container mx-auto px-4">
          <h2
            data-animate="about-title"
            className={`text-4xl font-bold text-center mb-12 text-foreground ${
              isVisible["about-title"] ? "animate-fade-in-down" : "opacity-0"
            }`}
            id="about-title"
          >
            About Me
          </h2>
          <div
            data-animate="about-content"
            className={`max-w-3xl mx-auto text-lg text-foreground neu-flat p-8 rounded-xl ${
              isVisible["about-content"] ? "animate-fade-in-up" : "opacity-0"
            }`}
            id="about-content"
          >
            <p className="mb-6 leading-relaxed">
              I am a front-end developer with a proven ability to collaborate
              effectively with senior developers. I always enjoy working as a
              team member and have a strong passion for learning new
              technologies.
            </p>
            <p className="leading-relaxed">
              With experience working in programming teams and coordinating with
              colleagues, I bring a comprehensive approach to building web
              applications.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        ref={refs.skills}
        className="py-20 bg-background relative overflow-hidden"
      >
        <FloatingCircles
          colors={["#10b981", "#34d399", "#6ee7b7", "#a7f3d0"]}
        />
        <div className="container mx-auto px-4">
          <h2
            data-animate="skills-title"
            className={`text-4xl font-bold text-center mb-12 text-foreground ${
              isVisible["skills-title"] ? "animate-fade-in-down" : "opacity-0"
            }`}
            id="skills-title"
          >
            Skills
          </h2>
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 relative z-10">
              {[
                {
                  Icon: DiHtml5,
                  name: "HTML5",
                  color: "orange-600",
                  delay: "0.1s"
                },
                {
                  Icon: DiCss3,
                  name: "CSS3",
                  color: "blue-600",
                  delay: "0.15s"
                },
                {
                  Icon: DiSass,
                  name: "SASS",
                  color: "pink-500",
                  delay: "0.2s"
                },
                {
                  Icon: DiJavascript1,
                  name: "JavaScript",
                  color: "yellow-500",
                  delay: "0.25s"
                },
                {
                  Icon: DiReact,
                  name: "React",
                  color: "blue-500",
                  delay: "0.3s"
                },
                {
                  Icon: DiNodejs,
                  name: "Node.js",
                  color: "green-500",
                  delay: "0.35s"
                },
                {
                  Icon: DiWordpress,
                  name: "WordPress",
                  color: "blue-600",
                  delay: "0.4s"
                },
                {
                  Icon: DiGit,
                  name: "Git",
                  color: "orange-500",
                  delay: "0.45s"
                },
                {
                  Icon: DiBootstrap,
                  name: "Bootstrap",
                  color: "purple-500",
                  delay: "0.5s"
                },
                {
                  Icon: DiPhotoshop,
                  name: "Photoshop",
                  color: "blue-400",
                  delay: "0.55s"
                },
                {
                  Icon: SiNextdotjs,
                  name: "Next.js",
                  color: "black",
                  delay: "0.6s"
                },
                {
                  Icon: SiTypescript,
                  name: "TypeScript",
                  color: "blue-500",
                  delay: "0.65s"
                },
                {
                  Icon: SiTailwindcss,
                  name: "Tailwind",
                  color: "blue-400",
                  delay: "0.7s"
                },
                {
                  Icon: SiRedux,
                  name: "Redux",
                  color: "purple-500",
                  delay: "0.75s"
                },
                {
                  Icon: MuiIcon,
                  name: "MUI",
                  color: "blue-600",
                  delay: "0.8s",
                  isCustom: true
                }
              ].map((skill, index) => {
                const Icon = skill.Icon;
                return (
                  <div
                    key={index}
                    data-animate={`skill-${index}`}
                    className={`group flex flex-col items-center p-6 neu-flat rounded-xl neu-hover transition-all duration-300 ${
                      isVisible[`skill-${index}`]
                        ? "animate-scale-in"
                        : "opacity-0 scale-90"
                    }`}
                    id={`skill-${index}`}
                    style={{ animationDelay: skill.delay }}
                  >
                    <Icon
                      size={48}
                      className={`${
                        skill.isCustom
                          ? "mb-4 group-hover:opacity-80 transition-opacity duration-300"
                          : `text-${
                              skill.color
                            } mb-4 group-hover:text-${skill.color
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
                        skill.isCustom
                          ? "group-hover:text-blue-600"
                          : `group-hover:text-${skill.color}`
                      } transition-colors duration-300`}
                    >
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        ref={refs.experience}
        className="py-20 bg-background relative overflow-hidden"
      >
        <FloatingCircles
          colors={["#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe"]}
        />
        <div className="container mx-auto px-4">
          <h2
            data-animate="experience-title"
            className={`text-4xl font-bold text-center mb-12 text-foreground ${
              isVisible["experience-title"]
                ? "animate-fade-in-down"
                : "opacity-0"
            }`}
            id="experience-title"
          >
            Experience
          </h2>
          <div className="relative">
            <div className="max-w-3xl mx-auto space-y-8 relative z-10">
              <div
                data-animate="experience-0"
                className={`relative pl-8 pb-12 border-l-4 border-primary ${
                  isVisible["experience-0"]
                    ? "animate-slide-in-left"
                    : "opacity-0 translate-x-[-50px]"
                }`}
                id="experience-0"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="absolute left-[-12px] top-0 w-6 h-6 rounded-full bg-primary neu-flat animate-pulse"></div>
                <div className="neu-flat p-8 rounded-xl neu-hover transition-all duration-300 hover:scale-[1.02]">
                  <h3 className="text-2xl font-semibold mb-2 text-foreground">
                    Frontend Developer
                  </h3>
                  <p className="text-lg text-muted-foreground mb-2">Otaghak</p>
                  <p className="text-sm text-muted-foreground mb-4">Oct 2025</p>
                  <p className="text-foreground leading-relaxed">
                    Otaghak is a leading online platform for booking villas,
                    apartments, and accommodations across Iran, Turkey, Armenia,
                    and South Africa. As a Frontend Developer, I contributed to
                    the development and enhancement of the platform's user
                    interface, focusing on creating seamless booking experiences
                    and improving user engagement. The platform features over
                    38,000 accommodations and provides users with comprehensive
                    search and filtering capabilities.
                  </p>
                  <p className="text-foreground leading-relaxed mt-4 animate-fade-in">
                    During my time at Otaghak, I worked on optimizing the
                    booking flow, enhancing the search functionality, and
                    improving the overall user experience across different
                    device types. The platform serves as a comprehensive
                    solution for travelers seeking accommodations, with features
                    including real-time availability, detailed property
                    listings, and secure booking processes.
                  </p>
                  <p className="text-sm text-muted-foreground mt-4 animate-fade-in">
                    Website:{" "}
                    <a
                      href="https://www.otaghak.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 underline"
                    >
                      www.otaghak.com
                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 animate-fade-in">
                    Technologies: React | Next.js | TypeScript | Modern Frontend
                    Technologies
                  </p>
                </div>
              </div>
              <div className="relative pl-8 pb-12 border-l-4 border-primary animate-slide-in-left">
                <div className="absolute left-[-12px] top-0 w-6 h-6 rounded-full bg-primary neu-flat animate-pulse"></div>
                <div className="neu-flat p-8 rounded-xl neu-hover transition-all duration-300">
                  <h3 className="text-2xl font-semibold mb-2 text-foreground animate-fade-in">
                    Frontend Developer
                  </h3>
                  <p className="text-lg text-muted-foreground mb-2 animate-fade-in">
                    Dinawin
                  </p>
                  <p className="text-sm text-muted-foreground mb-4 animate-fade-in">
                    Jan 2022 - Present
                  </p>
                  <p className="text-foreground leading-relaxed animate-fade-in">
                    Dinawin is a leading company in the automotive spare parts
                    industry with multiple applications. As a Frontend
                    Developer, my primary responsibility is to modernize and
                    refactor the legacy application from the ground up. This
                    involves implementing modern technologies, improving
                    application performance, and ensuring a seamless user
                    experience across all platforms. I have contributed to the
                    development of several key platforms including:
                  </p>
                  <ul className="list-disc list-inside mt-2 text-foreground animate-fade-in">
                    <li className="hover:text-primary transition-colors duration-300">
                      Baaz.ir - The main platform for automotive spare parts,
                      featuring advanced search capabilities and real-time
                      inventory management
                    </li>
                    <li className="hover:text-primary transition-colors duration-300">
                      Karban.Baaz.ir - Specialized Task Management System with
                      comprehensive workflow automation and reporting features
                    </li>
                    <li className="hover:text-primary transition-colors duration-300">
                      Shop.Baaz.ir - E-commerce platform for spare parts with
                      integrated payment gateways and order tracking
                    </li>
                    <li className="hover:text-primary transition-colors duration-300">
                      Akorayan.com - Additional platform for automotive services
                      with customer relationship management features
                    </li>
                  </ul>
                  <p className="text-foreground leading-relaxed animate-fade-in">
                    My work focuses on creating scalable, maintainable, and
                    high-performance applications that deliver exceptional user
                    experiences while meeting business objectives.
                  </p>
                  <p className="text-sm text-muted-foreground mt-4 animate-fade-in">
                    Technologies: React | Next.js | TypeScript | Sass |
                    Text-to-Speech | SignalR | JavaScript | Micro Frontend |
                    Redux | MUI | Zustand | React Query
                  </p>
                </div>
              </div>
              <div className="relative pl-8 pb-12 border-l-4 border-primary animate-slide-in-left">
                <div className="absolute left-[-12px] top-0 w-6 h-6 rounded-full bg-primary neu-flat animate-pulse"></div>
                <div className="neu-flat p-8 rounded-xl neu-hover transition-all duration-300">
                  <h3 className="text-2xl font-semibold mb-2 text-foreground animate-fade-in">
                    Frontend Developer
                  </h3>
                  <p className="text-lg text-muted-foreground mb-2 animate-fade-in">
                    KetabPlus
                  </p>
                  <p className="text-sm text-muted-foreground mb-4 animate-fade-in">
                    Mar 2021 - Feb 2022
                  </p>
                  <p className="text-foreground leading-relaxed animate-fade-in">
                    KetabPlus is an innovative startup in the book industry,
                    dedicated to promoting reading culture and making books more
                    accessible to people. As a Frontend Developer, I was
                    responsible for refactoring, developing, and maintaining
                    both the public website and the admin panel. My work focused
                    on creating responsive and user-friendly interfaces that
                    enhanced the overall user experience and encouraged book
                    purchases.
                  </p>
                  <p className="text-sm text-muted-foreground mt-4 animate-fade-in">
                    Technologies: TypeScript | Next.js | React | Redux-Toolkit |
                    ReactBootstrap | Tailwind | SASS
                  </p>
                </div>
              </div>
              <div className="relative pl-8 pb-12 border-l-4 border-primary animate-slide-in-left">
                <div className="absolute left-[-12px] top-0 w-6 h-6 rounded-full bg-primary neu-flat animate-pulse"></div>
                <div className="neu-flat p-8 rounded-xl neu-hover transition-all duration-300">
                  <h3 className="text-2xl font-semibold mb-2 text-foreground animate-fade-in">
                    Frontend Developer
                  </h3>
                  <p className="text-lg text-muted-foreground mb-2 animate-fade-in">
                    SandBadCell
                  </p>
                  <p className="text-sm text-muted-foreground mb-4 animate-fade-in">
                    Aug 2019 - Feb 2021
                  </p>
                  <p className="text-foreground leading-relaxed animate-fade-in">
                    SandBadCell is a B2B platform developed by Ahoora Company,
                    specializing in business-to-business transactions. As a
                    Frontend Developer, I was responsible for developing and
                    maintaining both the public-facing website and the
                    administrative panel. My work focused on creating efficient
                    and user-friendly interfaces that facilitated seamless
                    business transactions between companies.
                  </p>
                  <p className="text-sm text-muted-foreground mt-4 animate-fade-in">
                    Technologies: jQuery | React | Redux | ReactBootstrap |
                    Bootstrap | WordPress | PHP
                  </p>
                </div>
              </div>
              <div className="relative pl-8 pb-12 border-l-4 border-primary animate-slide-in-left">
                <div className="absolute left-[-12px] top-0 w-6 h-6 rounded-full bg-primary neu-flat animate-pulse"></div>
                <div className="neu-flat p-8 rounded-xl neu-hover transition-all duration-300">
                  <h3 className="text-2xl font-semibold mb-2 text-foreground animate-fade-in">
                    Frontend Developer
                  </h3>
                  <p className="text-lg text-muted-foreground mb-2 animate-fade-in">
                    Seoraz | Simagar
                  </p>
                  <p className="text-sm text-muted-foreground mb-4 animate-fade-in">
                    Feb 2017 - Aug 2019
                  </p>
                  <p className="text-foreground leading-relaxed animate-fade-in">
                    Seoraz is a fully Bundled Services Provider of Web Design,
                    Development, Corporate Identity, Mobile Apps along with SEO
                    and Social Media. As a Frontend Developer, I contributed to
                    various web projects, focusing on creating responsive and
                    visually appealing interfaces that aligned with client
                    branding and business objectives.
                  </p>
                  <p className="text-sm text-muted-foreground mt-4 animate-fade-in">
                    Technologies: JavaScript | jQuery | React | Bootstrap |
                    WordPress | SEO
                  </p>
                </div>
              </div>
              <div className="relative pl-8 pb-12 border-l-4 border-primary animate-slide-in-left">
                <div className="absolute left-[-12px] top-0 w-6 h-6 rounded-full bg-primary neu-flat animate-pulse"></div>
                <div className="neu-flat p-8 rounded-xl neu-hover transition-all duration-300">
                  <h3 className="text-2xl font-semibold mb-2 text-foreground animate-fade-in">
                    Frontend Developer
                  </h3>
                  <p className="text-lg text-muted-foreground mb-2 animate-fade-in">
                    WebNegah
                  </p>
                  <p className="text-sm text-muted-foreground mb-4 animate-fade-in">
                    Jan 2015 - Jan 2017
                  </p>
                  <p className="text-foreground leading-relaxed animate-fade-in">
                    WebNegah is a well-established programming company with over
                    20 years of experience in web development. As a Frontend
                    Developer, I was responsible for designing and developing
                    websites tailored to specific customer requirements. My work
                    involved creating responsive, SEO-friendly websites using
                    various technologies, ensuring they met both client
                    expectations and industry standards.
                  </p>
                  <p className="text-sm text-muted-foreground mt-4 animate-fade-in">
                    Technologies: WordPress | DNN | SEO | JavaScript | jQuery |
                    Bootstrap | OpenCart | Photoshop
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Stats Section */}
      <section className="py-16 bg-background relative overflow-hidden">
        <FloatingCircles
          colors={["#f59e0b", "#fbbf24", "#fcd34d", "#fde68a"]}
        />
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            GitHub Activity
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="w-full md:w-auto neu-flat rounded-lg p-4">
              <Image
                src="https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=pokerface71&layout=compact&langs_count=8&theme=algolia"
                alt="Top Languages"
                width={400}
                height={200}
                className="rounded-lg"
                unoptimized={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        ref={refs.contact}
        className="py-20 bg-background relative overflow-hidden"
      >
        <FloatingCircles
          colors={["#ec4899", "#f472b6", "#f9a8d4", "#fbcfe8"]}
        />
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Contact Me
          </h2>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="neu-flat p-8 rounded-xl neu-hover transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full neu-pressed flex items-center justify-center mr-4">
                  <FaPhone className="text-primary" size={20} />
                </div>
                <span className="text-lg text-foreground">
                  +98 905 267 2239
                </span>
              </div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full neu-pressed flex items-center justify-center mr-4">
                  <FaEnvelope className="text-primary" size={20} />
                </div>
                <span className="text-lg text-foreground">
                  esmaeiljafari1992@gmail.com
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full neu-pressed flex items-center justify-center mr-4">
                  <FaMapMarkerAlt className="text-primary" size={20} />
                </div>
                <span className="text-lg text-foreground">Tehran, Iran</span>
              </div>
            </div>
            <div className="neu-flat p-8 rounded-xl neu-hover transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full neu-pressed flex items-center justify-center mr-4">
                  <FaWhatsapp className="text-green-500" size={20} />
                </div>
                <span className="text-lg text-foreground">
                  +98 905 267 2239
                </span>
              </div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full neu-pressed flex items-center justify-center mr-4">
                  <FaLinkedin className="text-primary" size={20} />
                </div>
                <a
                  href="https://www.linkedin.com/in/esmaeil-jafari1992/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-foreground hover:text-primary transition-colors duration-300"
                >
                  linkedin.com/in/esmaeil-jafari1992
                </a>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full neu-pressed flex items-center justify-center mr-4">
                  <FaInstagram className="text-pink-500" size={20} />
                </div>
                <a
                  href="https://instagram.com/esmaeil_jafari_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-foreground hover:text-pink-500 transition-colors duration-300"
                >
                  @esmaeil_jafari_official
                </a>
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
