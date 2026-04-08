"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";

type NavigationItem = {
  label: string;
  href: string;
};

type SiteHeaderProps = {
  companyName: string;
  logo?: string;
  navigation: NavigationItem[];
  ctaHref?: string;
  ctaLabel?: string;
};

export default function SiteHeader({
  companyName,
  logo,
  navigation,
  ctaHref = "#cta",
  ctaLabel = "Зв'язатися",
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const lineTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    let wasScrolled = false;
    function onScroll() {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);

      if (isScrolled && !wasScrolled) {
        setShowLine(true);
        if (lineTimer.current) clearTimeout(lineTimer.current);
        lineTimer.current = setTimeout(() => setShowLine(false), 1000);
      }
      wasScrolled = isScrolled;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (lineTimer.current) clearTimeout(lineTimer.current);
    };
  }, []);

  function handleScroll(e: MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith("#")) return;
    const el = document.querySelector(href);
    if (el) {
      e.preventDefault();
      setOpen(false);
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-lg shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 sm:py-4 md:px-8 lg:px-10">
          <a href="#" className="shrink-0">
            {logo ? (
              <Image
                src={logo}
                alt={companyName}
                width={120}
                height={40}
                className="h-8 w-auto sm:h-9"
              />
            ) : (
              <span className="text-sm font-black tracking-tight sm:text-base">{companyName}</span>
            )}
          </a>
          <nav className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaHref}
              onClick={(e) => handleScroll(e, ctaHref)}
              className="ml-3 rounded-full bg-emerald-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-800 sm:text-sm"
            >
              {ctaLabel}
            </a>
          </nav>
          <button
            type="button"
            aria-label={open ? "Закрити меню" : "Відкрити меню"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:border-slate-400 lg:hidden"
          >
            <span
              className={`absolute h-[1.5px] w-4 rounded-full bg-current transition-transform duration-300 ${
                open ? "rotate-45" : "-translate-y-[5px]"
              }`}
            />
            <span
              className={`absolute h-[1.5px] w-4 rounded-full bg-current transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-[1.5px] w-4 rounded-full bg-current transition-transform duration-300 ${
                open ? "-rotate-45" : "translate-y-[5px]"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu modal */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-slate-900/50"
          onClick={() => setOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute inset-x-0 top-0 bg-white shadow-2xl transition-transform duration-300 ease-out ${
            open ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5 sm:px-6 sm:py-4">
            <a href="#" onClick={() => setOpen(false)} className="shrink-0">
              {logo ? (
                <Image
                  src={logo}
                  alt={companyName}
                  width={120}
                  height={40}
                  className="h-8 w-auto sm:h-9"
                />
              ) : (
                <span className="text-sm font-black tracking-tight sm:text-base">{companyName}</span>
              )}
            </a>
            <button
              type="button"
              aria-label="Закрити меню"
              onClick={() => setOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:border-slate-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Nav items */}
          <nav className="grid gap-1 px-4 py-4 sm:px-6">
            {navigation.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="rounded-xl px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-800"
                style={{ transitionDelay: open ? `${60 + index * 40}ms` : "0ms" }}
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaHref}
              onClick={(e) => handleScroll(e, ctaHref)}
              className="mt-2 rounded-xl bg-emerald-700 px-4 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-emerald-800"
            >
              {ctaLabel}
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}
