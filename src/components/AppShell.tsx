"use client";

import * as React from "react";
import Link from "next/link";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { useCartUIStore } from "@/features/cart/uiStore";
import { useCartStore } from "@/features/cart/store";
import { cn } from "@/lib/cn";

function CartButton() {
  const open = useCartUIStore((s) => s.open);
  const itemsCount = useCartStore((s) => s.items.reduce((acc, it) => acc + it.quantity, 0));

  return (
    <button
      type="button"
      onClick={open}
      className={cn(
        "relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white/90",
        "border border-white/12 bg-gradient-to-b from-white/18 to-white/6",
        "shadow-[0_14px_30px_-18px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.18)]",
        "transition-[transform,box-shadow,background-color,border-color] duration-200 ease-out",
        "hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.20)]",
        "active:translate-y-[1px] motion-reduce:active:translate-y-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1220]"
      )}
      aria-label="Open cart"
    >
      <span className="text-base" aria-hidden="true">
        🛒
      </span>
      <span>Cart</span>
      <span
        className={cn(
          "ml-1 inline-flex min-w-6 justify-center rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/90",
          itemsCount === 0 && "opacity-70"
        )}
        aria-label={`${itemsCount} items in cart`}
      >
        {itemsCount}
      </span>
    </button>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(99,102,241,0.35),transparent),radial-gradient(900px_500px_at_90%_0%,rgba(56,189,248,0.25),transparent)]">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-black/70 focus:px-4 focus:py-2"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="group inline-flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 shadow-sm shadow-black/30 transition group-hover:bg-white/15">
              <span className="text-lg" aria-hidden="true">
                🛍️
              </span>
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight text-white">MiniShop</div>
              <div className="text-xs text-white/60">Premium essentials</div>
            </div>
          </Link>

          <nav aria-label="Primary" className="flex items-center gap-3">
            <CartButton />
          </nav>
        </div>
      </header>

      <main id="content" className="mx-auto w-full max-w-6xl px-4 py-8">
        {children}
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-white/60">
          <p>
            Built by Moaead Al-Hosami front end developer. Phone number: +963 942 090 950{" "}
          </p>
        </div>
      </footer>

      <CartDrawer />
    </div>
  );
}


