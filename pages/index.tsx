import MuiIcon from "@components/Icons/MuiIcon";
import Footer from "@components/Layout/Footer";
import Header from "@components/Layout/Header";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
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

  return (
    <div className="min-h-screen bg-gray-50">
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
        className="pt-24 pb-20 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white relative overflow-hidden"
      >
        <FloatingCircles
          colors={["#ffffff", "#a5b4fc", "#818cf8", "#6366f1"]}
        />
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
                Esmaeil Jafari
              </h1>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-blue-200">
                Frontend Developer
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Passionate about creating elegant solutions to complex problems
              </p>
              <div className="flex space-x-6">
                <a
                  href="https://www.linkedin.com/in/esmaeil-jafari1992/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-200 transition-colors duration-300 transform hover:scale-110"
                >
                  <FaLinkedin size={28} />
                </a>
                <a
                  href="https://instagram.com/esmaeil_jafari_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-200 transition-colors duration-300 transform hover:scale-110"
                >
                  <FaInstagram size={28} />
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=989052672239"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-200 transition-colors duration-300 transform hover:scale-110"
                >
                  <FaWhatsapp size={28} />
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl transform hover:scale-105 transition-transform duration-300">
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
        className="py-20 bg-white relative overflow-hidden"
      >
        <FloatingCircles
          colors={["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"]}
        />
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            About Me
          </h2>
          <div className="max-w-3xl mx-auto text-lg text-gray-700 bg-gray-50 p-8 rounded-xl shadow-lg">
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
        className="py-20 bg-gray-50 relative overflow-hidden"
      >
        <FloatingCircles
          colors={["#10b981", "#34d399", "#6ee7b7", "#a7f3d0"]}
        />
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Skills
          </h2>
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 relative z-10">
              <div className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <DiHtml5
                  size={48}
                  className="text-orange-600 mb-4 group-hover:text-orange-500 transition-colors duration-300"
                />
                <span className="text-lg font-medium text-gray-700 group-hover:text-orange-600 transition-colors duration-300">
                  HTML5
                </span>
              </div>
              <div className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <DiCss3
                  size={48}
                  className="text-blue-600 mb-4 group-hover:text-blue-500 transition-colors duration-300"
                />
                <span className="text-lg font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                  CSS3
                </span>
              </div>
              <div className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <DiSass
                  size={48}
                  className="text-pink-500 mb-4 group-hover:text-pink-400 transition-colors duration-300"
                />
                <span className="text-lg font-medium text-gray-700 group-hover:text-pink-500 transition-colors duration-300">
                  SASS
                </span>
              </div>
              <div className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <DiJavascript1
                  size={48}
                  className="text-yellow-500 mb-4 group-hover:text-yellow-400 transition-colors duration-300"
                />
                <span className="text-lg font-medium text-gray-700 group-hover:text-yellow-500 transition-colors duration-300">
                  JavaScript
                </span>
              </div>
              <div className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <DiReact
                  size={48}
                  className="text-blue-500 mb-4 group-hover:text-blue-400 transition-colors duration-300"
                />
                <span className="text-lg font-medium text-gray-700 group-hover:text-blue-500 transition-colors duration-300">
                  React
                </span>
              </div>
              <div className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <DiNodejs
                  size={48}
                  className="text-green-500 mb-4 group-hover:text-green-400 transition-colors duration-300"
                />
                <span className="text-lg font-medium text-gray-700 group-hover:text-green-500 transition-colors duration-300">
                  Node.js
                </span>
              </div>
              <div className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <DiWordpress
                  size={48}
                  className="text-blue-600 mb-4 group-hover:text-blue-500 transition-colors duration-300"
                />
                <span className="text-lg font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                  WordPress
                </span>
              </div>
              <div className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <DiGit
                  size={48}
                  className="text-orange-500 mb-4 group-hover:text-orange-400 transition-colors duration-300"
                />
                <span className="text-lg font-medium text-gray-700 group-hover:text-orange-500 transition-colors duration-300">
                  Git
                </span>
              </div>
              <div className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <DiBootstrap
                  size={48}
                  className="text-purple-500 mb-4 group-hover:text-purple-400 transition-colors duration-300"
                />
                <span className="text-lg font-medium text-gray-700 group-hover:text-purple-500 transition-colors duration-300">
                  Bootstrap
                </span>
              </div>
              <div className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <DiPhotoshop
                  size={48}
                  className="text-blue-400 mb-4 group-hover:text-blue-300 transition-colors duration-300"
                />
                <span className="text-lg font-medium text-gray-700 group-hover:text-blue-400 transition-colors duration-300">
                  Photoshop
                </span>
              </div>
              <div className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <SiNextdotjs
                  size={48}
                  className="text-black mb-4 group-hover:text-gray-700 transition-colors duration-300"
                />
                <span className="text-lg font-medium text-gray-700 group-hover:text-black transition-colors duration-300">
                  Next.js
                </span>
              </div>
              <div className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <SiTypescript
                  size={48}
                  className="text-blue-500 mb-4 group-hover:text-blue-400 transition-colors duration-300"
                />
                <span className="text-lg font-medium text-gray-700 group-hover:text-blue-500 transition-colors duration-300">
                  TypeScript
                </span>
              </div>
              <div className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <SiTailwindcss
                  size={48}
                  className="text-blue-400 mb-4 group-hover:text-blue-300 transition-colors duration-300"
                />
                <span className="text-lg font-medium text-gray-700 group-hover:text-blue-400 transition-colors duration-300">
                  Tailwind
                </span>
              </div>
              <div className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <SiRedux
                  size={48}
                  className="text-purple-500 mb-4 group-hover:text-purple-400 transition-colors duration-300"
                />
                <span className="text-lg font-medium text-gray-700 group-hover:text-purple-500 transition-colors duration-300">
                  Redux
                </span>
              </div>
              <div className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <MuiIcon
                  size={48}
                  className="mb-4 group-hover:opacity-80 transition-opacity duration-300"
                />
                <span className="text-lg font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                  MUI
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        ref={refs.experience}
        className="py-20 bg-white relative overflow-hidden"
      >
        <FloatingCircles
          colors={["#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe"]}
        />
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 animate-fade-in">
            Experience
          </h2>
          <div className="relative">
            <div className="max-w-3xl mx-auto space-y-8 relative z-10">
              <div className="relative pl-8 pb-12 border-l-4 border-blue-500 animate-slide-in-left">
                <div className="absolute left-[-12px] top-0 w-6 h-6 rounded-full bg-blue-500 shadow-lg animate-pulse"></div>
                <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800 animate-fade-in">
                    Frontend Developer
                  </h3>
                  <p className="text-lg text-gray-600 mb-2 animate-fade-in">
                    Otaghak
                  </p>
                  <p className="text-sm text-gray-500 mb-4 animate-fade-in">
                    Oct 2025
                  </p>
                  <p className="text-gray-700 leading-relaxed animate-fade-in">
                    Otaghak is a leading online platform for booking villas,
                    apartments, and accommodations across Iran, Turkey, Armenia,
                    and South Africa. As a Frontend Developer, I contributed to
                    the development and enhancement of the platform's user
                    interface, focusing on creating seamless booking experiences
                    and improving user engagement. The platform features over
                    38,000 accommodations and provides users with comprehensive
                    search and filtering capabilities.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-4 animate-fade-in">
                    During my time at Otaghak, I worked on optimizing the
                    booking flow, enhancing the search functionality, and
                    improving the overall user experience across different
                    device types. The platform serves as a comprehensive
                    solution for travelers seeking accommodations, with features
                    including real-time availability, detailed property
                    listings, and secure booking processes.
                  </p>
                  <p className="text-sm text-gray-600 mt-4 animate-fade-in">
                    Website:{" "}
                    <a
                      href="https://www.otaghak.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      www.otaghak.com
                    </a>
                  </p>
                  <p className="text-sm text-gray-600 mt-2 animate-fade-in">
                    Technologies: React | Next.js | TypeScript | Modern Frontend
                    Technologies
                  </p>
                </div>
              </div>
              <div className="relative pl-8 pb-12 border-l-4 border-blue-500 animate-slide-in-left">
                <div className="absolute left-[-12px] top-0 w-6 h-6 rounded-full bg-blue-500 shadow-lg animate-pulse"></div>
                <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800 animate-fade-in">
                    Frontend Developer
                  </h3>
                  <p className="text-lg text-gray-600 mb-2 animate-fade-in">
                    Dinawin
                  </p>
                  <p className="text-sm text-gray-500 mb-4 animate-fade-in">
                    Jan 2022 - Present
                  </p>
                  <p className="text-gray-700 leading-relaxed animate-fade-in">
                    Dinawin is a leading company in the automotive spare parts
                    industry with multiple applications. As a Frontend
                    Developer, my primary responsibility is to modernize and
                    refactor the legacy application from the ground up. This
                    involves implementing modern technologies, improving
                    application performance, and ensuring a seamless user
                    experience across all platforms. I have contributed to the
                    development of several key platforms including:
                  </p>
                  <ul className="list-disc list-inside mt-2 text-gray-700 animate-fade-in">
                    <li className="hover:text-blue-600 transition-colors duration-300">
                      Baaz.ir - The main platform for automotive spare parts,
                      featuring advanced search capabilities and real-time
                      inventory management
                    </li>
                    <li className="hover:text-blue-600 transition-colors duration-300">
                      Karban.Baaz.ir - Specialized Task Management System with
                      comprehensive workflow automation and reporting features
                    </li>
                    <li className="hover:text-blue-600 transition-colors duration-300">
                      Shop.Baaz.ir - E-commerce platform for spare parts with
                      integrated payment gateways and order tracking
                    </li>
                    <li className="hover:text-blue-600 transition-colors duration-300">
                      Akorayan.com - Additional platform for automotive services
                      with customer relationship management features
                    </li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed animate-fade-in">
                    My work focuses on creating scalable, maintainable, and
                    high-performance applications that deliver exceptional user
                    experiences while meeting business objectives.
                  </p>
                  <p className="text-sm text-gray-600 mt-4 animate-fade-in">
                    Technologies: React | Next.js | TypeScript | Sass |
                    Text-to-Speech | SignalR | JavaScript | Micro Frontend |
                    Redux | MUI | Zustand | React Query
                  </p>
                </div>
              </div>
              <div className="relative pl-8 pb-12 border-l-4 border-blue-500 animate-slide-in-left">
                <div className="absolute left-[-12px] top-0 w-6 h-6 rounded-full bg-blue-500 shadow-lg animate-pulse"></div>
                <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800 animate-fade-in">
                    Frontend Developer
                  </h3>
                  <p className="text-lg text-gray-600 mb-2 animate-fade-in">
                    KetabPlus
                  </p>
                  <p className="text-sm text-gray-500 mb-4 animate-fade-in">
                    Mar 2021 - Feb 2022
                  </p>
                  <p className="text-gray-700 leading-relaxed animate-fade-in">
                    KetabPlus is an innovative startup in the book industry,
                    dedicated to promoting reading culture and making books more
                    accessible to people. As a Frontend Developer, I was
                    responsible for refactoring, developing, and maintaining
                    both the public website and the admin panel. My work focused
                    on creating responsive and user-friendly interfaces that
                    enhanced the overall user experience and encouraged book
                    purchases.
                  </p>
                  <p className="text-sm text-gray-600 mt-4 animate-fade-in">
                    Technologies: TypeScript | Next.js | React | Redux-Toolkit |
                    ReactBootstrap | Tailwind | SASS
                  </p>
                </div>
              </div>
              <div className="relative pl-8 pb-12 border-l-4 border-blue-500 animate-slide-in-left">
                <div className="absolute left-[-12px] top-0 w-6 h-6 rounded-full bg-blue-500 shadow-lg animate-pulse"></div>
                <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800 animate-fade-in">
                    Frontend Developer
                  </h3>
                  <p className="text-lg text-gray-600 mb-2 animate-fade-in">
                    SandBadCell
                  </p>
                  <p className="text-sm text-gray-500 mb-4 animate-fade-in">
                    Aug 2019 - Feb 2021
                  </p>
                  <p className="text-gray-700 leading-relaxed animate-fade-in">
                    SandBadCell is a B2B platform developed by Ahoora Company,
                    specializing in business-to-business transactions. As a
                    Frontend Developer, I was responsible for developing and
                    maintaining both the public-facing website and the
                    administrative panel. My work focused on creating efficient
                    and user-friendly interfaces that facilitated seamless
                    business transactions between companies.
                  </p>
                  <p className="text-sm text-gray-600 mt-4 animate-fade-in">
                    Technologies: jQuery | React | Redux | ReactBootstrap |
                    Bootstrap | WordPress | PHP
                  </p>
                </div>
              </div>
              <div className="relative pl-8 pb-12 border-l-4 border-blue-500 animate-slide-in-left">
                <div className="absolute left-[-12px] top-0 w-6 h-6 rounded-full bg-blue-500 shadow-lg animate-pulse"></div>
                <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800 animate-fade-in">
                    Frontend Developer
                  </h3>
                  <p className="text-lg text-gray-600 mb-2 animate-fade-in">
                    Seoraz | Simagar
                  </p>
                  <p className="text-sm text-gray-500 mb-4 animate-fade-in">
                    Feb 2017 - Aug 2019
                  </p>
                  <p className="text-gray-700 leading-relaxed animate-fade-in">
                    Seoraz is a fully Bundled Services Provider of Web Design,
                    Development, Corporate Identity, Mobile Apps along with SEO
                    and Social Media. As a Frontend Developer, I contributed to
                    various web projects, focusing on creating responsive and
                    visually appealing interfaces that aligned with client
                    branding and business objectives.
                  </p>
                  <p className="text-sm text-gray-600 mt-4 animate-fade-in">
                    Technologies: JavaScript | jQuery | React | Bootstrap |
                    WordPress | SEO
                  </p>
                </div>
              </div>
              <div className="relative pl-8 pb-12 border-l-4 border-blue-500 animate-slide-in-left">
                <div className="absolute left-[-12px] top-0 w-6 h-6 rounded-full bg-blue-500 shadow-lg animate-pulse"></div>
                <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800 animate-fade-in">
                    Frontend Developer
                  </h3>
                  <p className="text-lg text-gray-600 mb-2 animate-fade-in">
                    WebNegah
                  </p>
                  <p className="text-sm text-gray-500 mb-4 animate-fade-in">
                    Jan 2015 - Jan 2017
                  </p>
                  <p className="text-gray-700 leading-relaxed animate-fade-in">
                    WebNegah is a well-established programming company with over
                    20 years of experience in web development. As a Frontend
                    Developer, I was responsible for designing and developing
                    websites tailored to specific customer requirements. My work
                    involved creating responsive, SEO-friendly websites using
                    various technologies, ensuring they met both client
                    expectations and industry standards.
                  </p>
                  <p className="text-sm text-gray-600 mt-4 animate-fade-in">
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
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        <FloatingCircles
          colors={["#f59e0b", "#fbbf24", "#fcd34d", "#fde68a"]}
        />
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            GitHub Activity
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="w-full md:w-auto">
              <Image
                src="https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=pokerface71&layout=compact&langs_count=8&theme=algolia"
                alt="Top Languages"
                width={400}
                height={200}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        ref={refs.contact}
        className="py-20 bg-gray-50 relative overflow-hidden"
      >
        <FloatingCircles
          colors={["#ec4899", "#f472b6", "#f9a8d4", "#fbcfe8"]}
        />
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Contact Me
          </h2>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <FaPhone className="text-blue-500" size={20} />
                </div>
                <span className="text-lg text-gray-700">+98 905 267 2239</span>
              </div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <FaEnvelope className="text-blue-500" size={20} />
                </div>
                <span className="text-lg text-gray-700">
                  esmaeiljafari1992@gmail.com
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <FaMapMarkerAlt className="text-blue-500" size={20} />
                </div>
                <span className="text-lg text-gray-700">Tehran, Iran</span>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <FaWhatsapp className="text-green-500" size={20} />
                </div>
                <span className="text-lg text-gray-700">+98 905 267 2239</span>
              </div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <FaLinkedin className="text-blue-500" size={20} />
                </div>
                <a
                  href="https://www.linkedin.com/in/esmaeil-jafari1992/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-gray-700 hover:text-blue-500 transition-colors duration-300"
                >
                  linkedin.com/in/esmaeil-jafari1992
                </a>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mr-4">
                  <FaInstagram className="text-pink-500" size={20} />
                </div>
                <a
                  href="https://instagram.com/esmaeil_jafari_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-gray-700 hover:text-pink-500 transition-colors duration-300"
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
