import Link from "next/link";
import { useRouter } from "next/router";
import { FaArrowLeft, FaCalendarAlt, FaTag } from "react-icons/fa";
import AuroraBackground from "@components/Layout/AuroraBackground";
import Header from "@components/Layout/Header";
import Footer from "@components/Layout/Footer";
import MarkdownRenderer from "@components/Blog/MarkdownRenderer";
import { useI18n } from "lib/i18n";
import {
  getPostBySlugRaw,
  getPublishedSlugs,
  toPostView,
  type Post,
} from "lib/supabase";
import { coverArtDataUri } from "lib/coverArt";
import { cn } from "lib/utils";

export const revalidate = 60; // ISR

interface BlogPostPageProps {
  post: Post | null;
}

function formatDate(iso: string | null, locale: string): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return new Date(iso).toLocaleDateString("en", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  const router = useRouter();
  const { t, locale, dir } = useI18n();

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        …
      </div>
    );
  }

  const view = post ? toPostView(post, locale) : null;

  if (!view) {
    return (
      <div className="min-h-screen text-foreground">
        <Header />
        <section className="relative pt-40 pb-24">
          <AuroraBackground variant="default" />
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <h1 className="text-3xl font-black mb-4">{t("blog.not_found")}</h1>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-violet-300 hover:text-violet-200 transition-colors"
            >
              <FaArrowLeft className={cn("text-xs", dir === "rtl" && "rotate-180")} />
              {t("blog.back")}
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-foreground">
      <Header />

      <article className="relative pt-36 pb-20 overflow-hidden">
        <AuroraBackground variant="default" />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          {/* Back link */}
          <Link
            href="/blog"
            className={cn(
              "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8",
              dir === "rtl" && "flex-row-reverse"
            )}
          >
            <FaArrowLeft className={cn("text-xs", dir === "rtl" && "rotate-180")} />
            {t("blog.back")}
          </Link>

          {/* Cover image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              view.cover_image_url ||
              coverArtDataUri({
                seed: view.id,
                tags: view.tags,
                label: view.tags?.[0] ?? view.slug,
              })
            }
            alt={view.title}
            className="w-full h-auto rounded-3xl border border-white/10 mb-8"
          />

          {/* Meta */}
          <div
            className={cn(
              "flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4",
              dir === "rtl" && "flex-row-reverse"
            )}
          >
            {view.published_at && (
              <span className="inline-flex items-center gap-1.5">
                <FaCalendarAlt className="text-violet-300/70" />
                {formatDate(view.published_at, locale)}
              </span>
            )}
            {view.tags && view.tags.length > 0 && (
              <span className="inline-flex items-center gap-1.5 flex-wrap">
                <FaTag className="text-fuchsia-300/70" />
                {view.tags.map((tag) => (
                  <span key={tag} className="skill-tag">
                    {tag}
                  </span>
                ))}
              </span>
            )}
          </div>

          {/* Title + excerpt */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] mb-4">
            {view.title}
          </h1>
          {view.excerpt && (
            <p
              className={cn(
                "text-muted-foreground/80 leading-relaxed mb-10 border-s-2 border-violet-400/40 ps-4",
                dir === "rtl" && "border-s-0 border-e-2 border-e-violet-400/40 ps-0 pe-4 text-right"
              )}
            >
              {view.excerpt}
            </p>
          )}

          {/* Content */}
          <MarkdownRenderer content={view.content} />

          {/* Footer of article */}
          <div className="mt-14 pt-8 border-t border-white/10">
            <Link
              href="/blog"
              className={cn(
                "inline-flex items-center gap-2 text-sm font-semibold text-violet-300 hover:text-violet-200 transition-colors",
                dir === "rtl" && "flex-row-reverse"
              )}
            >
              <FaArrowLeft className={cn("text-xs", dir === "rtl" && "rotate-180")} />
              {t("blog.back")}
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const slugs = await getPublishedSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: "blocking", // new posts render on first visit, then cache
  };
}

export async function getStaticProps({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlugRaw(params.slug);
  return { props: { post }, revalidate: 60 };
}
