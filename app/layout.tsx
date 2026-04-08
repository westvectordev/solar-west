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
  title: "West Vector | Сонячні Системи Для Будинку Та Бізнесу",
  description:
    "West Vector проєктує та встановлює сонячні електростанції й акумуляторні системи для будинків і бізнесу. Отримайте безкоштовний розрахунок економії.",
  keywords: [
    "сонячні панелі",
    "сонячна електростанція",
    "встановлення сонячних систем",
    "акумуляторні системи",
    "енергонезалежність",
    "solar installation",
  ],
  openGraph: {
    title: "West Vector | Сонячні Системи Для Будинку Та Бізнесу",
    description:
      "Сучасні сонячні та акумуляторні рішення: менші рахунки, резерв під час відключень і швидкий запуск системи.",
    type: "website",
    locale: "uk_UA",
  },
  twitter: {
    card: "summary_large_image",
    title: "West Vector | Сонячні Системи",
    description:
      "Проєктування та монтаж сонячних систем і батарей для будинків і бізнесу.",
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
      <body className="min-h-full flex flex-col">
        <CookieConsentProvider>
          {children}
          <CookieBanner />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
