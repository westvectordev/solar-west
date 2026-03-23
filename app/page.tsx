import ContactForm from "@/app/components/contact-form";
import FunAnimations from "@/app/components/fun-animations";
import HeroSlider from "@/app/components/hero-slider";
import SiteHeader from "@/app/components/site-header";
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

      <SiteHeader companyName={data.companyName} navigation={data.navigation} />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 pb-14 sm:gap-16 sm:px-6 sm:pb-16 md:gap-20 md:px-8 md:pb-20 lg:px-10">
        <section
          data-gsap="fade-up"
          className="relative min-h-[24rem] overflow-hidden rounded-[1.5rem] border border-emerald-100 shadow-[0_30px_80px_rgba(15,23,42,0.2)] sm:min-h-[28rem] sm:rounded-[2rem] md:min-h-[32rem]"
        >
          <Image
            src={data.hero.bannerImage}
            alt="Головний банер сонячних рішень"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.25)_0%,rgba(2,6,23,0.6)_60%,rgba(2,6,23,0.7)_100%)]" />
          <div className="absolute inset-x-0 top-0 flex justify-center px-4 pt-6 sm:px-6 sm:pt-8 md:pt-10">
            <div className="max-w-2xl text-center text-white">
              <p className="inline-block rounded-full border border-white/40 bg-white/10 px-3 py-1 text-[10px] font-bold tracking-[0.16em] sm:px-4 sm:text-xs sm:tracking-[0.18em]">
                {data.tagline}
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl">
                {data.hero.title}
              </h2>
              <p className="mt-2 text-xs text-white/90 sm:mt-3 sm:text-sm md:text-base">
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

          <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:gap-4 sm:rounded-3xl sm:p-5">
            {data.hero.stats.map((item) => (
              <div key={item.label} className="rounded-xl bg-slate-50 p-3 sm:rounded-2xl sm:p-4">
                <p className="text-2xl font-black text-emerald-700 sm:text-3xl">{item.value}</p>
                <p className="text-xs text-slate-600 sm:text-sm">{item.label}</p>
              </div>
            ))}
          </div>
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

        <section id="process" className="space-y-4 sm:space-y-5 md:space-y-6">
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Як Це Працює</h2>
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
<section data-gsap="fade-up" className="-mt-6 flex justify-center sm:-mt-8 md:-mt-12">
          <HeroSlider slides={data.hero.slider} />
        </section>
        <section id="projects" className="space-y-4 sm:space-y-5 md:space-y-6">
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Останні Проєкти</h2>
          <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
            {data.projects.map((project) => (
              <article
                data-gsap="fade-up"
                key={project.name}
                className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 md:p-6"
              >
                <p className="text-xs font-semibold text-emerald-700 sm:text-sm">
                  {project.location}
                </p>
                <h3 className="mt-1 text-lg font-bold sm:text-xl">{project.name}</h3>
                <p className="mt-2 text-sm text-slate-700 sm:mt-3 sm:text-base">{project.summary}</p>
                <p className="mt-3 text-xs font-semibold text-slate-900 sm:mt-4 sm:text-sm">
                  {project.result}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-3 sm:gap-4 md:grid-cols-2">
          {data.testimonials.map((item) => (
            <blockquote
              data-gsap="fade-up"
              key={item.name}
              className="rounded-2xl border border-cyan-200 bg-cyan-50/70 p-4 sm:p-5 md:p-6"
            >
              <p className="text-base leading-relaxed sm:text-lg">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-3 text-xs font-semibold text-slate-700 sm:mt-4 sm:text-sm">
                {item.name} - {item.role}
              </footer>
            </blockquote>
          ))}
        </section>

        <section id="faq" className="space-y-4 sm:space-y-5 md:space-y-6">
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Поширені Питання</h2>
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
            {data.faq.map((item) => (
              <article
                data-gsap="fade-up"
                key={item.question}
                className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 md:p-6"
              >
                <h3 className="text-sm font-bold sm:text-base">{item.question}</h3>
                <p className="mt-2 text-sm text-slate-700 sm:text-base">{item.answer}</p>
              </article>
            ))}
          </div>
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
        <div className="mx-auto grid w-full max-w-6xl gap-2 px-4 py-8 text-xs text-slate-700 sm:gap-3 sm:px-6 sm:text-sm md:px-10 md:py-10">
          <p className="text-sm font-semibold text-slate-900 sm:text-base">{data.companyName}</p>
          <p>{data.footer.address}</p>
          <p>{data.footer.phone}</p>
          <a href={`mailto:${data.footer.email}`} className="hover:text-emerald-700">
            {data.footer.email}
          </a>
          <p>{data.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
}
