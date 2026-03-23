import fallbackContent from "@/content/landing.json";
import { isSanityConfigured } from "@/sanity/env";
import { getSanityClient } from "@/sanity/lib/client";
import { LANDING_PAGE_QUERY } from "@/sanity/lib/queries";

type LandingData = typeof fallbackContent;

export async function fetchLandingContent(): Promise<LandingData> {
  if (!isSanityConfigured) {
    return fallbackContent;
  }

  try {
    const sanityClient = getSanityClient();
    if (!sanityClient) {
      return fallbackContent;
    }

    const cmsData = await sanityClient.fetch<Partial<LandingData> | null>(
      LANDING_PAGE_QUERY,
      {},
      { next: { revalidate: 60 } }
    );

    if (!cmsData) {
      return fallbackContent;
    }

    return {
      ...fallbackContent,
      ...cmsData,
      hero: {
        ...fallbackContent.hero,
        ...cmsData.hero,
        stats: cmsData.hero?.stats ?? fallbackContent.hero.stats,
        slider: cmsData.hero?.slider ?? fallbackContent.hero.slider,
      },
      navigation: cmsData.navigation ?? fallbackContent.navigation,
      benefits: cmsData.benefits ?? fallbackContent.benefits,
      services: cmsData.services ?? fallbackContent.services,
      process: cmsData.process ?? fallbackContent.process,
      projects: cmsData.projects ?? fallbackContent.projects,
      testimonials: cmsData.testimonials ?? fallbackContent.testimonials,
      faq: cmsData.faq ?? fallbackContent.faq,
      cta: {
        ...fallbackContent.cta,
        ...cmsData.cta,
      },
      footer: {
        ...fallbackContent.footer,
        ...cmsData.footer,
      },
    };
  } catch {
    return fallbackContent;
  }
}
