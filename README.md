# Luma Dental

An Arabic-first, bilingual dental-clinic landing page for a fictional practice in
Abdoun, Amman. Built with React 19, strict TypeScript, Vite, Tailwind CSS v4,
Motion, react-i18next, Lucide, React Hook Form, and Zod.

## Run locally

Use Node.js 22.18+ or 24 and npm.

```sh
npm install
npm run dev
```

Open the Local URL printed by Vite. After changing dependencies or Vite plugins,
stop and restart the server. If an old Tailwind import error persists, run
`npm run dev -- --force` to refresh Vite's dependency cache.

```sh
npm run lint          # ESLint, with warnings treated as errors
npm run typecheck     # Strict TypeScript checking
npm run format:check  # Prettier check; use npm run format to apply formatting
npm test              # Booking rules and translation-key parity
npm run test:dom      # React interaction checks in a simulated DOM
npm run build        # Type-check and produce dist/
npm run preview      # Serve the production build
```

For real-browser keyboard, responsive, booking, and axe accessibility checks:

```sh
npx playwright install chromium
npm run build
npm run test:e2e
```

`PLAYWRIGHT_EXECUTABLE_PATH` can point to an existing Chromium binary. Browser
tests serve `dist/` through Playwright request interception and require no HTTP
port. They block external resources to verify local image fallbacks. Screenshots
are saved in `test-results/`. These tests are distinct from Lighthouse audits.

## Edit clinic information

`src/config/clinic.ts` is the typed source for the clinic identity, doctor profile,
qualifications, phone/WhatsApp numbers, address, coordinates, opening hours,
statistics, reviews, prices, image slots, social links, and booking endpoint.
The example is closed Fridays; set `hours.saturday` to `null` to close Saturdays.
Dates use the `Asia/Amman` timezone, and requests are limited to the next 90 days.

**All clinic identities, claims, statistics, reviews, prices, and contact details
are illustrative.** Replace them with approved information before publication.
Stock photographs are not images of the fictional doctor or clinic. The
before/after comparison uses local illustrations, not patient results.

## Translations and styling

- Edit interface copy in `src/i18n/ar.ts` and `src/i18n/en.ts`; keep keys aligned.
- Clinic-specific translated values live in the config and enter the i18n resources.
- Arabic is the default; language choice persists and updates `html.lang` and `dir`.
- Theme defaults to the system preference, with a persisted user override.
- Theme tokens and base rules live in `src/index.css`; use Tailwind logical
  utilities for direction-sensitive spacing and alignment.
- Cairo, DM Sans, and Cormorant Garamond load through Google Fonts with fallbacks.
  For a fully self-hosted deployment, download licensed font subsets and use local
  `@font-face` declarations with `font-display: swap`.

## Images and SEO

Replace `clinic.images` with optimized local WebP/AVIF photos in `public/images/`.
External Unsplash placeholders have local SVG fallbacks. Below-fold photos load
lazily; the hero is prioritized; image dimensions reserve layout space.

Set the public `clinic.website`, update translated SEO copy, and replace the
1200×630 `public/social-card.png`. `public/social-card.svg` is its editable source.
The initial HTML includes Arabic metadata; runtime metadata follows the selected
language. Keep the static metadata in `index.html` aligned when changing branding.
Dentist/LocalBusiness JSON-LD derives address, phone, coordinates, and hours from
the config. Do not add fabricated review aggregates to structured data.

## Connect appointment requests

The default form simulates an 800 ms API request and explicitly states that no
appointment is booked or sent to a clinic. Form data is not persisted locally.

Set `clinic.booking.endpoint` to a same-origin HTTPS endpoint, such as
`/api/appointments`. `src/lib/booking.ts` sends a JSON `POST` containing `name`,
normalized `phone`, `date` (`YYYY-MM-DD`), `service`, `message`, and `timezone`.
A successful HTTP response shows a request-received state; the clinic must still
confirm availability. Non-success responses and timeouts show a retry/call option.
Implement server validation, rate limiting, delivery, and an appropriate privacy
policy in that endpoint. Never put private API keys in frontend configuration.

Jordanian mobile and landline formats, including Arabic digits, are accepted.
The shared Zod schema rejects invalid dates, Fridays, disabled Saturdays,
unknown services, and oversized messages. The form is not an emergency channel.

## Project layout

```text
src/components/  Reusable UI, navigation, footer, SEO
src/sections/    Landing-page sections and booking flow
src/config/      Typed clinic content
src/i18n/        Arabic/English resources and initialization
src/hooks/       Theme behavior
src/lib/         Validation, submission adapter, shared utilities
src/types/       Clinic and localization types
public/          Images, favicon, and social artwork
tests/           Business-rule, DOM, and browser checks
vendor/          Auditable React Hook Form source distribution
```

## Deploy

**Vercel:** import the repository, choose the Vite preset, use `npm run build`, and
publish `dist/`. `vercel.json` includes these settings.

**Netlify:** import the repository with the included `netlify.toml`. The build
command is `npm run build` and the publish directory is `dist/`.

This is a static, single-page site with hash navigation; it needs no SPA rewrite
rules. An appointment endpoint must be deployed separately or as a host function.
No hosting deployment has been performed.

## Verification notes

The development environment blocks network sockets and Chromium startup. Lint,
type-checking, production builds, and local validation can run there; browser
checks and Lighthouse must run in an environment that permits Chromium. The
requested Lighthouse scores are targets, not measured results.

Most dependencies were installed from the local npm cache. React Hook Form was
compiled from its official v7.65.0 tag and packaged locally because the registry
was unreachable. Its unchanged source, license, and provenance are included in
the archive; see `vendor/README.md` for switching to the standard distribution.
