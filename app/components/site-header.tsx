"use client";

import { useEffect, useState } from "react";

type NavigationItem = {
  label: string;
  href: string;
};

type SiteHeaderProps = {
  companyName: string;
  navigation: NavigationItem[];
};

export default function SiteHeader({ companyName, navigation }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="relative z-40 mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-7 lg:px-10 lg:py-8">
      <div className="flex items-center justify-between">
        <a href="#" className="text-base font-black sm:text-lg tracking-tight">
          {companyName}
        </a>

        <nav className="hidden gap-5 text-sm font-semibold lg:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-emerald-700"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="relative grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full border border-slate-300/90 bg-white/90 text-slate-900 shadow-sm transition-colors hover:border-slate-500 lg:hidden"
        >
          <span
            className={`absolute h-0.5 w-5 bg-current transition-transform duration-300 ${
              open ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`absolute h-0.5 w-5 bg-current transition-opacity duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-0.5 w-5 bg-current transition-transform duration-300 ${
              open ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </button>
      </div>

      <div
        className={`pointer-events-none fixed inset-0 bg-slate-900/35 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />

      <div
        className={`absolute left-4 right-4 top-[4.5rem] overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-xl backdrop-blur-sm transition-all duration-300 lg:hidden sm:left-6 sm:right-6 sm:top-[5rem] md:left-8 md:right-8 md:top-[5.25rem] lg:left-10 lg:right-10 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <nav className="grid gap-1 p-3 sm:p-4">
          {navigation.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm sm:px-4 sm:py-3 font-semibold text-slate-800 transition-colors hover:bg-emerald-50 hover:text-emerald-800"
              style={{
                transitionDelay: open ? `${index * 45}ms` : "0ms",
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

