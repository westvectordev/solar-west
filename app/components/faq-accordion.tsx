"use client";

import { useRef, useState } from "react";
import gsap from "gsap";

type FaqItem = { question: string; answer: string };

function FaqEntry({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  function toggle() {
    const body = bodyRef.current;
    const arrow = arrowRef.current;
    if (!body || !arrow) return;

    if (open) {
      gsap.to(body, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power2.inOut",
        onComplete: () => setOpen(false),
      });
      gsap.to(arrow, { rotate: 0, duration: 0.3, ease: "power2.inOut" });
    } else {
      setOpen(true);
      gsap.set(body, { height: "auto", opacity: 1 });
      const fullHeight = body.scrollHeight;
      gsap.fromTo(
        body,
        { height: 0, opacity: 0 },
        { height: fullHeight, opacity: 1, duration: 0.35, ease: "power2.inOut" }
      );
      gsap.to(arrow, { rotate: 180, duration: 0.3, ease: "power2.inOut" });
    }
  }

  return (
    <article
      data-gsap="fade-up"
      className="rounded-2xl border border-slate-200 bg-white"
    >
      <button
        type="button"
        onClick={toggle}
        className="flex w-full items-center justify-between gap-3 p-4 text-left sm:p-5 md:p-6"
      >
        <h3 className="text-sm font-bold sm:text-base">{item.question}</h3>
        <svg
          ref={arrowRef}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 text-slate-500"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div ref={bodyRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <p className="px-4 pb-4 text-sm text-slate-700 sm:px-5 sm:pb-5 sm:text-base md:px-6 md:pb-6">
          {item.answer}
        </p>
      </div>
    </article>
  );
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="grid gap-3 sm:gap-4">
      {items.map((item) => (
        <FaqEntry key={item.question} item={item} />
      ))}
    </div>
  );
}
