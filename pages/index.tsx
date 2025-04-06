import Head from "next/head";
import Header from "@components/Layout/Header";
import Footer from "@components/Layout/Footer";
import Image from "next/image";
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
} from "react-icons/fa";
import {
  DiReact,
  DiJavascript1,
  DiNodejs,
  DiMongodb,
  DiGit,
  DiHtml5,
  DiCss3,
  DiSass,
  DiBootstrap,
  DiPhotoshop,
} from "react-icons/di";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

interface ScrollRefs {
  home: React.RefObject<HTMLDivElement>;
  about: React.RefObject<HTMLDivElement>;
  skills: React.RefObject<HTMLDivElement>;
  experience: React.RefObject<HTMLDivElement>;
  contact: React.RefObject<HTMLDivElement>;
}

const Home: React.FC = () => {
  const router = useRouter();
  const scroll = router.query.scroll as string;

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
        className="pt-20 pb-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Esmaeil Jafari
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                Frontend Developer
              </h2>
              <p className="text-lg mb-8">
                Passionate about creating elegant solutions to complex problems
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/esmaeil-jafari1992/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-200"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href="https://instagram.com/esmaeil_jafari_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-200"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=989052672239"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-200"
                >
                  <FaWhatsapp size={24} />
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src="/images/esmaeiljafari.jpg"
                  alt="Esmaeil Jafari"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={refs.about} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
          <div className="max-w-3xl mx-auto text-lg text-gray-700">
            <p className="mb-6">
              I am a front-end developer with a proven ability to collaborate
              effectively with senior developers. I always enjoy working as a
              team member and have a strong passion for learning new
              technologies.
            </p>
            <p>
              With experience working in programming teams and coordinating with
              colleagues, I bring a comprehensive approach to building web
              applications.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={refs.skills} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Skills</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="group flex items-center p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-105">
              <DiHtml5
                size={24}
                className="text-orange-600 mr-2 group-hover:text-orange-500 transition-colors duration-300"
              />
              <span className="text-sm font-medium group-hover:text-orange-600 transition-colors duration-300">
                HTML5
              </span>
            </div>
            <div className="group flex items-center p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-105">
              <DiCss3
                size={24}
                className="text-blue-600 mr-2 group-hover:text-blue-500 transition-colors duration-300"
              />
              <span className="text-sm font-medium group-hover:text-blue-600 transition-colors duration-300">
                CSS3
              </span>
            </div>
            <div className="group flex items-center p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-105">
              <DiSass
                size={24}
                className="text-pink-500 mr-2 group-hover:text-pink-400 transition-colors duration-300"
              />
              <span className="text-sm font-medium group-hover:text-pink-500 transition-colors duration-300">
                SASS
              </span>
            </div>
            <div className="group flex items-center p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-105">
              <DiJavascript1
                size={24}
                className="text-yellow-500 mr-2 group-hover:text-yellow-400 transition-colors duration-300"
              />
              <span className="text-sm font-medium group-hover:text-yellow-500 transition-colors duration-300">
                JavaScript
              </span>
            </div>
            <div className="group flex items-center p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-105">
              <DiReact
                size={24}
                className="text-blue-500 mr-2 group-hover:text-blue-400 transition-colors duration-300"
              />
              <span className="text-sm font-medium group-hover:text-blue-500 transition-colors duration-300">
                React
              </span>
            </div>
            <div className="group flex items-center p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-105">
              <DiBootstrap
                size={24}
                className="text-purple-500 mr-2 group-hover:text-purple-400 transition-colors duration-300"
              />
              <span className="text-sm font-medium group-hover:text-purple-500 transition-colors duration-300">
                Bootstrap
              </span>
            </div>
            <div className="group flex items-center p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-105">
              <DiGit
                size={24}
                className="text-orange-500 mr-2 group-hover:text-orange-400 transition-colors duration-300"
              />
              <span className="text-sm font-medium group-hover:text-orange-500 transition-colors duration-300">
                Git
              </span>
            </div>
            <div className="group flex items-center p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-105">
              <DiPhotoshop
                size={24}
                className="text-blue-400 mr-2 group-hover:text-blue-300 transition-colors duration-300"
              />
              <span className="text-sm font-medium group-hover:text-blue-400 transition-colors duration-300">
                Photoshop
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section ref={refs.experience} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Experience</h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative pl-8 pb-12 border-l-2 border-blue-500">
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-500"></div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">
                  Frontend Developer
                </h3>
                <p className="text-gray-600 mb-2">Dinawin</p>
                <p className="text-sm text-gray-500 mb-4">Jan 2022 - Present</p>
                <p className="text-gray-700">
                  Working on modernizing and refactoring legacy applications
                  using modern technologies. Implementing new features and
                  improving application performance.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Technologies: React | Next.js | TypeScript | Sass |
                  Text-to-Speech | SignalR | JavaScript | Micro Frontend
                </p>
              </div>
            </div>
            <div className="relative pl-8 pb-12 border-l-2 border-blue-500">
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-500"></div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">
                  Frontend Developer
                </h3>
                <p className="text-gray-600 mb-2">KetabPlus</p>
                <p className="text-sm text-gray-500 mb-4">
                  Mar 2021 - Feb 2022
                </p>
                <p className="text-gray-700">
                  Developed and maintained the website and its panel. Focused on
                  creating responsive and user-friendly interfaces.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Technologies: TypeScript | Next.js | React | Redux-Toolkit |
                  ReactBootstrap | Tailwind | SASS
                </p>
              </div>
            </div>
            <div className="relative pl-8 pb-12 border-l-2 border-blue-500">
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-500"></div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">
                  Frontend Developer
                </h3>
                <p className="text-gray-600 mb-2">SandBadCell</p>
                <p className="text-sm text-gray-500 mb-4">
                  Aug 2019 - Feb 2021
                </p>
                <p className="text-gray-700">
                  Developed and maintained the website and its panel for a B2B
                  platform.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Technologies: jQuery | React | Redux | ReactBootstrap |
                  Bootstrap | WordPress | PHP
                </p>
              </div>
            </div>
            <div className="relative pl-8 pb-12 border-l-2 border-blue-500">
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-500"></div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">
                  Frontend Developer
                </h3>
                <p className="text-gray-600 mb-2">WebNegah</p>
                <p className="text-sm text-gray-500 mb-4">
                  Jan 2015 - Jan 2017
                </p>
                <p className="text-gray-700">
                  Developed and maintained various web applications using
                  WordPress, DNN, and custom solutions. Focused on creating
                  responsive and SEO-friendly websites.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Technologies: WordPress | DNN | SEO | JavaScript | jQuery |
                  Bootstrap | OpenCart | Photoshop
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            GitHub Activity
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="w-full md:w-auto">
              <Image
                src="https://github-readme-stats-eight-theta.vercel.app/api?username=pokerface71&show_icons=true&theme=algolia&include_all_commits=true&count_private=true"
                alt="GitHub Stats"
                width={400}
                height={200}
                className="rounded-lg shadow-md"
              />
            </div>
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
      <section ref={refs.contact} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Contact Me
          </h2>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <FaPhone className="text-blue-500 mr-4" size={20} />
                <span className="text-gray-700">+98 905 267 2239</span>
              </div>
              <div className="flex items-center mb-4">
                <FaEnvelope className="text-blue-500 mr-4" size={20} />
                <span className="text-gray-700">
                  esmaeiljafari1992@gmail.com
                </span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-blue-500 mr-4" size={20} />
                <span className="text-gray-700">Tehran, Iran</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <FaWhatsapp className="text-green-500 mr-4" size={20} />
                <span className="text-gray-700">+98 905 267 2239</span>
              </div>
              <div className="flex items-center mb-4">
                <FaLinkedin className="text-blue-500 mr-4" size={20} />
                <a
                  href="https://www.linkedin.com/in/esmaeil-jafari1992/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-blue-500 transition-colors duration-300"
                >
                  linkedin.com/in/esmaeil-jafari1992
                </a>
              </div>
              <div className="flex items-center">
                <FaInstagram className="text-pink-500 mr-4" size={20} />
                <a
                  href="https://instagram.com/esmaeil_jafari_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-pink-500 transition-colors duration-300"
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
