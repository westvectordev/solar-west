# GEO Audit Report: West Vector (Вест-Вектор)

**Audit Date:** 2026-07-29
**URL:** https://west-vector.com.ua/
**Business Type:** Local Business — Solar / electrical contractor (ElectricalContractor)
**Market:** Lutsk (Луцьк) & Volyn region, Ukraine — Ukrainian-language
**Pages Analyzed:** 1 (single-page landing site) + robots.txt, sitemap.xml, source code

---

## Executive Summary

**Overall GEO Score: 55/100 (Poor — at the Poor/Fair boundary)**

West Vector has a **technically sound, well-structured single page** — server-rendered, valid `ElectricalContractor` + `FAQPage` JSON-LD, clean heading hierarchy, all AI crawlers allowed, a real Google Maps embed, and genuinely local, buyer-intent FAQ content. On the *page itself*, it does most things right and is already a plausible candidate for Google AI Overviews on "СЕС Луцьк"-type queries.

The score is dragged down almost entirely by **off-site invisibility**. The brand has **no Google Business Profile, no social profiles, no reviews, and no third-party mentions** that connect the name "West Vector" to "solar installer in Lutsk." Compounding this, the name is generic and collides with dozens of unrelated global "Vector" companies, the Latin brand ("West Vector") is never linked to its Cyrillic legal identity ("ВЕСТ-ВЕКТОР"), and the only places AI *does* find the entity (state registries) mis-classify it as *electrical installation*, not solar. For a local business, AI systems lean hardest on exactly these off-site signals — and they are near-empty.

**Biggest strength:** a solid, crawlable, schema-backed page with real local FAQ content.
**Most critical gap:** no Google Business Profile and zero entity/authority signals off-site — the brand is effectively unknown to the AI entity graph.
**Biggest hidden opportunity:** West Vector is a *verified legal entity operating since 2004* with a real electrical-infrastructure track record (600 km of networks, transformer substations, 100+ generators) — powerful E-E-A-T that is currently **commented out of the page**.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 62/100 | 25% | 15.5 |
| Brand Authority | 20/100 | 20% | 4.0 |
| Content E-E-A-T | 56/100 | 20% | 11.2 |
| Technical GEO | 80/100 | 15% | 12.0 |
| Schema & Structured Data | 68/100 | 10% | 6.8 |
| Platform Optimization | 54/100 | 10% | 5.4 |
| **Overall GEO Score** | | | **55/100** |

---

## Critical Issues (Fix Immediately)

1. **No Google Business Profile (GBP) / Google Maps listing.**
   For a local installer, GBP is the single most important entity + review signal, and it feeds Google AI Overviews, Gemini, and the Maps local pack directly. It is absent. Every Google-fed AI surface has almost nothing to anchor a "solar installer in Lutsk" answer to. **This is the highest-leverage fix in the entire audit.**

2. **Zero reviews and zero social presence anywhere.**
   No Google reviews, no Facebook, Instagram, YouTube, or LinkedIn — and the site carries no outbound social links at all. AI systems have no trust/sentiment signal and no corroborating entity node to cross-reference. Local competitors (e.g. Instagram @kerbis.solar) are active; West Vector is invisible.

3. **Stale JSON fallback ships a different brand identity.**
   `content/landing.json` — the fallback served whenever Sanity is unreachable — still contains **"HelioNest Solar"**, a fake US phone `(512) 555-0149`, `hello@helionestsolar.com`, and portfolio projects in the **Kyiv region** (Козин, Бровари, Ірпінь, Буча), not Lutsk/Volyn. If Sanity ever fails, the live site silently renders a completely different brand and location — a serious trust, consistency, and NAP-integrity risk for both users and crawlers.

---

## High Priority Issues (Fix Within 1 Week)

4. **Weak, non-keyword H1.** The `<h1>` is hardcoded as **"Cонячні панелі"** (`app/page.tsx:53`) — two generic words, no location, no "СЕС." The keyword-rich heading ("Отримайте енергетичну незалежність…") is demoted to an `<h2>`. **Also verify the H1's first character:** it appears to be a **Latin "C"** rather than Cyrillic "С", which would break exact-keyword matching entirely. The H1 should carry the primary local keyword, e.g. *"Сонячні панелі та СЕС у Луцьку"*.

