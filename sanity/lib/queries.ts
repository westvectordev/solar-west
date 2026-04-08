import { defineQuery } from "next-sanity";

export const LANDING_PAGE_QUERY = defineQuery(`
  *[_type == "landingPage"][0]{
    companyName,
    "logo": logo.asset->url,
    tagline,
    navigation[]{label, href},
    hero{
      eyebrow,
      title,
      description,
      "bannerImage": bannerImage.asset->url,
      "bannerVideo": bannerVideo.asset->url,
      primaryCta{label, href},
      secondaryCta{label, href},
      stats[]{value, label}
    },
    benefits[]{title, description},
    about{
      title,
      description,
      "images": images[].asset->url
    },
    services[]{title, description},
    expertise{
      title,
      description,
      items
    },
    process[]{step, title, description},
    portfolioItems[]{
      label,
      sub,
      stat,
      icon,
      "image": image.asset->url
    },
    works[]{
      title,
      location,
      capacity,
      category,
      description,
      "images": images[].asset->url
    },
    faq[]{question, answer},
    cta{title, description, buttonLabel, buttonHref},
    footer{address, phone, email}
  }
`);
