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
      logo: cmsData.logo ?? fallbackContent.logo,
      hero: {
        ...fallbackContent.hero,
        ...cmsData.hero,
        stats: cmsData.hero?.stats ?? fallbackContent.hero.stats,
      },
      navigation: cmsData.navigation ?? fallbackContent.navigation,
      benefits: cmsData.benefits ?? fallbackContent.benefits,
      about: {
        ...fallbackContent.about,
        ...cmsData.about,
        images: cmsData.about?.images ?? fallbackContent.about.images,
      },
      services: cmsData.services ?? fallbackContent.services,
      expertise: {
        ...fallbackContent.expertise,
        ...cmsData.expertise,
        items: cmsData.expertise?.items ?? fallbackContent.expertise.items,
      },
      process: cmsData.process ?? fallbackContent.process,
      portfolioItems: cmsData.portfolioItems ?? fallbackContent.portfolioItems,
      works: cmsData.works ?? fallbackContent.works,
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
