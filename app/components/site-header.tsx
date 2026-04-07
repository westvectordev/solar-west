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
          aria-label={open ? "Close menu" : "Open menu"}
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
      <div
        className={`pointer-events-none fixed inset-0 top-0 bg-slate-900/40 transition-opacity duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />
      <div
        className={`absolute left-3 right-3 top-[3.5rem] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl transition-all duration-300 lg:hidden sm:left-5 sm:right-5 sm:top-[3.75rem] md:left-7 md:right-7 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <nav className="grid gap-0.5 p-2 sm:p-3">
          {navigation.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-800"
              style={{
                transitionDelay: open ? `${index * 40}ms` : "0ms",
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href={ctaHref}
            onClick={(e) => handleScroll(e, ctaHref)}
            className="mt-1 rounded-lg bg-emerald-700 px-3 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
          >
            {ctaLabel}
          </a>
        </nav>
      </div>
    </header>
  );
}
