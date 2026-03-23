import { defineQuery } from "next-sanity";

export const LANDING_PAGE_QUERY = defineQuery(`
  *[_type == "landingPage"][0]{
    companyName,
    tagline,
    navigation[]{label, href},
    hero{
      eyebrow,
      title,
      description,
      primaryCta{label, href},
      secondaryCta{label, href},
      stats[]{value, label},
      "bannerImage": bannerImage.asset->url,
      slider[]{
        title,
        description,
        metric,
        "image": image.asset->url
      }
    },
    benefits[]{title, description},
    services[]{title, description},
    process[]{step, title, description},
    projects[]{name, location, summary, result},
    testimonials[]{quote, name, role},
    faq[]{question, answer},
    cta{title, description, buttonLabel, buttonHref},
    footer{address, phone, email, copyright}
  }
`);
