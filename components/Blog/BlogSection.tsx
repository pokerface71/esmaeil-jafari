import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import AuroraBackground from "@components/Layout/AuroraBackground";
import { useI18n } from "lib/i18n";
import {
  getPublishedPosts,
  isSupabaseConfigured,
  type PostView,
} from "lib/supabase";
import { coverArtDataUri } from "lib/coverArt";
import { cn } from "lib/utils";

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

const AUTOPLAY_MS = 5000;

export default function BlogSection() {
  const { t, locale, dir } = useI18n();
  const rtl = dir === "rtl";

  const [posts, setPosts] = useState<PostView[]>([]);
  const [loading, setLoading] = useState(true);

  // Slider state — index is always LTR (0 = leftmost card).
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const perView = 3;

  useEffect(() => {
    let cancelled = false;
    getPublishedPosts(locale, 9)
      .then((data) => {
        if (!cancelled) setPosts(data);
      })
      .catch(() => {
        /* leave empty on failure */
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  const count = posts.length;
  const maxIndex = Math.max(0, count - perView);

  const go = useCallback(
    (next: number) => {
      setIndex((prev) => {
        let v = next;
        if (v < 0) v = maxIndex; // wrap around
        if (v > maxIndex) v = 0;
        return v;
      });
    },
    [maxIndex]
  );

  // Autoplay — pauses on hover/touch.
  useEffect(() => {
    if (paused || loading || count <= perView) return;
    const id = window.setInterval(() => go(index + 1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, loading, count, index, go]);

  // Keep index valid when the post list changes (locale switch refetch).
  useEffect(() => {
    if (index > maxIndex) setIndex(0);
  }, [index, maxIndex]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    // In RTL the visual order flips, so swipe direction flips too.
    if (Math.abs(dx) < 40) return;
    if (rtl ? dx < 0 : dx > 0) go(index - 1);
    else go(index + 1);
  };

  // Physical offset: RTL slides move the opposite way.
  const offset = rtl ? index : -index;

  const hasPosts = !loading && posts.length > 0;
  const isSlider = count > perView;

  return (
    <section id="blog" className="relative py-28 overflow-hidden">
      <AuroraBackground variant="cool" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="relative text-center mb-14">
          <span aria-hidden="true" className="ghost-num">
            06
          </span>
          <span className="code-chip mb-6 inline-block">
            <span className="code-chip-num">06</span>
            {t("blog.label")}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.06]">
            {t("blog.title")}{" "}
            <span className="gradient-text">{t("blog.title.highlight")}</span>
          </h2>
        </div>

        {/* States */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="glass-card rounded-3xl h-80 animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && !isSupabaseConfigured && (
          <div className="glass-card rounded-3xl p-8 text-center text-muted-foreground max-w-xl mx-auto">
            {t("blog.not_configured")}
          </div>
        )}

        {!loading && isSupabaseConfigured && posts.length === 0 && (
          <div className="glass-card rounded-3xl p-8 text-center text-muted-foreground max-w-xl mx-auto">
            {t("blog.empty")}
          </div>
        )}

        {/* Slider */}
        {hasPosts && (
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Arrows — desktop only, like the tech marquee style */}
            {isSlider && (
              <>
                <button
                  onClick={() => go(index - 1)}
                  aria-label="Previous"
                  className="hidden md:flex absolute top-1/2 -translate-y-1/2 z-20 -left-2 lg:-left-6 w-11 h-11 items-center justify-center rounded-full glass-card border border-white/10 text-foreground/80 hover:text-foreground hover:border-violet-400/40 hover:scale-110 transition-all duration-300"
                >
                  <FaChevronLeft className="text-sm" />
                </button>
                <button
                  onClick={() => go(index + 1)}
                  aria-label="Next"
                  className="hidden md:flex absolute top-1/2 -translate-y-1/2 z-20 -right-2 lg:-right-6 w-11 h-11 items-center justify-center rounded-full glass-card border border-white/10 text-foreground/80 hover:text-foreground hover:border-violet-400/40 hover:scale-110 transition-all duration-300"
                >
                  <FaChevronRight className="text-sm" />
                </button>
              </>
            )}

            {/* Viewport */}
            <div className="overflow-hidden -mx-3 px-3">
              <div
                className="flex gap-6 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transform: `translateX(calc(${offset} * (100% / ${perView} + 24px / ${perView})))`,
                }}
              >
                {posts.map((post) => (
                  <article
                    key={post.id}
                    data-spot
                    className="spot-card glass-card rounded-3xl overflow-hidden group flex flex-col w-[calc((100%-48px)/3)] shrink-0 max-md:w-[85%]"
                  >
                    {/* Cover */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="relative block h-44 overflow-hidden"
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
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500" />
                      {post.tags && post.tags.length > 0 && (
                        <span className="absolute top-3 start-3 skill-tag !bg-black/45 backdrop-blur-md">
                          {post.tags[0]}
                        </span>
                      )}
                    </Link>

                    {/* Body */}
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      <div
                        className={cn(
                          "flex items-center gap-3 text-xs text-muted-foreground mb-2.5",
                          rtl && "flex-row-reverse"
                        )}
                      >
                        {post.published_at && (
                          <span className="inline-flex items-center gap-1.5">
                            <FaCalendarAlt className="text-violet-300/70" />
                            {formatDate(post.published_at, locale)}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold tracking-tight mb-2 line-clamp-1 group-hover:text-violet-200 transition-colors">
                        {post.title}
                      </h3>
                      <p
                        className={cn(
                          "text-sm text-muted-foreground leading-relaxed mb-5 flex-1 line-clamp-2",
                          rtl && "text-right"
                        )}
                      >
                        {post.excerpt}
                      </p>

                      <Link
                        href={`/blog/${post.slug}`}
                        className={cn(
                          "inline-flex items-center gap-2 text-sm font-semibold text-violet-300 hover:text-violet-200 transition-colors",
                          rtl && "flex-row-reverse"
                        )}
                      >
                        {t("blog.read_more")}
                        <FaArrowRight
                          className={cn(
                            "text-xs transition-transform group-hover:translate-x-1",
                            rtl && "rotate-180 group-hover:-translate-x-1"
                          )}
                        />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Dots */}
            {isSlider && (
              <div className="flex items-center justify-center gap-2.5 mt-8">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      i === index
                        ? "w-7 bg-gradient-to-r from-indigo-400 to-fuchsia-400 shadow-[0_0_12px_rgba(167,139,250,0.6)]"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* View all */}
        {hasPosts && (
          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="btn-ghost inline-flex items-center gap-2.5 rounded-xl px-7 py-3 text-sm font-semibold"
            >
              {t("blog.view_all")}
              <FaArrowRight
                className={cn("text-xs", rtl && "rotate-180")}
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
