import type { Metadata } from "next";
import CookieBanner from "@/app/components/cookie-banner";
import { CookieConsentProvider } from "@/app/components/cookie-consent-provider";
import { Geist, Geist_Mono } from "next/font/google";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://west-vector.com.ua";
const OG_IMAGE =
  "https://cdn.sanity.io/images/ih3503tq/production/515c52d0c272a4bdd1a23992ba66747e77c7f52b-1280x853.png";
const LOGO_URL =
  "https://cdn.sanity.io/images/ih3503tq/production/9cddfdf54ced035c94e51d2f84f327aa98a57788-2416x685.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "West Vector | Сонячні панелі та СЕС у Луцьку — монтаж для дому та бізнесу",
  description:
    "West Vector — монтаж СЕС (сонячних електростанцій), сонячних панелей та установок зберігання енергії (УЗЄ) у Луцьку та Волинській області. Від 15 кВт. Безкоштовний розрахунок економії.",
  keywords: [
    "СЕС Луцьк",
    "УЗЄ Луцьк",
    "установка зберігання енергії Луцьк",
    "сонячна електростанція Луцьк",
    "сонячні панелі Луцьк",
    "сонячні системи Луцьк",
    "монтаж сонячних панелей Луцьк",
    "гібридна СЕС Луцьк",
    "автономна СЕС Луцьк",
    "СЕС під ключ Луцьк",
    "сонячні системи Волинь",
    "West Vector Луцьк",
    "акумуляторні системи Луцьк",
    "сонячні панелі",
    "встановлення сонячних систем",
    "енергонезалежність",
  ],
  alternates: {
    canonical: "https://west-vector.com.ua",
  },
  openGraph: {
    title: "West Vector | Сонячні панелі та СЕС у Луцьку — монтаж для дому та бізнесу",
    description:
      "Монтаж СЕС, сонячних панелей та установок зберігання енергії (УЗЄ) у Луцьку та Волинській області. Менші рахунки, резерв під час відключень, швидкий запуск.",
    type: "website",
    locale: "uk_UA",
    url: SITE_URL,
    siteName: "West Vector",
    images: [
      {
        url: OG_IMAGE,
        width: 1280,
        height: 853,
        alt: "Сонячна електростанція, встановлена West Vector у Луцьку",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "West Vector | Сонячні панелі та СЕС у Луцьку",
    description:
      "Монтаж СЕС, сонячних панелей та установок зберігання енергії (УЗЄ) у Луцьку та Волинській області.",
    images: [OG_IMAGE],
  },
  verification: {
    google: "rA0VlmQUalXXRme9R9OZNFjdM3aOvKKNqesVfheUvR8",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ElectricalContractor",
  "@id": `${SITE_URL}/#organization`,
  name: "West Vector",
  legalName: "ПП «ВЕСТ-ВЕКТОР»",
  alternateName: [
    "Вест Вектор",
    "ВЕСТ-ВЕКТОР",
    "СЕС Луцьк",
    "West Vector СЕС",
    "Сонячні електростанції Луцьк",
  ],
  url: `${SITE_URL}/`,
  logo: LOGO_URL,
  image: OG_IMAGE,
  description:
    "Монтаж СЕС (сонячних електростанцій), сонячних панелей та установок зберігання енергії (УЗЄ) у Луцьку та Волинській області. Проєктування, встановлення, сервіс.",
  foundingDate: "2004",
  telephone: "+380955572063",
  email: "west_veсtor@ukr.net",
  priceRange: "Індивідуальний розрахунок · проєкти від 15 кВт",
  currenciesAccepted: "UAH",
  identifier: {
    "@type": "PropertyValue",
    propertyID: "ЄДРПОУ",
    value: "33166311",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "вул. Яровиця, 9, прим. 7",
    addressLocality: "Луцьк",
    addressRegion: "Волинська область",
    postalCode: "43006",
    addressCountry: "UA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.753691,
    longitude: 25.327094,
  },
  hasMap:
    "https://www.google.com/maps/search/?api=1&query=50.753691,25.327094",
  // TODO: заповнити реальними бізнес-профілями після створення (Google Business Profile, Facebook, Instagram, YouTube).
  sameAs: [] as string[],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  areaServed: [
    { "@type": "City", name: "Луцьк" },
    { "@type": "AdministrativeArea", name: "Волинська область" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Послуги",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "СЕС під ключ для будинків у Луцьку" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "СЕС для бізнесу у Луцьку та Волинській області" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Установка зберігання енергії (УЗЄ) — акумуляторні системи у Луцьку" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Гібридні та автономні СЕС у Луцьку" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Сервіс і моніторинг СЕС" } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* FAQPage JSON-LD is generated from Sanity data in app/page.tsx so it never drifts from the visible FAQ. */}
      </head>
      <body className="min-h-full flex flex-col">
        <CookieConsentProvider>
          {children}
          <CookieBanner />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
