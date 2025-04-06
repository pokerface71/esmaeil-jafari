import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/netliheart.svg"
                width={32}
                height={32}
                alt="Logo"
                className="hover:scale-110 transition-transform duration-300"
              />
            </Link>
          </div>

          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              <li>
                <Link
                  href="/?scroll=home"
                  className={`text-sm font-medium transition-colors duration-300 ${
                    currentPath.includes("home")
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/?scroll=about"
                  className={`text-sm font-medium transition-colors duration-300 ${
                    currentPath.includes("about")
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/?scroll=skills"
                  className={`text-sm font-medium transition-colors duration-300 ${
                    currentPath.includes("skills")
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/?scroll=experience"
                  className={`text-sm font-medium transition-colors duration-300 ${
                    currentPath.includes("experience")
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link
                  href="/?scroll=contact"
                  className={`text-sm font-medium transition-colors duration-300 ${
                    currentPath.includes("contact")
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <Link
            href="/Esmaeil_jafari-Resume.pdf"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center"
            download
          >
            <span className="mr-2">Download CV</span>
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
    </header>
  );
}
