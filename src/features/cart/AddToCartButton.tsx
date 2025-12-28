"use client";

import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/features/cart/store";
import { useCartUIStore } from "@/features/cart/uiStore";

export function AddToCartButton({ product }: { product: Product }) {
  const add = useCartStore((s) => s.add);
  const openCart = useCartUIStore((s) => s.open);

  return (
    <Button
      className="w-full"
      onClick={() => {
        add(product);
        openCart();
      }}
    >
      Add to Cart
    </Button>
  );
}


