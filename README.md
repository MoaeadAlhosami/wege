# MiniShop — e-commerce mini app

Production-quality mini e-commerce app built with **Next.js (App Router) + TypeScript**, **Tailwind CSS**, and **Zustand** (cart state + localStorage persistence).

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Commands

```bash
# install
npm install

# dev
npm run dev

# production build
npm run build

# tests
npm run test

# lint
npm run lint
```

## Tech choices

- **Data loading (SSG)**: `src/data/products.json` is the single source of truth. Server pages import it via `src/data/products.ts`.
- **API**: `GET /api/products` returns the same data (required), without duplicating logic.
- **State**:
  - Cart: Zustand store + `persist` middleware (localStorage key: `minishop-cart`).
  - Filters: local component state (Home page client component), synced to URL.
- **Styling**: Tailwind utilities + a small token set in `tailwind.config.ts`.
- **Images**: `next/image` with remote domain `placehold.co` (configured in `next.config.ts`).

## URL filter encoding

Home page supports:

- `category`: category name or omitted (= all)
- `price`: `lt50` | `50-100` | `gt100` or omitted (= all)
- `q`: search query string (debounced 300ms)

Example:

- `/?category=Shoes&price=50-100&q=air`

## Bonus features implemented

- **SSG**:
  - Home uses static JSON import (static by default).
  - Product details uses `generateStaticParams` + `notFound()`.
- **Search**: 300ms debounced query.
- **Filters persisted in URL**: read on load, write on change (with `router.replace`).
- **Accessible drawers**:
  - Cart drawer: closes on **ESC**, overlay click, focus returns to previous element.
  - Mobile filters: bottom-sheet drawer + “Apply” button.
- **UX states**:
  - Skeletons (`src/app/loading.tsx` + client hydration skeleton).
  - Empty state component for no results.
  - App-level error boundary (`src/app/error.tsx`).
- **Tests**:
  - `filterProducts` utility unit tests.
  - Cart store unit tests (add/increment/decrement/total).

## Accessibility notes

- Semantic landmarks (`header`, `main`, `footer`) + skip link.
- Visible focus styles (`:focus-visible` in `globals.css`).
- Drawer uses `role="dialog"` + `aria-modal` and supports ESC/overlay click.
- All product images include descriptive `alt` text.

## Testing notes

- Runner: **Vitest** + **JSDOM**
- Matchers: `@testing-library/jest-dom`
- Alias `@/*` works in tests via `vitest.config.ts`.

## Deployment (Vercel)

- Push to GitHub and import into Vercel.
- Build command: `npm run build`

