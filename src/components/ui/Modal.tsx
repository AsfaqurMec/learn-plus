"use client";

import { useEffect } from "react";

type ModalProps = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  /** Label for the main action button (default: ঠিক আছে) */
  primaryButtonLabel?: string;
  /** If set, the main button calls this instead of `onClose` */
  onPrimaryClick?: () => void;
};

export default function Modal({
  open,
  title,
  children,
  onClose,
  primaryButtonLabel = "ঠিক আছে",
  onPrimaryClick,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-emerald-950/50 backdrop-blur-sm"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-emerald-200 bg-white p-6 shadow-2xl shadow-emerald-900/20">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2
            id="modal-title"
            className="text-lg font-bold text-emerald-950"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
          >
            ✕
          </button>
        </div>
        <div className="text-sm leading-6 text-emerald-900/90">{children}</div>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => {
              if (onPrimaryClick) onPrimaryClick();
              else onClose();
            }}
            className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            {primaryButtonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
