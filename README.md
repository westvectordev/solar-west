# HelioNest Landing

Next.js 16 landing page with:
- animated hero + slider
- mobile/tablet burger menu
- contact form that sends mail through Gmail SMTP (Nodemailer)
- Sanity CMS integration for content edits

## 1. Install and run

```bash
npm install
npm run dev
```

## 2. Environment variables

Create `.env.local` from `.env.example` and fill:

```bash
GMAIL_USER=yourgmail@gmail.com
GMAIL_APP_PASSWORD=your_google_app_password
CONTACT_TO=yourgmail@gmail.com
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-23
```

Notes:
- Gmail requires an App Password (not your main account password).
- `CONTACT_TO` is where form leads are delivered.

## 3. Contact form backend

- API route: `POST /api/contact`
- File: `app/api/contact/route.ts`
- Frontend form: `app/components/contact-form.tsx`

## 4. Sanity CMS

Sanity content is fetched in:
- `sanity/lib/fetch-landing-content.ts`

If Sanity env vars are missing, app falls back to:
- `content/landing.json`

Embedded Studio route:
- `/studio`
- File: `app/studio/[[...tool]]/page.tsx`
- Config: `sanity.config.ts`
- Schema: `sanity/schemaTypes/landingPageType.ts`

## 5. MCP for Sanity

Example MCP config is in `.mcp.json.example`.

If your MCP client supports it, you can also run:

```bash
npx sanity@latest mcp configure
```

Then use your MCP client to edit/query Sanity content through the configured server.
