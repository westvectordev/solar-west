"use client";

import { useRef, useState, useCallback } from "react";
import type { SwiperClass } from "swiper/react";
import gsap from "gsap";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

type WorkItem = {
  title: string;
  location: string;
  capacity: string;
  category: string;
  description: string;
  images: string[];
};

const categories = ["Усі", "Житлова", "Комерційна", "Агро"];

const chevronLeft = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
);
const chevronRight = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18"/></svg>
);

function SliderArrow({ dir, onClick, size = "sm" }: { dir: "prev" | "next"; onClick: () => void; size?: "sm" | "md" }) {
  const px = size === "sm" ? "h-6 w-6" : "h-7 w-7";
  const pos = dir === "prev" ? "left-2" : "right-2";
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={`absolute top-1/2 z-10 ${pos} -translate-y-1/2 ${px} flex items-center justify-center rounded-full bg-white/85 text-slate-700 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-md`}
    >
      {dir === "prev" ? chevronLeft : chevronRight}
    </button>
  );
}

function CardSlider({ images, title }: { images: string[]; title: string }) {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <Image
        src={images[0]}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    );
  }

  return (
    <>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        loop
        onSwiper={setSwiper}
        className="works-slider h-full w-full"
      >
        {images.map((src, i) => (
          <SwiperSlide key={src}>
            <Image
              src={src}
              alt={`${title} — ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {swiper && (
        <>
          <SliderArrow dir="prev" onClick={() => swiper.slidePrev()} />
          <SliderArrow dir="next" onClick={() => swiper.slideNext()} />
        </>
      )}
    </>
  );
}

function ModalSlider({ images, title }: { images: string[]; title: string }) {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <Image
        src={images[0]}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 672px"
        className="object-cover"
      />
    );
  }

  return (
    <>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        loop
        onSwiper={setSwiper}
        className="works-slider h-full w-full"
      >
        {images.map((src, i) => (
          <SwiperSlide key={src}>
            <Image
              src={src}
              alt={`${title} — ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {swiper && (
        <>
          <SliderArrow dir="prev" onClick={() => swiper.slidePrev()} size="md" />
          <SliderArrow dir="next" onClick={() => swiper.slideNext()} size="md" />
        </>
      )}
    </>
  );
}

export default function WorksGallery({ items }: { items: WorkItem[] }) {
  const [active, setActive] = useState("Усі");
  const [selected, setSelected] = useState<WorkItem | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const filtered = active === "Усі" ? items : items.filter((w) => w.category === active);

  function handleFilter(cat: string) {
    if (cat === active) return;
    setActive(cat);

    requestAnimationFrame(() => {
      const cards = gridRef.current?.querySelectorAll("[data-work-card]");
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, ease: "power2.out", stagger: 0.06 }
        );
      }
    });
  }

  function openModal(item: WorkItem) {
    setSelected(item);
    requestAnimationFrame(() => {
      if (overlayRef.current) {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        const panel = overlayRef.current.querySelector("[data-modal-panel]");
        if (panel) {
          gsap.fromTo(panel, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" });
        }
      }
    });
  }

  function closeModal() {
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        onComplete: () => setSelected(null),
      });
    } else {
      setSelected(null);
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => handleFilter(cat)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors sm:px-5 sm:text-sm ${
              active === cat
                ? "bg-emerald-700 text-white shadow-md"
                : "border border-slate-300 bg-white text-slate-700 hover:border-slate-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div ref={gridRef} className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <article
            data-work-card
            key={item.title}
            onClick={() => openModal(item)}
            className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <CardSlider images={item.images ?? []} title={item.title} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold text-slate-800 backdrop-blur-sm sm:text-xs">
                {item.category}
              </span>
              <div className="pointer-events-none absolute bottom-3 left-3 right-3">
                <p className="text-sm font-bold text-white sm:text-base">{item.title}</p>
              </div>
            </div>
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-4 text-xs text-slate-500 sm:text-sm">
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  {item.location}
                </span>
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  {item.capacity}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-xs text-slate-600 sm:text-sm">{item.description}</p>
            </div>
          </article>
        ))}
      </div>

      {selected && (
        <div
          ref={overlayRef}
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <div
            data-modal-panel
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-t-3xl">
              <ModalSlider images={selected.images ?? []} title={selected.title} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-3 top-3 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 text-slate-700 backdrop-blur-sm transition-colors hover:bg-white sm:h-9 sm:w-9"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5 sm:p-7">
              <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                {selected.category}
              </span>
              <h3 className="mt-3 text-xl font-black tracking-tight sm:text-2xl">{selected.title}</h3>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  {selected.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  {selected.capacity}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">{selected.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
