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
const GAP = 24; // px — must match the flex gap-6 of the track

export default function BlogSection() {
  const { t, locale, dir } = useI18n();
  const rtl = dir === "rtl";

  const [posts, setPosts] = useState<PostView[]>([]);
  const [loading, setLoading] = useState(true);

  // ------------------------------------------------------------------
  // Slider state
  // index counts PAGES (viewport-width chunks), 0 = first page.
  // perView is responsive: 1 on phones, 2 on tablets, 3 on desktop.
  // ------------------------------------------------------------------
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [perView, setPerView] = useState(3);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [stepPx, setStepPx] = useState(0); // one page = perView cards + gaps

  // live drag state (touch + mouse)
  const [dragPx, setDragPx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ startX: number; lastX: number; moved: boolean } | null>(
    null
  );
  const suppressClick = useRef(false);

  // ------------------------------------------------------------------
  // Data
  // ------------------------------------------------------------------
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

  // ------------------------------------------------------------------
  // Responsive perView — matches the card width classes below:
  //   < 640px  → 1 card (w-[85%])
  //   < 1024px → 2 cards (w-[calc((100%-24px)/2)])
  //   ≥ 1024px → 3 cards (w-[calc((100%-48px)/3)])
  // ------------------------------------------------------------------
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setPerView(w < 640 ? 1 : w < 1024 ? 2 : 3);
      const vw = viewportRef.current?.clientWidth ?? 0;
      setStepPx(vw + GAP);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const count = posts.length;
  const pageCount = Math.max(1, Math.ceil(count / perView));

  const go = useCallback(
    (next: number) => {
      setIndex((prev) => {
        let v = next;
        if (v < 0) v = pageCount - 1; // wrap
        if (v > pageCount - 1) v = 0;
        return v;
      });
    },
    [pageCount]
  );

  // Clamp when perView/pageCount changes (e.g. rotate device)
  useEffect(() => {
    setIndex((i) => Math.min(i, pageCount - 1));
  }, [pageCount]);

  // Autoplay — pauses on hover/touch, respects page count.
  useEffect(() => {
    if (paused || loading || pageCount <= 1) return;
    const id = window.setInterval(() => go(index + 1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, loading, pageCount, index, go]);

  // ------------------------------------------------------------------
  // Drag handling (touch + pointer/mouse) — the track follows the finger
  // live, then snaps to the nearest page on release.
  // ------------------------------------------------------------------
  const startDrag = (clientX: number) => {
    drag.current = { startX: clientX, lastX: clientX, moved: false };
    setDragging(true);
    setPaused(true);
  };

  const moveDrag = (clientX: number) => {
    if (!drag.current) return;
    const dx = clientX - drag.current.startX;
    if (Math.abs(dx) > 5) drag.current.moved = true;
    drag.current.lastX = clientX;
    setDragPx(dx);
  };

  const endDrag = () => {
    if (!drag.current) return;
    const dx = dragPx;
    const threshold = Math.max(40, (stepPx || 300) * 0.15);

    let next = index;
    if (Math.abs(dx) > threshold) {
      // LTR: swipe left (dx<0) → next page. RTL mirrors it.
      const forward = rtl ? dx > 0 : dx < 0;
      next = forward ? index + 1 : index - 1;
      if (next < 0) next = pageCount - 1;
      if (next > pageCount - 1) next = 0;
    }
    setIndex(next);
    setDragPx(0);
    setDragging(false);
    drag.current = null;
    suppressClick.current = drag.current === null && Math.abs(dx) > 5;
    window.setTimeout(() => {
      suppressClick.current = false;
    }, 80);
    // resume autoplay shortly after release
    window.setTimeout(() => setPaused(false), 3500);
  };

  // Prevent card-link navigation after a real drag
  const onClickCapture = (e: React.MouseEvent) => {
    if (suppressClick.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Physical offset of the track, in px: one page per index.
  const baseOffset = index * stepPx * (rtl ? 1 : -1);
  // Drag delta: flip sign for RTL so the track follows the finger.
  const dragOffset = rtl ? -dragPx : dragPx;
  const translate = `translateX(${baseOffset + (dragging ? dragOffset : 0)}px)`;

  const hasPosts = !loading && posts.length > 0;
  const isSlider = pageCount > 1;

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
          <div className="relative">
            {/* Arrows — desktop only */}
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

            {/* Viewport — the touch surface */}
            <div
              ref={viewportRef}
              className="overflow-hidden -mx-3 px-3 touch-pan-y select-none"
              onClickCapture={onClickCapture}
              onTouchStart={(e) => startDrag(e.touches[0].clientX)}
              onTouchMove={(e) => moveDrag(e.touches[0].clientX)}
              onTouchEnd={endDrag}
              onMouseDown={(e) => {
                // mouse drag for trackpads/desktop, ignore on touch devices
                if (e.button !== 0) return;
                startDrag(e.clientX);
              }}
              onMouseMove={(e) => {
                if (drag.current && e.buttons) moveDrag(e.clientX);
              }}
              onMouseUp={endDrag}
              onMouseLeave={() => {
                if (drag.current) endDrag();
                setPaused(false);
              }}
            >
              <div
                className={cn(
                  "flex gap-6",
                  dragging ? "cursor-grabbing" : "cursor-grab md:cursor-default"
                )}
                style={{
                  transform: translate,
                  transition: dragging
                    ? "none"
                    : "transform 650ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {posts.map((post) => (
                  <article
                    key={post.id}
                    data-spot
                    className={cn(
                      "spot-card glass-card rounded-3xl overflow-hidden group flex flex-col shrink-0",
                      perView === 1
                        ? "w-[85%]"
                        : perView === 2
                          ? "w-[calc((100%-24px)/2)]"
                          : "w-[calc((100%-48px)/3)]"
                    )}
                  >
                    {/* Cover */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="relative block h-44 overflow-hidden"
                      draggable={false}
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
                        draggable={false}
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

            {/* Dots — one per page */}
            {isSlider && (
              <div className="flex items-center justify-center gap-2.5 mt-8">
                {Array.from({ length: pageCount }).map((_, i) => (
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
