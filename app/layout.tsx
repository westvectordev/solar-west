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

export const metadata: Metadata = {
  title: "West Vector | Сонячні системи у Луцьку — монтаж для дому та бізнесу",
  description:
    "West Vector — монтаж сонячних панелей і акумуляторних систем у Луцьку та Волинській області. Від 15 кВт. Безкоштовний розрахунок економії.",
  keywords: [
    "сонячні панелі Луцьк",
    "сонячні системи Луцьк",
    "монтаж сонячних панелей Луцьк",
    "сонячна електростанція Луцьк",
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
    title: "West Vector | Сонячні системи у Луцьку — монтаж для дому та бізнесу",
    description:
      "Монтаж сонячних панелей і акумуляторних систем у Луцьку та Волинській області. Менші рахунки, резерв під час відключень, швидкий запуск.",
    type: "website",
    locale: "uk_UA",
    url: "https://west-vector.com.ua",
  },
  twitter: {
    card: "summary_large_image",
    title: "West Vector | Сонячні системи у Луцьку",
    description:
      "Монтаж сонячних панелей і акумуляторних систем у Луцьку та Волинській області.",
  },
  verification: {
    google: "rA0VlmQUalXXRme9R9OZNFjdM3aOvKKNqesVfheUvR8",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ElectricalContractor",
  name: "West Vector",
  url: "https://west-vector.com.ua/",
  description:
    "Монтаж сонячних панелей і акумуляторних систем у Луцьку та Волинській області. Проєктування, встановлення, сервіс.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "вул. Яровиця, 9, прим. 7",
    addressLocality: "Луцьк",
    postalCode: "43006",
    addressCountry: "UA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.753691,
    longitude: 25.327094,
  },
  areaServed: [
    { "@type": "City", name: "Луцьк" },
    { "@type": "AdministrativeArea", name: "Волинська область" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Послуги",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Встановлення сонячних панелей для будинків у Луцьку" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Сонячні системи для бізнесу у Волинській області" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Інтеграція акумуляторного зберігання" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Сервіс і моніторинг сонячних систем" } },
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
