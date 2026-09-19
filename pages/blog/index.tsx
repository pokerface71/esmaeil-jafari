import Link from "next/link";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import AuroraBackground from "@components/Layout/AuroraBackground";
import Header from "@components/Layout/Header";
import Footer from "@components/Layout/Footer";
import { useI18n } from "lib/i18n";
import {
  getPublishedPostsRaw,
  toPostView,
  isSupabaseConfigured,
  type Post,
} from "lib/supabase";
import { coverArtDataUri } from "lib/coverArt";
import { cn } from "lib/utils";

export const revalidate = 60; // ISR: refresh at most every 60s

interface BlogListProps {
  posts: Post[];
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

export default function BlogList({ posts }: BlogListProps) {
  const { t, locale, dir } = useI18n();

  // Resolve the best translation per post for the active locale (client-side,
  // because the visitor's language is chosen at runtime).
  const views = posts
    .map((p) => toPostView(p, locale))
    .filter((p): p is NonNullable<typeof p> => p !== null);

  return (
    <div className="min-h-screen text-foreground">
      <Header />
      <section className="relative pt-36 pb-16 overflow-hidden">
        <AuroraBackground variant="default" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="code-chip mb-6 inline-block">
              <span className="code-chip-num">06</span>
              {t("blog.label")}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.06]">
              {t("blog.title")}{" "}
              <span className="gradient-text">{t("blog.title.highlight")}</span>
            </h1>
          </div>

          {!isSupabaseConfigured && (
            <div className="glass-card rounded-3xl p-8 text-center text-muted-foreground">
              {t("blog.not_configured")}
            </div>
          )}

          {isSupabaseConfigured && views.length === 0 && (
            <div className="glass-card rounded-3xl p-8 text-center text-muted-foreground">
              {t("blog.empty")}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {views.map((post, index) => (
              <article
                key={post.id}
                data-spot
                className="spot-card glass-card rounded-3xl overflow-hidden group flex flex-col animate-fade-in-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    post.cover_image_url ||
                    coverArtDataUri({
                      seed: post.id,
                      tags: post.tags,
                      label: post.tags?.[0] ?? post.slug,
                    })
                  }
                  alt={post.title}
                  className="w-full h-48 object-cover border-b border-white/10 transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  <div
                    className={cn(
                      "flex items-center gap-3 text-xs text-muted-foreground mb-3",
                      dir === "rtl" && "flex-row-reverse"
                    )}
                  >
                    {post.published_at && (
                      <span className="inline-flex items-center gap-1.5">
                        <FaCalendarAlt className="text-violet-300/70" />
                        {formatDate(post.published_at, locale)}
                      </span>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <span className="skill-tag">{post.tags[0]}</span>
                    )}
                  </div>

                  <h2 className="text-xl font-bold tracking-tight mb-2.5 group-hover:text-violet-200 transition-colors">
                    {post.title}
                  </h2>
                  <p
                    className={cn(
                      "text-sm text-muted-foreground leading-relaxed mb-5 flex-1",
                      dir === "rtl" && "text-right"
                    )}
                  >
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className={cn(
                      "inline-flex items-center gap-2 text-sm font-semibold text-violet-300 hover:text-violet-200 transition-colors",
                      dir === "rtl" && "flex-row-reverse"
                    )}
                  >
                    {t("blog.read_more")}
                    <FaArrowRight
                      className={cn(
                        "text-xs transition-transform group-hover:translate-x-1",
                        dir === "rtl" && "rotate-180 group-hover:-translate-x-1"
                      )}
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const posts = await getPublishedPostsRaw();
  return { props: { posts }, revalidate: 60 };
}
