import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import {
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import {
  DiHtml5,
  DiCss3,
  DiJavascript1,
  DiReact,
  DiSass,
  DiBootstrap,
  DiGit,
  DiPhotoshop,
} from "react-icons/di";

interface ScrollRefs {
  home: React.RefObject<HTMLDivElement>;
  about: React.RefObject<HTMLDivElement>;
  skills: React.RefObject<HTMLDivElement>;
  experience: React.RefObject<HTMLDivElement>;
  contact: React.RefObject<HTMLDivElement>;
}

const Home: React.FC = () => {
  const router = useRouter();
  const refs = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const { scroll } = router.query;
    if (
      scroll &&
      typeof scroll === "string" &&
      refs[scroll as keyof ScrollRefs]?.current
    ) {
      refs[scroll as keyof ScrollRefs]?.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [router.query]);

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
        // ... existing hero section code ...
      </section>

      {/* About Section */}
      <section ref={refs.about} className="py-16 bg-white">
        // ... existing about section code ...
      </section>

      {/* Skills Section */}
      <section ref={refs.skills} className="py-16 bg-gray-50">
        // ... existing skills section code ...
      </section>

      {/* Experience Section */}
      <section ref={refs.experience} className="py-16 bg-white">
        // ... existing experience section code ...
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
        // ... existing contact section code ...
      </section>

      <Footer />
    </div>
  );
};

export default Home;
