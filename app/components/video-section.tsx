"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

type VideoItem = {
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
};

export default function VideoSection({ items }: { items: VideoItem[] }) {
  const [playing, setPlaying] = useState<VideoItem | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  function open(item: VideoItem) {
    setPlaying(item);
    requestAnimationFrame(() => {
      if (overlayRef.current) {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        const panel = overlayRef.current.querySelector("[data-video-panel]");
        if (panel) {
          gsap.fromTo(panel, { y: 30, scale: 0.95, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.35, ease: "power3.out" });
        }
      }
    });
  }

  function close() {
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => setPlaying(null),
      });
    } else {
      setPlaying(null);
    }
  }

  return (
    <>
      <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.title}
            type="button"
            onClick={() => open(item)}
            data-gsap="fade-up"
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-transform group-hover:scale-110 sm:h-14 sm:w-14">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#047857" stroke="none">
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-5">
              <h3 className="text-sm font-bold text-slate-900 sm:text-base">{item.title}</h3>
              <p className="mt-1.5 line-clamp-2 text-xs text-slate-600 sm:text-sm">{item.description}</p>
            </div>
          </button>
        ))}
      </div>

      {playing && (
        <div
          ref={overlayRef}
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div
            data-video-panel
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl"
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 text-slate-700 backdrop-blur-sm transition-colors hover:bg-white sm:h-9 sm:w-9"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <video
              autoPlay
              controls
              playsInline
              poster={playing.thumbnail}
              className="aspect-video w-full"
            >
              <source src={playing.videoUrl} type="video/mp4" />
            </video>
            <div className="p-4 sm:p-5">
              <h3 className="text-base font-bold text-white sm:text-lg">{playing.title}</h3>
              <p className="mt-1.5 text-xs text-slate-300 sm:text-sm">{playing.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
