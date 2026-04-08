import AnimatedStats from "@/app/components/animated-stats";
import ContactForm from "@/app/components/contact-form";
import FaqAccordion from "@/app/components/faq-accordion";
import FunAnimations from "@/app/components/fun-animations";
import SiteHeader from "@/app/components/site-header";
import WorksGallery from "@/app/components/works-gallery";
import { fetchLandingContent } from "@/sanity/lib/fetch-landing-content";
import Image from "next/image";

export default async function Home() {
  const data = await fetchLandingContent();

  return (
    <div className="relative overflow-x-clip bg-[linear-gradient(180deg,#fff7e6_0%,#f4f7f0_45%,#f8fcff_100%)] text-slate-900">
      <FunAnimations />
      <div className="pointer-events-none absolute inset-x-0 -top-28 h-80 bg-[radial-gradient(circle_at_top,#facc15_0%,rgba(250,204,21,0)_60%)]" />
      <div className="pointer-events-none absolute -right-32 top-[24rem] h-72 w-72 rounded-full bg-emerald-200/35 blur-3xl" />
      <div className="pointer-events-none absolute -left-36 top-[52rem] h-72 w-72 rounded-full bg-cyan-200/35 blur-3xl" />
      <SiteHeader companyName={data.companyName} logo={data.logo || undefined} navigation={data.navigation} />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-10 sm:gap-10 sm:px-6 sm:pb-12 md:gap-12 md:px-8 md:pb-14 lg:px-10">
        <section
          data-gsap="fade-up"
          className="relative min-h-[22rem] overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(15,23,42,0.18)] sm:min-h-[26rem] sm:rounded-3xl md:min-h-[30rem]"
        >
          {data.hero.bannerVideo ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={data.hero.bannerImage}
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={data.hero.bannerVideo} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={data.hero.bannerImage}
              alt="Головний банер сонячних рішень"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/50 to-slate-900/70" />
          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">
            <div className="max-w-2xl text-center text-white">
              <p className="inline-block rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-[0.16em] backdrop-blur-sm sm:px-4 sm:text-xs sm:tracking-[0.18em]">
                {data.tagline}
              </p>
              <h2 className="mt-4 text-2xl font-black tracking-tight sm:mt-5 sm:text-3xl md:text-4xl lg:text-5xl">
                {data.hero.title}
              </h2>
              <p className="mt-2 text-sm text-white/85 sm:mt-3 sm:text-base md:text-lg">
                {data.hero.description}
              </p>
            </div>
          </div>
        </section>
        <section data-gsap="fade-up" className="grid gap-8 py-4 sm:gap-9 sm:py-6 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-10 md:py-8">
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <p className="inline-block rounded-full border border-amber-300/70 bg-amber-100/70 px-3 py-1 text-xs font-semibold text-amber-900 sm:px-4 sm:text-sm">
              {data.hero.eyebrow}
            </p>
            <h1 className="max-w-2xl text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              {data.hero.title}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
              {data.hero.description}
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <a
                href={data.hero.primaryCta.href}
                className="rounded-full bg-emerald-700 px-4 py-2.5 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-emerald-800 sm:px-6 sm:py-3 sm:text-sm"
              >
                {data.hero.primaryCta.label}
              </a>
              <a
                href={data.hero.secondaryCta.href}
                className="rounded-full border border-slate-300 bg-white/80 px-4 py-2.5 text-xs font-semibold text-slate-900 transition-colors hover:border-slate-900 sm:px-6 sm:py-3 sm:text-sm"
              >
                {data.hero.secondaryCta.label}
              </a>
            </div>
          </div>
          <AnimatedStats items={data.hero.stats} />
        </section>
        <section className="grid gap-3 sm:gap-4 md:grid-cols-3 md:gap-5">
          {data.benefits.map((benefit) => (
            <article
              data-gsap="fade-up"
              key={benefit.title}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 md:p-6"
            >
              <h2 className="text-lg font-bold tracking-tight sm:text-xl">{benefit.title}</h2>
              <p className="mt-2 text-sm text-slate-700 sm:mt-3 sm:text-base">{benefit.description}</p>
            </article>
          ))}
        </section>
        <section data-gsap="fade-up" id="about" className="grid items-center gap-6 sm:gap-8 md:grid-cols-2">
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{data.about.title}</h2>
            <p className="text-sm leading-relaxed text-slate-700 sm:text-base">{data.about.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {data.about.images.map((src: string, i: number) => (
              <div key={src} className={`relative overflow-hidden rounded-2xl ${i === 0 ? "aspect-[4/5]" : "aspect-[4/5] translate-y-4 sm:translate-y-6"}`}>
                <Image
                  src={src}
                  alt={`${data.about.title} ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
        <section id="services" className="space-y-4 sm:space-y-5 md:space-y-6">
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Послуги</h2>
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
            {data.services.map((service) => (
              <article
                data-gsap="fade-up"
                key={service.title}
                className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 sm:p-5 md:p-6"
              >
                <h3 className="text-base font-bold sm:text-lg">{service.title}</h3>
                <p className="mt-2 text-sm text-slate-700 sm:text-base">{service.description}</p>
              </article>
            ))}
          </div>
        </section>
        <section data-gsap="fade-up" className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 sm:p-7 md:p-8">
          <div className="max-w-3xl">
            <p className="inline-block rounded-full bg-emerald-700 px-3 py-1 text-[10px] font-bold tracking-widest text-white sm:text-xs">
              ВІД 15 КВТ
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">{data.expertise.title}</h2>
            <p className="mt-2 text-sm text-slate-700 sm:text-base">{data.expertise.description}</p>
          </div>
          <ul className="mt-5 grid gap-2.5 sm:mt-6 sm:gap-3 md:grid-cols-2">
            {data.expertise.items.map((item: string) => (
              <li key={item} className="flex gap-3 rounded-xl bg-white/80 p-3 text-sm text-slate-700 sm:p-4 sm:text-base">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section id="process" className="space-y-4 sm:space-y-5 md:space-y-6">
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Етапи роботи</h2>
          <div className="grid gap-3 sm:gap-4 md:grid-cols-4">
            {data.process.map((item) => (
              <article
                data-gsap="fade-up"
                key={item.step}
                className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 sm:p-5"
              >
                <p className="text-[10px] font-black tracking-[0.18em] text-amber-800 sm:text-xs sm:tracking-[0.2em]">
                  КРОК {item.step}
                </p>
                <h3 className="mt-2 text-base font-bold sm:text-lg">{item.title}</h3>
                <p className="mt-2 text-xs text-slate-700 sm:text-sm">{item.description}</p>
              </article>
            ))}
          </div>
        </section>
        <section data-gsap="fade-up" id="portfolio" className="space-y-5 sm:space-y-6 md:space-y-8">
          <div>
            <p className="inline-block rounded-full border border-emerald-300/70 bg-emerald-100/70 px-3 py-1 text-xs font-semibold text-emerald-900 sm:px-4 sm:text-sm">
              У нашому портфоліо
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">Наші досягнення</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {data.portfolioItems.map((item) => {
              const iconPaths: Record<string, string> = {
                lightning: "M13 10V3L4 14h7v7l9-11h-7z",
                globe: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064",
                bulb: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
                settings: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
                building: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1v5m4 0H9",
                document: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
              };
              const svgPath = iconPaths[item.icon] ?? iconPaths.lightning;
              return (
                <article
                  key={item.label}
                  className="group flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-5 transition-colors hover:border-emerald-200 hover:bg-emerald-50/40 sm:p-6"
                >
                  {item.image ? (
                    <div className="relative h-28 w-full overflow-hidden rounded-xl">
                      <Image src={item.image} alt={item.label} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                    </div>
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={svgPath} />
                      </svg>
                    </div>
                  )}
                  {item.stat && (
                    <p className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                      {item.stat}
                      <span className="ml-0.5 text-base font-semibold text-emerald-700"> ✓</span>
                    </p>
                  )}
                  <div>
                    <h3 className="text-sm font-semibold leading-snug text-slate-900 sm:text-base">{item.label}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">{item.sub}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
        {/*<section className="grid gap-3 sm:gap-4 md:grid-cols-2">*/}
        {/*  {data.testimonials.map((item) => (*/}
        {/*    <blockquote*/}
        {/*      data-gsap="fade-up"*/}
        {/*      key={item.name}*/}
        {/*      className="rounded-2xl border border-cyan-200 bg-cyan-50/70 p-4 sm:p-5 md:p-6"*/}
        {/*    >*/}
        {/*      <p className="text-base leading-relaxed sm:text-lg">*/}
        {/*        &ldquo;{item.quote}&rdquo;*/}
        {/*      </p>*/}
        {/*      <footer className="mt-3 text-xs font-semibold text-slate-700 sm:mt-4 sm:text-sm">*/}
        {/*        {item.name} - {item.role}*/}
        {/*      </footer>*/}
        {/*    </blockquote>*/}
        {/*  ))}*/}
        {/*</section>*/}
        {/*<section id="videos" className="space-y-4 sm:space-y-5 md:space-y-6">*/}
        {/*  <div>*/}
        {/*    <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Подивіться Як Ми Працюємо</h2>*/}
        {/*    <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">*/}
        {/*      Відео з наших монтажів, відгуки клієнтів та пояснення технологій.*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*  <VideoSection items={data.videos} />*/}
        {/*</section>*/}
        <section id="projects" className="space-y-4 sm:space-y-5 md:space-y-6">
          <div>
            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Наші Роботи</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
              Реальні проєкти, які ми реалізували для наших клієнтів по всій Україні.
            </p>
          </div>
          <WorksGallery items={data.works} />
          {/*<div>*/}
          {/*  <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">*/}
          {/*    Відео з наших монтажів, відгуки клієнтів та пояснення технологій.*/}
          {/*  </p>*/}
          {/*</div>*/}
          {/*<VideoSection items={data.videos} />*/}
        </section>
        <section id="faq" className="space-y-4 sm:space-y-5 md:space-y-6">
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Поширені Питання</h2>
          <FaqAccordion items={data.faq} />
        </section>
        <section
          data-gsap="fade-up"
          id="cta"
          className="rounded-2xl border border-emerald-300 bg-emerald-700 px-4 py-6 text-white sm:px-6 sm:py-8 md:rounded-3xl md:px-8 md:py-10"
        >
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{data.cta.title}</h2>
          <p className="mt-2 max-w-2xl text-sm text-emerald-100 sm:mt-3 sm:text-base">{data.cta.description}</p>
          <div className="mt-6 rounded-2xl border border-white/20 bg-white/8 p-4 sm:mt-7 sm:p-5 md:mt-8 md:p-6">
            <h3 className="text-lg font-bold sm:text-xl">Надішліть нам ваші дані</h3>
            <p className="mt-2 text-xs text-emerald-100 sm:text-sm">
              Ми надішлемо відповідь на email із персональним розрахунком.
            </p>
            <div className="mt-4 sm:mt-5">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-slate-200 bg-white/70">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 sm:px-6 md:px-10 md:py-10 md:grid-cols-[1fr_1fr] md:items-start">
          <div className="grid gap-2 text-xs text-slate-700 sm:gap-3 sm:text-sm">
            <p className="text-sm font-semibold text-slate-900 sm:text-base">{data.companyName}</p>
            <p>{data.footer.address}</p>
            <p>{data.footer.phone}</p>
            <a href={`mailto:${data.footer.email}`} className="hover:text-emerald-700">
              {data.footer.email}
            </a>
            <p>© {new Date().getFullYear()} {data.companyName}. Усі права захищено.</p>
          </div>
          <div className="overflow-hidden border border-slate-200 shadow-sm">
            <iframe
              title="Розташування офісу"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d324.9717729841046!2d25.327093781643903!3d50.753691442940855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472599ed23dce7b5%3A0x5acd76292ad4bc54!2z0J_QnyAi0JLQldCh0KIt0JLQldCa0KLQntCgIg!5e1!3m2!1suk!2sua!4v1775630003234!5m2!1suk!2sua"
              width="100%"
              height="152"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
