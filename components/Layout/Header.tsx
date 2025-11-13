import { Button } from "@components/ui/button";
import { cn } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center neu-flat rounded-full p-2 neu-hover transition-all duration-300"
            >
              <Image
                src="/netliheart.svg"
                width={32}
                height={32}
                alt="Logo"
                className="transition-transform duration-300"
              />
            </Link>
          </div>

          <nav className="hidden md:block">
            <ul className="flex items-center space-x-4">
              <li>
                <Link
                  href="/?scroll=home"
                  className={cn(
                    "text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg neu-flat neu-hover",
                    currentPath.includes("home")
                      ? "text-primary neu-pressed"
                      : "text-foreground"
                  )}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/?scroll=about"
                  className={cn(
                    "text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg neu-flat neu-hover",
                    currentPath.includes("about")
                      ? "text-primary neu-pressed"
                      : "text-foreground"
                  )}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/?scroll=skills"
                  className={cn(
                    "text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg neu-flat neu-hover",
                    currentPath.includes("skills")
                      ? "text-primary neu-pressed"
                      : "text-foreground"
                  )}
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/?scroll=experience"
                  className={cn(
                    "text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg neu-flat neu-hover",
                    currentPath.includes("experience")
                      ? "text-primary neu-pressed"
                      : "text-foreground"
                  )}
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link
                  href="/?scroll=contact"
                  className={cn(
                    "text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg neu-flat neu-hover",
                    currentPath.includes("contact")
                      ? "text-primary neu-pressed"
                      : "text-foreground"
                  )}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <Button asChild variant="default" className="neu-flat">
            <Link href="/Esmaeil_jafari-Resume.pdf" download>
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
          </Button>
        </div>
      </div>
    </header>
  );
}
