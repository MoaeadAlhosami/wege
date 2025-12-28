"use client";

import Image from "next/image";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/features/cart/store";
import { useCartUIStore } from "@/features/cart/uiStore";
import { formatPrice } from "@/lib/formatPrice";

export function CartDrawer() {
  const isOpen = useCartUIStore((s) => s.isOpen);
  const close = useCartUIStore((s) => s.close);

  const items = useCartStore((s) => s.items);
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);
  const total = useCartStore((s) => s.total());

  return (
    <Drawer open={isOpen} onClose={close} title="Your cart" side="right">
      <div className="p-5">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm font-medium text-white">Cart is empty</div>
            <p className="mt-1 text-sm text-white/60">
              Add a product to see it here. Your cart persists in localStorage.
            </p>
            <div className="mt-4">
              <Button variant="secondary" onClick={close}>
                Continue shopping
              </Button>
            </div>
          </div>
        ) : (
          <>
            <ul className="space-y-3" aria-label="Cart items">
              {items.map((it) => (
                <li
                  key={it.product.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-3"
                >
                  <div className="flex gap-3">
                    <div className="relative h-16 w-20 overflow-hidden rounded-xl ring-1 ring-white/10">
                      <Image
                        src={it.product.image}
                        alt={it.product.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-white">
                            {it.product.title}
                          </div>
                          <div className="mt-0.5 text-xs text-white/60">
                            {formatPrice(it.product.price)}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(it.product.id)}
                          className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
                          aria-label={`Remove ${it.product.title}`}
                        >
                          ✕
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-xl border border-white/10 bg-black/10">
                          <button
                            type="button"
                            onClick={() => decrement(it.product.id)}
                            className="h-9 w-10 rounded-l-xl text-white/80 transition hover:bg-white/10"
                            aria-label={`Decrease quantity for ${it.product.title}`}
                          >
                            −
                          </button>
                          <div className="w-10 text-center text-sm text-white/90" aria-label="Quantity">
                            {it.quantity}
                          </div>
                          <button
                            type="button"
                            onClick={() => increment(it.product.id)}
                            className="h-9 w-10 rounded-r-xl text-white/80 transition hover:bg-white/10"
                            aria-label={`Increase quantity for ${it.product.title}`}
                          >
                            +
                          </button>
                        </div>

                        <div className="text-sm font-semibold text-white">
                          {formatPrice(it.product.price * it.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-white/70">Total</div>
                <div className="text-base font-semibold text-white">{formatPrice(total)}</div>
              </div>

              <div className="mt-4 flex gap-3">
                <Button variant="secondary" className="flex-1" onClick={clear}>
                  Clear
                </Button>
                <Button className="flex-1" onClick={close}>
                  Checkout
                </Button>
              </div>
              <p className="mt-3 text-xs text-white/50">
                Demo checkout button. This task focuses on UI + state management.
              </p>
            </div>
          </>
        )}
      </div>
    </Drawer>
  );
}