5. **No `sameAs` / entity linkage in schema.** Nothing ties the Latin brand "West Vector" to the Cyrillic legal name "ВЕСТ-ВЕКТОР," and nothing links out to any authoritative profile. This is the mechanism that disambiguates the brand from unrelated global "Vector" companies. Its absence is why entity recognition fails for ChatGPT and Gemini.

6. **LocalBusiness schema is missing its highest-value fields.** The `ElectricalContractor` node has address, geo, areaServed, and an offer catalog — but **no `telephone`, `email`, `image`/`logo`, `openingHours`, `priceRange`, or `aggregateRating`.** These are exactly the fields AI assistants read out for local businesses.

7. **No `llms.txt` file** (returns 404). The emerging standard for telling AI systems what the site is and what to cite. Cheap to add for a single-page site.

8. **Social proof is disabled.** The testimonials/reviews section, the portfolio-stats section (600 км мереж, трансформаторні підстанції, 100+ генераторів), and the video section are all **commented out** in `app/page.tsx` (lines 170–243). This removes the strongest available experience/authority signals from the page.

---

## Medium Priority Issues (Fix Within 1 Month)

9. **FAQ schema doesn't match visible content.** The page shows **6** FAQ items; the `FAQPage` JSON-LD contains only **3**. Extend the schema to all six and keep it in sync.

10. **FAQ answers aren't in "answer-target" format.** They're conversational rather than opening with the query verbatim + a tight 40–60-word answer. The pricing answer also dodges numbers entirely, which kills citability for "скільки коштує СЕС" queries — give at least a "від X / індивідуальний розрахунок" anchor.

11. **Registry records mis-categorize the business and carry stale contacts.** Ukrainian aggregators (ua-region, list.in.ua, opendatabot, youcontrol) list the company as *electrical installation* (KVED 43.21), with an unrelated third phone (050 230 49 35) and **no website/email**. AI ingests these — they currently point it at the wrong industry.

12. **Local focus is diluted.** The "Наші Роботи" intro says *"по всій Україні"* (across all Ukraine), undercutting the tightly-local "СЕС у Луцьку" positioning the rest of the page and schema build.

13. **No Bing Webmaster / Bing Places verification, no IndexNow.** Low market weight in Ukraine, but cheap — and the realistic path for a new `.ua` site into the Bing index that Copilot uses.

14. **No visible freshness signal.** No "Оновлено: [дата]" on-page date; sitemap `lastModified` uses `new Date()`, so it reports "now" on every render rather than a real content-change date.

---

## Low Priority Issues (Optimize When Possible)

15. **No Open Graph / Twitter image.** `twitter.card` is `summary_large_image` but no image is set, and `openGraph.images` is empty — link previews (and some AI cards) render blank. No `metadataBase` is set either.
16. **Generic image alt text** (`"Наша Історія 1"`, `${about.title} ${i+1}`); hero background video has no text alternative.
17. **Single-URL sitemap.** Fine for a one-page site, but there's no image sitemap and no room to grow without adding content/pages.
18. **CTA button `href="#"`** in the fallback content (`content/landing.json`) — dead link if that fallback ever renders.
19. **No topical depth.** A single page limits the number of citable passages and long-tail coverage (no guides like "Зелений тариф у Волині" or "УЗЄ vs генератор").

---

## Category Deep Dives

### AI Citability (62/100)
**Strengths:** The FAQ block is the site's best GEO asset — self-contained, buyer-intent Q&A ("Скільки коштує СЕС у Луцьку під ключ?", "Що таке УЗЄ?"), including a clean definitional passage ("УЗЄ — це акумуляторна система, що накопичує…") of exactly the kind AI systems extract and cite. Content is server-rendered and mirrored in `FAQPage` schema.
**Weaknesses:** Limited passage *volume* (one page, ~6 FAQ + short service blurbs); no data tables, comparison content, or pricing ranges; the cost answer avoids numbers. Rewriting each answer to lead with the target query verbatim + a tight 40–60-word answer would lift this materially.

