"use client";
import Link from "next/link";
import { FaArrowLeft, FaCalendarAlt, FaTag } from "react-icons/fa";
import AuroraBackground from "components/design-system/organisms/AuroraBackground";
import Header from "components/design-system/organisms/Header";
import Footer from "components/design-system/organisms/Footer";
import MarkdownRenderer from "components/design-system/organisms/MarkdownRenderer";
import { useI18n } from "lib/i18n";
import { getPostBySlugRaw, toPostView, type Post } from "lib/supabase";
import { coverArtDataUri } from "lib/coverArt";
import { cn } from "lib/utils";
import { DEFAULT_DESCRIPTION } from "lib/seo";

/** Props come from the slug route (server): the client only renders. */
export interface BlogPostProps {
  post: Post;
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

export default function BlogPost({ post }: BlogPostProps) {
  const { t, locale, dir } = useI18n();

  // Server pre-rendered the post; `view` is never null here.
  const view = toPostView(post, locale);
  if (!view) return null;

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
            width={1200}
            height={630}
            decoding="async"
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
