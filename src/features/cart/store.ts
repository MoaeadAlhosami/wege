// Cart state is client-only (uses localStorage persistence).
"use client";

import { create } from "zustand";
import type { StateCreator } from "zustand";
import { createStore } from "zustand/vanilla";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartItem, Product } from "@/lib/types";

type CartState = {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (productId: string) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void; // if quantity would go < 1, removes item
  clear: () => void;
  total: () => number;
};

const createCartState: StateCreator<CartState, [], [], CartState> = (set, get) => ({
  items: [],
  add: (product) => {
    const existing = get().items.find((it) => it.product.id === product.id);
    if (existing) {
      set({
        items: get().items.map((it) =>
          it.product.id === product.id ? { ...it, quantity: it.quantity + 1 } : it
        ),
      });
      return;
    }
    set({ items: [...get().items, { product, quantity: 1 }] });
  },
  remove: (productId) => set({ items: get().items.filter((it) => it.product.id !== productId) }),
  increment: (productId) =>
    set({
      items: get().items.map((it) =>
        it.product.id === productId ? { ...it, quantity: it.quantity + 1 } : it
      ),
    }),
  decrement: (productId) => {
    const existing = get().items.find((it) => it.product.id === productId);
    if (!existing) return;
    if (existing.quantity <= 1) {
      set({ items: get().items.filter((it) => it.product.id !== productId) });
      return;
    }
    set({
      items: get().items.map((it) =>
        it.product.id === productId ? { ...it, quantity: it.quantity - 1 } : it
      ),
    });
  },
  clear: () => set({ items: [] }),
  total: () => get().items.reduce((sum, it) => sum + it.product.price * it.quantity, 0),
});

// For unit tests (no persistence by default)
export function createCartStore() {
  return createStore<CartState>()(createCartState);
}

// For app runtime (persisted)
export const useCartStore = create<CartState>()(
  persist(createCartState, {
    name: "minishop-cart",
    storage: createJSONStorage(() => localStorage),
    version: 1,
  })
);


