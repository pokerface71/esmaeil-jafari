import React, { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { cn } from "lib/utils";
import { useI18n } from "lib/i18n";

const RESUME_PDF = "/Esmaeil_jafari-Resume.pdf";

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ResumeModal({ open, onClose }: ResumeModalProps) {
  const { locale, dir } = useI18n();

  const labels =
    locale === "fa"
      ? { title: "رزومه", download: "دانلود", openTab: "تب جدید", close: "بستن" }
      : locale === "ar"
        ? { title: "السيرة الذاتية", download: "تحميل", openTab: "تب جديد", close: "إغلاق" }
        : locale === "tr"
          ? { title: "Özgeçmiş", download: "İndir", openTab: "Yeni sekme", close: "Kapat" }
          : { title: "Resume", download: "Download", openTab: "New tab", close: "Close" };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={labels.title}
      dir={dir}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div
        className={cn(
          "relative w-full max-w-4xl h-[85vh] glass rounded-2xl overflow-hidden",
          "flex flex-col shadow-2xl shadow-black/40 ring-1 ring-white/10",
          "animate-fade-in animate-scale-in duration-200"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-white/10 shrink-0">
          <h2 className="text-sm font-bold text-foreground">{labels.title}</h2>
          <div className={cn("flex items-center gap-2", dir === "rtl" && "flex-row-reverse")}>
            <a
              href={RESUME_PDF}
              download
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 transition-all duration-300"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              {labels.download}
            </a>
            <a
              href={RESUME_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-200"
            >
              {labels.openTab}
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-200"
              aria-label={labels.close}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 bg-neutral-100 dark:bg-neutral-900">
          <iframe
            src={RESUME_PDF}
            title={labels.title}
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
