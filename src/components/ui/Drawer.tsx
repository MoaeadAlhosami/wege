"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function Drawer({
  open,
  onClose,
  title,
  children,
  side = "right",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  side?: "right" | "bottom";
}) {
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const lastActiveRef = React.useRef<Element | null>(null);

  React.useEffect(() => {
    if (!open) return;

    lastActiveRef.current = document.activeElement;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    // focus panel close button (or panel itself)
    setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    }, 0);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      const el = lastActiveRef.current as HTMLElement | null;
      el?.focus?.();
    };
  }, [open, onClose]);

  React.useEffect(() => {
    if (!open) return;
    const original = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = original;
    };
  }, [open]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={cn(
          "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity",
          "motion-reduce:transition-none",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
        aria-label="Close drawer"
        tabIndex={open ? 0 : -1}
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        ref={panelRef}
        className={cn(
          "absolute bg-[#0b1220] text-white shadow-2xl shadow-black/50 ring-1 ring-white/10",
          "motion-reduce:transition-none",
          side === "right" &&
            cn(
              "right-0 top-0 h-full w-[92vw] max-w-md transition-transform",
              open ? "translate-x-0" : "translate-x-full"
            ),
          side === "bottom" &&
            cn(
              "bottom-0 left-0 w-full rounded-t-2xl transition-transform",
              open ? "translate-y-0" : "translate-y-full"
            )
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            data-autofocus
            className="rounded-lg p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[calc(100dvh-64px)] overflow-auto">{children}</div>
      </section>
    </div>
  );
}


