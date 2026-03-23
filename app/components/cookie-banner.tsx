"use client";

import { useState } from "react";
import { useCookieConsent } from "@/app/components/cookie-consent-provider";

export default function CookieBanner() {
  const {
    isBannerVisible,
    closeBanner,
    acceptAll,
    rejectOptional,
    saveCustom,
  } = useCookieConsent();
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [preferences, setPreferences] = useState(false);

  if (!isBannerVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.2)] backdrop-blur-sm sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-slate-900 sm:text-base">
              Ми використовуємо cookies
            </p>
            <p className="mt-1 text-xs text-slate-700 sm:text-sm">
              Ми використовуємо файли cookie для забезпечення коректної роботи
              сайту, покращення взаємодії з користувачем, аналітики та персоналізації
              контенту. Ви можете прийняти всі cookies, відхилити необов’язкові або
              налаштувати власні параметри згоди.
            </p>
          </div>
          <button
            type="button"
            aria-label="Закрити банер"
            onClick={closeBanner}
            className="rounded-full border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-600 hover:border-slate-500"
          >
            ✕
          </button>
        </div>

        {showSettings && (
          <div className="mt-4 grid gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs sm:text-sm">
            <label className="flex items-center justify-between gap-3">
              <span>Необхідні cookies (завжди увімкнено)</span>
              <input type="checkbox" checked readOnly />
            </label>
            <label className="flex items-center justify-between gap-3">
              <span>Аналітика</span>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
              />
            </label>
            <label className="flex items-center justify-between gap-3">
              <span>Маркетинг</span>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(event) => setMarketing(event.target.checked)}
              />
            </label>
            <label className="flex items-center justify-between gap-3">
              <span>Персоналізація</span>
              <input
                type="checkbox"
                checked={preferences}
                onChange={(event) => setPreferences(event.target.checked)}
              />
            </label>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setShowSettings((prev) => !prev)}
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 transition-colors hover:border-slate-500"
          >
            {showSettings ? "Сховати Налаштування" : "Налаштування"}
          </button>
          <button
            type="button"
            onClick={rejectOptional}
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 transition-colors hover:border-slate-500"
          >
            Відхилити Необов’язкові
          </button>
          <button
            type="button"
            onClick={() => saveCustom({ analytics, marketing, preferences })}
            className="rounded-full border border-emerald-300 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-100"
          >
            Зберегти Вибір
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="rounded-full bg-emerald-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-800"
          >
            Прийняти Все
          </button>
        </div>
      </div>
    </div>
  );
}