### Brand Authority (20/100)
**The anchor dragging the whole score down.** One genuine positive: "West Vector" resolves to a **real, verifiable entity** — ПП "ВЕСТ-ВЕКТОР", ЄДРПОУ 33166311, registered 2004, same address as the site, with a modest B2B procurement history (Prozorro/Dozorro). Everything else is empty: no GBP, no Facebook/Instagram/YouTube/LinkedIn, no Wikipedia, no reviews, no PR. The only off-site records are auto-generated registry aggregators that describe the firm as *electrical*, not solar. **Entity-disambiguation risk is HIGH:** the generic name collides with many global "Vector" companies, the exact domain is effectively unindexed, and the Latin↔Cyrillic name split is never resolved. An AI model has almost nothing off-site to recognize or cite this brand as a Lutsk solar installer.

### Content E-E-A-T (56/100)
**Experience/Expertise:** Strong local specificity (Lutsk/Volyn named repeatedly), clear services, a 4-step process, concrete stats (1000+ installs, 40% bill reduction, 25-yr warranty), and — critically — a **real 20-year operating history and electrical-infrastructure portfolio that is currently commented out.** Surfacing it would be a major E-E-A-T win.
**Authoritativeness/Trust:** Contact details, address, and an embedded Google Map are present (good). But there are **no named team members, no license/certification numbers, no ЄДРПОУ on-site, no testimonials/reviews (disabled), and no dates.** For an electrical contractor, visible licensing and named expertise are high-trust signals that are entirely missing.

### Technical GEO (80/100)
**Strengths:** Server-side rendered (content visible without JS), HTTPS, `robots.txt` allows all crawlers incl. GPTBot/ClaudeBot/PerplexityBot while sensibly disallowing `/studio/` and `/api/`, canonical tag present, Google Search Console verified, mobile-responsive (Tailwind), lazy-loaded map iframe, sitemap referenced.
**Weaknesses:** No `llms.txt`; H1 not keyword-optimized (and possible Latin-C homoglyph); autoplay hero video is an LCP/JS-weight risk (Swiper + GSAP on top); no `metadataBase`/OG image; single-entry sitemap with an always-"now" `lastModified`. Core Web Vitals weren't measured in this audit — worth a Lighthouse/PSI pass given the video hero.

### Schema & Structured Data (68/100)
**Strengths:** Above-average for a small local site — a well-chosen `ElectricalContractor` type with `address`, `GeoCoordinates`, `areaServed` (Луцьк + Волинська область), and a populated `hasOfferCatalog`, plus a separate `FAQPage`.
**Weaknesses:** Missing the highest-value fields — `telephone`, `email`, `image`/`logo`, `sameAs`, `openingHours`/`OpeningHoursSpecification`, `priceRange`, `aggregateRating`. `FAQPage` covers only 3 of 6 visible questions. No `@id` linking and no `Organization`/`WebSite` node. `alternateName` is present (good start) but should explicitly include the Cyrillic legal form.

### Platform Optimization (54/100)
Market-weighted for Ukraine (Google dominates ~90%+ of search):

| Platform | Sub-score | Status | Weight |
|---|---|---|---|
| Google AI Overviews | 66/100 | Good | 40% |
| ChatGPT Web Search | 53/100 | Fair | 20% |
| Google Gemini | 40/100 | Poor | 20% |
| Bing Copilot | 50/100 | Fair | 12% |
| Perplexity AI | 41/100 | Poor | 8% |

**Google AI Overviews is the realistic prize** — real FAQ Q&A, valid schema, clean SSR, geo coords, and GSC verification give a genuine shot at local AIO pull-in; the missing GBP is the main thing holding it back. Gemini and Perplexity are weak because they depend on entity confirmation and community signals the brand doesn't yet have. Bing is a cheap technical win (Webmaster + Places + IndexNow).

---

