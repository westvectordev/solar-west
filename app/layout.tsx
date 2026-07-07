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
    url: "https://west-vector.com.ua",
  },
  twitter: {
    card: "summary_large_image",
    title: "West Vector | Сонячні панелі та СЕС у Луцьку",
    description:
      "Монтаж СЕС, сонячних панелей та установок зберігання енергії (УЗЄ) у Луцьку та Волинській області.",
  },
  verification: {
    google: "rA0VlmQUalXXRme9R9OZNFjdM3aOvKKNqesVfheUvR8",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ElectricalContractor",
  name: "West Vector",
  alternateName: ["СЕС Луцьк", "West Vector СЕС", "Сонячні електростанції Луцьк"],
  url: "https://west-vector.com.ua/",
  description:
    "Монтаж СЕС (сонячних електростанцій), сонячних панелей та установок зберігання енергії (УЗЄ) у Луцьку та Волинській області. Проєктування, встановлення, сервіс.",
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
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "СЕС під ключ для будинків у Луцьку" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "СЕС для бізнесу у Луцьку та Волинській області" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Установка зберігання енергії (УЗЄ) — акумуляторні системи у Луцьку" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Гібридні та автономні СЕС у Луцьку" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Сервіс і моніторинг СЕС" } },
    ],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Скільки коштує СЕС у Луцьку під ключ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Вартість СЕС у Луцьку залежить від потужності (ми беремо проєкти від 15 кВт), типу обладнання та наявності установки зберігання енергії. Зробимо безкоштовний розрахунок і прозору комерційну пропозицію під ваш об'єкт у Луцьку та Волинській області.",
      },
    },
    {
      "@type": "Question",
      name: "Що таке УЗЄ (установка зберігання енергії) і навіщо вона потрібна?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "УЗЄ — це акумуляторна система зберігання енергії, яка накопичує згенеровану СЕС електроенергію та живить критичні лінії під час відключень мережі. У Луцьку встановлюємо УЗЄ як окремо, так і у складі гібридних сонячних електростанцій.",
      },
    },
    {
      "@type": "Question",
      name: "Ви встановлюєте СЕС лише у Луцьку?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ми монтуємо СЕС та установки зберігання енергії у Луцьку і по всій Волинській області — для приватних будинків, комерційних і промислових об'єктів.",
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
