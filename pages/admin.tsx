import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaArrowLeft, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import AuroraBackground from "@components/Layout/AuroraBackground";
import Header from "@components/Layout/Header";
import { useI18n } from "lib/i18n";
import { getAdminClient, type Post, type PostTranslation } from "lib/supabase";
import { cn } from "lib/utils";

/**
 * Custom admin panel at /admin.
 *
 * - Sign-in uses Supabase email/password auth (create your user in the
 *   Supabase dashboard; public signups are disabled in the schema notes).
 * - Writes go through RLS: only authenticated users may insert/update/delete.
 * - A post has meta (slug, cover, tags, published) plus one translation row
 *   per language (en | fa | ar | tr).
 */

const LANGUAGES = ["en", "fa", "ar", "tr"] as const;
type Lang = (typeof LANGUAGES)[number];

interface DraftTranslation {
  language: Lang;
  title: string;
  excerpt: string;
  content: string;
}

interface Draft {
  id: string | null; // null = new post
  slug: string;
  cover_image_url: string;
  tags: string; // comma separated in the form
  published: boolean;
  translations: DraftTranslation[];
}

const emptyDraft = (): Draft => ({
  id: null,
  slug: "",
  cover_image_url: "",
  tags: "",
  published: false,
  translations: [{ language: "fa", title: "", excerpt: "", content: "" }],
});

