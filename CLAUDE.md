# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Build & Dev Commands

- `npm run dev` — start Next.js dev server
- `npm run build` — production build
- `npm run lint` — ESLint (flat config, `eslint.config.mjs`)
- `npm run sanity:sync` — push `content/landing.json` into Sanity CMS

## Architecture

**Next.js 16 single-page landing site** (Ukrainian-language solar energy company "HelioNest").

### Content pipeline
All landing page data flows through `sanity/lib/fetch-landing-content.ts`:
- If Sanity env vars are configured → fetches from Sanity CMS, merges with fallback
- Otherwise → returns static `content/landing.json`

This means the app works without Sanity credentials by falling back to the JSON file.

### Key areas
- `app/page.tsx` — the single landing page (server component), consumes content data
- `app/api/contact/route.ts` — contact form API route (Gmail SMTP via Nodemailer)
- `app/components/` — client components: hero slider (Swiper), animations (GSAP), cookie consent, contact form
- `app/studio/[[...tool]]/page.tsx` — embedded Sanity Studio at `/studio`
- `sanity/schemaTypes/landingPageType.ts` — Sanity schema for the landing page document

### Styling
Tailwind CSS v4 via PostCSS. No component library.

### Environment variables
See `.env.example`. Key vars: `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `CONTACT_TO` (for contact form), `NEXT_PUBLIC_SANITY_*` (for CMS).
