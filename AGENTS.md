# Repository Guidelines

## Project Structure & Module Organization

This is an Arabic-first, bilingual dental website built with React 19, strict TypeScript, Vite, and Tailwind CSS v4.

- `src/components/` contains reusable UI, navigation, footer, and SEO; `src/sections/` contains page sections and the booking form.
- `src/config/clinic.ts` holds typed clinic and doctor content; `src/i18n/ar.ts` and `en.ts` hold translations.
- `src/lib/` contains booking validation and submission utilities; `src/hooks/` and `src/types/` hold hooks and shared types.
- `src/index.css` defines theme tokens. Assets live in `src/assets/` and `public/`.
- `tests/` contains validation, DOM, and browser checks. `dist/` and `test-results/` are generated outputs. `vendor/` contains the local React Hook Form package.

## Build, Test, and Development Commands

Use Node.js 22.18+ or 24 and npm.

- `npm install`: install dependencies, including the vendored package.
- `npm run dev`: start Vite locally.
- `npm run build`: type-check and build into `dist/`.
- `npm run preview`: serve the production build.
- `npm run lint` / `npm run typecheck`: check ESLint with zero warnings or TypeScript independently.
- `npm run format:check` / `npm run format`: check or apply Prettier formatting.
- `npm test`: run booking validation and translation-key checks.
- `node tests/dom.test.mjs`: run JSDOM interaction checks; no `test:dom` npm script currently exists.
- `npx playwright install chromium`, then `npm run build` and `npm run test:e2e`: run browser and accessibility checks.

## Coding Style & Naming Conventions

Use two-space indentation and preserve surrounding style. Name components in PascalCase (`ClinicImage.tsx`), hooks with `use` (`useTheme.ts`), and utilities in camelCase. Prefer explicit types and type-only imports. Keep Arabic/English translation keys aligned, use Tailwind logical spacing utilities, and preserve RTL, theme, keyboard, and reduced-motion behavior.

## Testing Guidelines

Tests use Node's `node:test` and strict assertions, with JSDOM, Playwright, and axe-core. Name files `*.test.mjs` and use descriptive behavior names. Add relevant regression coverage for behavior changes; no numeric coverage threshold is configured. Browser tests require Chromium and write screenshots to `test-results/`.

## Commit & Pull Request Guidelines

History contains one descriptive initial commit; no established prefix convention exists. Use concise, imperative subjects. PRs should explain the change, link related issues, record checks run, and include desktop/mobile screenshots for visual changes, covering Arabic and English where relevant.