## Quick Wins (Implement This Week)

1. **Create & verify a Google Business Profile** at вул. Яровиця 9, category "Solar energy company / Постачальник сонячної енергії," with photos, hours, and service area Луцьк/Волинь. *Single highest-impact action in this report — affects AIO, Gemini, ChatGPT, and Maps at once.*
2. **Fix the fallback content** in `content/landing.json`: replace "HelioNest Solar," the US phone, the placeholder email, and the Kyiv-region works with real West Vector / Lutsk data — so a Sanity outage can't ship the wrong brand.
3. **Fix the H1** to a keyword + location heading ("Сонячні панелі та СЕС у Луцьку"), and confirm the first letter is Cyrillic "С," not Latin "C."
4. **Complete the schema:** add `telephone`, `email`, `image`, `openingHours`, `priceRange`, a Cyrillic `alternateName`, and a `sameAs` array (GBP + any social profiles). Extend `FAQPage` to all 6 questions.
5. **Un-comment the social-proof + track-record sections** (testimonials, the 600 km / substations / generators portfolio stats) and put the 2004 founding date + ЄДРПОУ on the page — instant E-E-A-T.

## 30-Day Action Plan

### Week 1: Own the local entity
- [ ] Create, categorize, and verify a Google Business Profile (NAP matching Яровиця 9)
- [ ] Fix `content/landing.json` fallback (brand, phone, email, works → real Lutsk data)
- [ ] Rewrite the H1 (keyword + location; verify Cyrillic characters)
- [ ] Add `llms.txt`

### Week 2: Complete the schema & entity graph
- [ ] Add `telephone`, `email`, `image`/`logo`, `openingHours`, `priceRange` to the `ElectricalContractor` node
- [ ] Add `sameAs` (GBP + Facebook + Instagram) and a Cyrillic `alternateName`
- [ ] Extend `FAQPage` schema to all 6 questions
- [ ] Add OG/Twitter image + `metadataBase`

### Week 3: Build off-site proof
- [ ] Launch Facebook + Instagram with real Lutsk/Volyn installation photos; link them from the site and `sameAs`
- [ ] Start actively collecting Google reviews; surface star rating on-page once available
- [ ] Un-comment and populate testimonials + the electrical track-record stats
- [ ] Correct the stale registry records (ua-region, list.in.ua): add website/email, current 095 phone, re-categorize toward solar/renewables

### Week 4: Content depth & platform coverage
- [ ] Rewrite FAQ answers to lead with the query verbatim + 40–60-word answers; add a pricing anchor and a visible "Оновлено" date
- [ ] Add 1–2 supporting content blocks/pages ("Зелений тариф у Волині", "УЗЄ vs генератор") for a small topical cluster
- [ ] Verify in Bing Webmaster Tools, create Bing Places, add IndexNow
- [ ] Publish 2–3 short YouTube installation clips and reference them on-page (feeds Gemini + social proof)

---

## Appendix: Pages Analyzed

| URL | Title | Notes |
|---|---|---|
| https://west-vector.com.ua/ | West Vector \| Сонячні панелі та СЕС у Луцьку — монтаж для дому та бізнесу | Single-page landing; SSR; `ElectricalContractor` + `FAQPage` JSON-LD; strong local content; H1 weak; social proof disabled |
| /robots.txt | — | `Allow: /`, disallows `/studio/` + `/api/`, sitemap referenced; all AI crawlers permitted |
| /sitemap.xml | — | Single URL; `lastModified` = render time |
| /llms.txt | — | **404 — not present** |

**Off-site (brand authority):** ua-region.com.ua, opendatabot.ua, youcontrol.com.ua, dozorro.org, list.in.ua — registry-only; no GBP, social, reviews, or PR found.

---

*Scoring: composite = Citability×0.25 + Brand×0.20 + E-E-A-T×0.20 + Technical×0.15 + Schema×0.10 + Platform×0.10. Note: Google Business Profile, Bing verification, and third-party review presence are asserted from external search only — confirm from the owner's Google/Bing accounts before treating as definitively absent.*
