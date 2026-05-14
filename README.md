# GuitarLA

A guitar e-commerce storefront built with React and TypeScript. The application displays a catalog of guitars and provides a fully functional shopping cart with persistent state across browser sessions.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)

---

## Features

- **Product catalog** — displays 12 guitar models with name, image, description, and price
- **Shopping cart** — add, remove, and adjust quantities per item (minimum 1, maximum 5 per product)
- **Cart persistence** — cart state is saved to `localStorage` and restored on page reload
- **Order total** — real-time calculation of the total amount across all cart items
- **Clear cart** — single-action button to empty the entire cart
- **Hover-reveal cart panel** — dropdown cart summary accessible from the header navigation
- **Responsive layout** — Bootstrap grid adapts from single-column on mobile to three-column on desktop

---

## Tech Stack

### Runtime dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | ^19.2.5 | UI library |
| `react-dom` | ^19.2.5 | DOM rendering |

### Development dependencies

| Package | Version | Purpose |
|---|---|---|
| `typescript` | ~6.0.2 | Static typing |
| `vite` | ^8.0.10 | Build tool and dev server |
| `@vitejs/plugin-react` | ^6.0.1 | React Fast Refresh via Babel |
| `eslint` | ^10.2.1 | Linting |
| `typescript-eslint` | ^8.58.2 | TypeScript-aware ESLint rules |
| `eslint-plugin-react-hooks` | ^7.1.1 | Rules of Hooks enforcement |
| `eslint-plugin-react-refresh` | ^0.5.2 | Fast Refresh lint rules |
| `@types/react` | ^19.2.14 | React type definitions |
| `@types/react-dom` | ^19.2.3 | ReactDOM type definitions |
| `@types/node` | ^24.12.2 | Node.js type definitions |
| `globals` | ^17.5.0 | Global variable definitions for ESLint |
| `@eslint/js` | ^10.0.1 | ESLint core JS rules |

### Styling

Bootstrap 5.2.3 is included as a compiled CSS bundle within `src/index.css` alongside custom utility overrides. No separate Bootstrap package is required at runtime. The body font is **Outfit** (Google Fonts).

---

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm 9 or later (bundled with Node.js)

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/AlejosmurfLegal/guitarla-ts.git
cd guitarla-ts

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The application will be available at `http://localhost:5173` by default.

---

## Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `vite` | Start the Vite dev server with Hot Module Replacement |
| `build` | `tsc -b && vite build` | Type-check then produce an optimized production build in `dist/` |
| `preview` | `vite preview` | Serve the production build locally for inspection |
| `lint` | `eslint .` | Run ESLint across the entire project |

---

## Project Structure

```
guitarla-ts/
├── public/
│   └── img/                  # Static image assets (guitars, logo, cart icon, header)
├── src/
│   ├── components/
│   │   ├── Guitar.tsx         # Individual product card with "Add to cart" action
│   │   └── Header.tsx         # Site header with logo and hover-reveal cart panel
│   ├── data/
│   │   └── db.ts              # Static product catalog (12 guitar objects)
│   ├── hooks/
│   │   └── useCart.ts         # Custom hook encapsulating all cart logic and state
│   ├── types/
│   │   └── index.ts           # Shared TypeScript types (Guitar, CartItem)
│   ├── App.tsx                # Root component — wires useCart to Header and catalog
│   ├── main.tsx               # Application entry point (React 19 createRoot)
│   ├── index.css              # Bootstrap 5.2.3 bundle + custom overrides
│   └── vite-env.d.ts          # Vite client type declarations
├── index.html                 # HTML entry point
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript compiler options (strict mode)
├── tsconfig.node.json         # TypeScript config for Vite config file
├── eslint.config.js           # Flat ESLint configuration
└── package.json
```

---

## Architecture Notes

### State management

All cart state is managed by the `useCart` custom hook (`src/hooks/useCart.ts`). The hook exposes the product catalog, the current cart contents, derived values (`isEmpty`, `cartTotal`), and action handlers (`addToCart`, `removeFromCart`, `increaseQuantity`, `decreaseQuantity`, `clearCart`). Props are passed down explicitly — no context or external state library is used.

### LocalStorage persistence

On every cart state change, a `useEffect` inside `useCart` serializes the cart array to `localStorage` under the key `"cart"`. On initial render, `useState` is initialized with a lazy initializer that reads from `localStorage`, restoring the previous session automatically.

### TypeScript configuration

The project runs with TypeScript in strict mode with `noUnusedLocals`, `noUnusedParameters`, and `noFallthroughCasesInSwitch` enabled. The compiler target is ES2020 with bundler-mode module resolution.

---

## License

This project is private and not licensed for redistribution.

