"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

type Slide = {
  title: string;
  description: string;
  metric: string;
  image: string;
};

type HeroSliderProps = {
  slides: Slide[];
};

export default function HeroSlider({ slides }: HeroSliderProps) {
  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="hero-swiper w-full max-w-[95vw] rounded-2xl border border-white/35 bg-white/85 p-3 shadow-[0_28px_60px_rgba(2,6,23,0.22)] backdrop-blur-md sm:max-w-xl sm:p-4 md:max-w-2xl md:rounded-3xl md:p-5">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={18}
        slidesPerView={1}
        speed={850}
        loop={slides.length > 1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3200,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={`${slide.title}-${slide.image}`}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="mt-3 space-y-1.5 sm:mt-4 sm:space-y-2">
              <p className="text-[10px] font-black tracking-[0.18em] text-emerald-700 sm:text-xs">
                РЕКОМЕНДОВАНИЙ ПРОЄКТ
              </p>
              <h3 className="text-lg font-black text-slate-900 sm:text-xl">
                {slide.title}
              </h3>
              <p className="text-xs text-slate-700 sm:text-sm">{slide.description}</p>
              <p className="text-xs font-semibold text-slate-900 sm:text-sm">
                {slide.metric}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

