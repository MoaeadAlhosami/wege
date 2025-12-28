"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function HeroSection({
  title = "Find your next favorite",
  subtitle = "Premium essentials, curated for modern everyday life.",
  imageSrc = "/hero.svg",
  onPrimaryAction,
}: {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  onPrimaryAction?: () => void;
}) {
  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-sm shadow-black/30">
      <div className="grid gap-6 p-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:p-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs text-white/70">
            <span aria-hidden="true">✨</span>
            <span>New season edit</span>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
            {subtitle}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button onClick={onPrimaryAction}>Shop categories</Button>
            <Button
              variant="secondary"
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            >
              Browse all
            </Button>
          </div>
          <p className="mt-4 text-xs text-white/45">
            Tip: filters persist in the URL. Cart persists in localStorage.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/10">
          <div className="relative aspect-[16/9]">
            <Image
              src={imageSrc}
              alt="MiniShop hero"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}


