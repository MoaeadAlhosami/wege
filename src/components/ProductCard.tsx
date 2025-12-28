"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/features/cart/store";
import { useCartUIStore } from "@/features/cart/uiStore";

export function ProductCard({ product }: { product: Product }) {
  const add = useCartStore((s) => s.add);
  const openCart = useCartUIStore((s) => s.open);

  const onAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add(product);
    openCart();
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/8 to-white/5 shadow-[0_16px_32px_-22px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.14)] motion-reduce:transform-none">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-200 group-hover:opacity-100">
        <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-indigo-400/15 blur-2xl" />
        <div className="absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-sky-400/15 blur-2xl" />
      </div>

      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-200 group-hover:scale-[1.03] motion-reduce:transform-none"
            unoptimized
            priority={false}
          />
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold tracking-tight text-white">
                {product.title}
              </h3>
              <p className="mt-1 text-sm text-white/70">{formatPrice(product.price)}</p>
            </div>
            <span className="shrink-0 rounded-full border border-white/10 bg-black/10 px-2 py-1 text-[11px] text-white/70">
              {product.category}
            </span>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Button onClick={onAdd} className="flex-1" aria-label={`Add ${product.title} to cart`}>
              Add to Cart
            </Button>
            <Button variant="secondary" className="px-3" aria-label="View details">
              Details
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}


