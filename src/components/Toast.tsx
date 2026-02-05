"use client";

import { useEffect } from "react";

type ToastType = "success" | "error";

type ToastProps = {
  message: string;
  type: ToastType;
  onDismiss: () => void;
  duration?: number;
};

const toneStyles: Record<ToastType, string> = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  error: "border-rose-200 bg-rose-50 text-rose-900",
};

export default function Toast({
  message,
  type,
  onDismiss,
  duration = 4000,
}: ToastProps) {
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      onDismiss();
    }, duration);

    return () => window.clearTimeout(timeout);
  }, [duration, onDismiss]);

  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-sm shadow-sm ${toneStyles[type]}`}
      role="status"
    >
      <span>{message}</span>
      <button
        type="button"
        onClick={onDismiss}
        className="text-xs font-semibold uppercase tracking-wide text-current"
      >
        Cerrar
      </button>
    </div>
  );
}
