"use client";
import { GradientText } from "components/design-system/atoms";
import AuroraBackground from "components/design-system/organisms/AuroraBackground";
import Footer from "components/design-system/organisms/Footer";
import Header from "components/design-system/organisms/Header";
import { useI18n } from "lib/i18n";
import Link from "next/link";
import { FaHome, FaNewspaper } from "react-icons/fa";

/**
 * 404 template — the design-system version of the not-found page.
 *
 * Follows the same shell as the other routes (Header / aurora section /
 * Footer) and the same header idiom as BlogList: ghost background number,
 * `code-chip` label, bold two-tone title. Both CTAs are plain links with the
 * `.btn-primary` / `.btn-ghost` utilities, matching BlogSection/AdminPanel.
 */
export default function NotFoundTemplate() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen text-foreground">
      <Header />
      <section className="relative flex items-center min-h-[75vh] pt-36 pb-24 overflow-hidden">
        <AuroraBackground variant="hero" />

        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 text-center">
          <span aria-hidden="true" className="ghost-num">
            404
          </span>

          <span className="code-chip mb-6 inline-block">
            <span className="code-chip-num">404</span>
            {t("notfound.label")}
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.06] animate-fade-in-down">
            {t("notfound.title")}{" "}
            <GradientText>{t("notfound.title.highlight")}</GradientText>
          </h1>

          <p className="mt-5 mb-10 text-muted-foreground/70 max-w-md mx-auto animate-fade-in-up">
            {t("notfound.desc")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up">
            <Link
              href="/"
              className="btn-primary inline-flex items-center gap-2.5 rounded-xl px-7 py-3.5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <FaHome aria-hidden="true" />
              {t("notfound.home")}
            </Link>
            <Link
              href="/blog"
              className="btn-ghost inline-flex items-center gap-2.5 rounded-xl px-7 py-3.5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <FaNewspaper aria-hidden="true" />
              {t("notfound.blog")}
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
