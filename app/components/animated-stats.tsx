"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type StatItem = { value: string; label: string };

function parseValue(raw: string): { num: number; prefix: string; suffix: string; hasSpace: boolean } {
  const match = raw.match(/^([^\d]*)(\d[\d\s]*)(.*)$/);
  if (!match) return { num: 0, prefix: "", suffix: raw, hasSpace: false };
  const prefix = match[1];
  const numStr = match[2].replace(/\s/g, "");
  const suffix = match[3];
  const hasSpace = /\s/.test(match[2]);
  return { num: parseInt(numStr, 10), prefix, suffix, hasSpace };
}

function formatNum(n: number, hasSpace: boolean): string {
  if (!hasSpace) return String(n);
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function StatCounter({ value, label }: StatItem) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [displayed, setDisplayed] = useState(value);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const { num, prefix, suffix, hasSpace } = parseValue(value);
          if (num === 0) return;

          const counter = { val: 0 };
          gsap.to(counter, {
            val: num,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              setDisplayed(`${prefix}${formatNum(Math.round(counter.val), hasSpace)}${suffix}`);
            },
            onComplete: () => {
              setDisplayed(value);
            },
          });
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="rounded-xl bg-slate-50 p-3 sm:rounded-2xl sm:p-4">
      <p ref={ref} className="text-2xl font-black text-emerald-700 sm:text-3xl">
        {displayed}
      </p>
      <p className="text-xs text-slate-600 sm:text-sm">{label}</p>
    </div>
  );
}

export default function AnimatedStats({ items }: { items: StatItem[] }) {
  return (
    <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:gap-4 sm:rounded-3xl sm:p-5">
      {items.map((item) => (
        <StatCounter key={item.label} value={item.value} label={item.label} />
      ))}
    </div>
  );
}
