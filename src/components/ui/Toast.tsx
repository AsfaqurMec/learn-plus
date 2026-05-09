"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

type ToastProps = {
  message: string;
  variant: "success" | "error";
  onDismiss: () => void;
  durationMs?: number;
};

export default function Toast({
  message,
  variant,
  onDismiss,
  durationMs = 4000,
}: ToastProps) {
  useEffect(() => {
    const id = window.setTimeout(onDismiss, durationMs);
    return () => window.clearTimeout(id);
  }, [onDismiss, durationMs]);

  if (typeof document === "undefined") return null;

  const styles =
    variant === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-950"
      : "border-red-200 bg-red-50 text-red-950";

  return createPortal(
    <div
      role="status"
      className={`fixed bottom-4 right-4 z-[10000] max-w-sm rounded-lg border px-4 py-3 text-sm shadow-lg shadow-slate-900/10 ${styles}`}
    >
      <div className="flex items-start justify-between gap-3">
        <p>{message}</p>
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded-md px-1 text-lg leading-none opacity-70 hover:opacity-100"
          aria-label="Dismiss notification"
        >
          ×
        </button>
      </div>
    </div>,
    document.body,
  );
}