function draftFromPost(post: Post): Draft {
  return {
    id: post.id,
    slug: post.slug,
    cover_image_url: post.cover_image_url ?? "",
    tags: (post.tags ?? []).join(", "),
    published: post.published,
    translations: (post.translations ?? []).map((tr) => ({
      language: tr.language,
      title: tr.title,
      excerpt: tr.excerpt,
      content: tr.content,
    })),
  };
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-colors focus:border-violet-400/50 focus:bg-white/[0.06]";

export default function AdminPage() {
  const router = useRouter();
  const { t, dir } = useI18n();

  const [client, setClient] = useState<ReturnType<
    typeof getAdminClient
  > | null>(null);
  const [session, setSession] = useState<boolean | null>(null); // null = checking
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ------------------------------------------------------------------ auth --
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;
    const supabase = getAdminClient();
    setClient(supabase);

    supabase.auth.getSession().then(({ data }) => {
      setSession(!!data.session);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(!!s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!client) return;
    setSaving(true);
    setError(null);
    const { error: err } = await client.auth.signInWithPassword({
      email,
      password,
    });
    if (err) setError(err.message);
    setSaving(false);
  };

  const handleSignOut = async () => {
    if (!client) return;
    await client.auth.signOut();
    setSession(false);
    setPosts([]);
    setDraft(null);
  };

  // ----------------------------------------------------------------- posts --
  const loadPosts = async (supabase: NonNullable<typeof client>) => {
    setLoadingPosts(true);
    setError(null);
    const { data, error: err } = await supabase
      .from("posts")
      .select("*, translations:post_translations(*)")
      .order("updated_at", { ascending: false });
    if (err) setError(err.message);
    else setPosts((data ?? []) as unknown as Post[]);
    setLoadingPosts(false);
  };

  useEffect(() => {
    if (client && session) void loadPosts(client);
  }, [client, session]);

  const handleSave = async () => {
    if (!client || !draft) return;
    setSaving(true);
    setError(null);

    try {
      const slug = draft.slug.trim();
      if (!slug) throw new Error("Slug is required");
      const validTranslations = draft.translations.filter(
        (tr) => tr.title.trim() !== ""
      );
      if (validTranslations.length === 0) {
        throw new Error("At least one translation with a title is required");
      }

      const meta = {
        slug,
        cover_image_url: draft.cover_image_url.trim() || null,
        tags: draft.tags
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        published: draft.published,
        published_at: draft.published ? new Date().toISOString() : null,
      };

      let postId = draft.id;

      if (postId) {
        const { error: err } = await client
          .from("posts")
          .update(meta)
          .eq("id", postId);
        if (err) throw err;
      } else {
        const { data, error: err } = await client
          .from("posts")
          .insert(meta)
          .select("id")
          .single();
        if (err) throw err;
        postId = data.id as string;
      }

      // Upsert translations
      const { error: trErr } = await client
        .from("post_translations")
        .upsert(
          validTranslations.map((tr) => ({
            post_id: postId,
            language: tr.language,
            title: tr.title.trim(),
            excerpt: tr.excerpt.trim(),
            content: tr.content,
          }))
        );
      if (trErr) throw trErr;

      setDraft(null);
      await loadPosts(client);
    } catch (e) {
      setError(e instanceof Error ? e.message : t("admin.error_generic"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!client) return;
    if (!window.confirm(t("admin.confirm_delete"))) return;
    setSaving(true);
    const { error: err } = await client.from("posts").delete().eq("id", id);
    if (err) setError(err.message);
    await loadPosts(client);
    setSaving(false);
  };

  // ------------------------------------------------------------------ view --
  const rtl = dir === "rtl";

  return (
    <div className="min-h-screen text-foreground">
      <Header />

      <section className="relative pt-36 pb-24 overflow-hidden">
        <AuroraBackground variant="default" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              {t("admin.title")}
            </h1>
            <button
              onClick={() => router.push("/")}
              className={cn(
                "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
                rtl && "flex-row-reverse"
              )}
            >
              <FaArrowLeft className={cn("text-xs", rtl && "rotate-180")} />
              {t("admin.back_to_site")}
            </button>
          </div>

          {/* Not configured */}
          {!process.env.NEXT_PUBLIC_SUPABASE_URL && (
            <div className="glass-card rounded-3xl p-8 text-center text-muted-foreground">
              {t("blog.not_configured")}
            </div>
          )}

          {/* Login */}
          {process.env.NEXT_PUBLIC_SUPABASE_URL && session === false && (
            <form
              onSubmit={handleSignIn}
              className="glass-card rounded-3xl p-8 max-w-md mx-auto space-y-4"
            >
              <p className="text-sm text-muted-foreground">
                {t("admin.login_hint")}
              </p>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("admin.email")}
                className={inputCls}
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("admin.password")}
                className={inputCls}
              />
              {error && <p className="text-sm text-red-400">{error}</p>}
              <button
                type="submit"
                disabled={saving}
                className="btn-primary w-full rounded-xl px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
              >
                {t("admin.sign_in")}
              </button>
            </form>
          )}

          {/* Checking session */}
          {process.env.NEXT_PUBLIC_SUPABASE_URL && session === null && (
            <p className="text-center text-muted-foreground">
              {t("admin.loading")}
            </p>
          )}

          {/* Logged in */}
          {process.env.NEXT_PUBLIC_SUPABASE_URL && session && (
            <>
              <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
                <button
                  onClick={() => setDraft(emptyDraft())}
                  className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
                >
                  <FaPlus className="text-xs" />
                  {t("admin.new_post")}
                </button>
                <button
                  onClick={handleSignOut}
                  className="btn-ghost rounded-xl px-5 py-2.5 text-sm font-semibold"
                >
                  {t("admin.sign_out")}
                </button>
              </div>

              {error && (
                <p className="text-sm text-red-400 mb-4">{error}</p>
              )}

              {/* Editor */}
              {draft && (
                <div className="glass-card rounded-3xl p-6 sm:p-8 mb-8 space-y-5">
                  <h2 className="text-lg font-bold">
                    {draft.id ? t("admin.edit_post") : t("admin.new_post")}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-xs text-muted-foreground mb-1.5 block">
                        {t("admin.slug")}
                      </span>
                      <input
                        value={draft.slug}
                        onChange={(e) =>
                          setDraft({ ...draft, slug: e.target.value })
                        }
                        placeholder="my-first-post"
                        className={inputCls}
                        dir="ltr"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs text-muted-foreground mb-1.5 block">
                        {t("admin.cover_image")}
                      </span>
                      <input
                        value={draft.cover_image_url}
                        onChange={(e) =>
                          setDraft({ ...draft, cover_image_url: e.target.value })
                        }
                        placeholder="https://…"
                        className={inputCls}
                        dir="ltr"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs text-muted-foreground mb-1.5 block">
                        {t("admin.tags")}
                      </span>
                      <input
                        value={draft.tags}
                        onChange={(e) =>
                          setDraft({ ...draft, tags: e.target.value })
                        }
                        placeholder="nextjs, react"
                        className={inputCls}
                        dir="ltr"
                      />
                    </label>
                    <label className="flex items-center gap-3 mt-6 cursor-pointer w-fit">
                      <input
                        type="checkbox"
                        checked={draft.published}
                        onChange={(e) =>
                          setDraft({ ...draft, published: e.target.checked })
                        }
                        className="w-4 h-4 accent-violet-500"
                      />
                      <span className="text-sm">{t("admin.published")}</span>
                    </label>
                  </div>

                  {/* Translations */}
                  <div className="space-y-4">
                    {draft.translations.map((tr, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-white/10 p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <select
                            value={tr.language}
                            onChange={(e) => {
                              const next = [...draft.translations];
                              next[idx] = {
                                ...tr,
                                language: e.target.value as Lang,
                              };
                              setDraft({ ...draft, translations: next });
                            }}
                            className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm"
                          >
                            {LANGUAGES.map((l) => (
                              <option key={l} value={l} className="bg-gray-900">
                                {l.toUpperCase()}
                              </option>
                            ))}
                          </select>
                          {draft.translations.length > 1 && (
                            <button
                              onClick={() =>
                                setDraft({
                                  ...draft,
                                  translations: draft.translations.filter(
                                    (_, i) => i !== idx
                                  ),
                                })
                              }
                              className="text-muted-foreground hover:text-red-400 transition-colors"
                              aria-label="Remove translation"
                            >
                              <FaTrash className="text-xs" />
                            </button>
                          )}
                        </div>
                        <input
                          value={tr.title}
                          onChange={(e) => {
                            const next = [...draft.translations];
                            next[idx] = { ...tr, title: e.target.value };
                            setDraft({ ...draft, translations: next });
                          }}
                          placeholder={t("admin.title_field")}
                          className={inputCls}
                        />
                        <input
                          value={tr.excerpt}
                          onChange={(e) => {
                            const next = [...draft.translations];
                            next[idx] = { ...tr, excerpt: e.target.value };
                            setDraft({ ...draft, translations: next });
                          }}
                          placeholder={t("admin.excerpt")}
                          className={inputCls}
                        />
                        <textarea
                          value={tr.content}
                          onChange={(e) => {
                            const next = [...draft.translations];
                            next[idx] = { ...tr, content: e.target.value };
                            setDraft({ ...draft, translations: next });
                          }}
                          placeholder={t("admin.content")}
                          rows={8}
                          className={cn(inputCls, "font-mono leading-relaxed")}
                        />
                      </div>
                    ))}

                    <button
                      onClick={() => {
                        const used = new Set(
                          draft.translations.map((tr) => tr.language)
                        );
                        const free = LANGUAGES.find((l) => !used.has(l));
                        if (!free) return;
                        setDraft({
                          ...draft,
                          translations: [
                            ...draft.translations,
                            {
                              language: free,
                              title: "",
                              excerpt: "",
                              content: "",
                            },
                          ],
                        });
                      }}
                      disabled={
                        draft.translations.length >= LANGUAGES.length
                      }
                      className="text-sm text-violet-300 hover:text-violet-200 transition-colors disabled:opacity-40"
                    >
                      + {t("admin.add_translation")}
                    </button>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="btn-primary rounded-xl px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
                    >
                      {saving ? t("admin.saving") : t("admin.save")}
                    </button>
                    <button
                      onClick={() => setDraft(null)}
                      className="btn-ghost rounded-xl px-6 py-2.5 text-sm font-semibold"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              {/* Posts list */}
              {loadingPosts ? (
                <p className="text-muted-foreground">{t("admin.loading")}</p>
              ) : posts.length === 0 ? (
                <p className="text-muted-foreground">{t("admin.no_posts")}</p>
              ) : (
                <div className="space-y-3">
                  {posts.map((post) => {
                    const firstTitle =
                      (post.translations as PostTranslation[])?.[0]?.title ??
                      post.slug;
                    return (
                      <div
                        key={post.id}
                        className="glass-card rounded-2xl p-4 flex items-center justify-between gap-3 flex-wrap"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold truncate">
                            {firstTitle}
                          </p>
                          <p className="text-xs text-muted-foreground font-mono" dir="ltr">
                            /blog/{post.slug} ·{" "}
                            {post.published ? "● published" : "○ draft"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setDraft(draftFromPost(post))}
                            className="w-9 h-9 rounded-xl glass-light flex items-center justify-center hover:text-violet-300 transition-colors"
                            aria-label="Edit"
                          >
                            <FaEdit className="text-sm" />
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="w-9 h-9 rounded-xl glass-light flex items-center justify-center hover:text-red-400 transition-colors"
                            aria-label="Delete"
                          >
                            <FaTrash className="text-sm" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
