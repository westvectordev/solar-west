import { defineField, defineType } from "sanity";

export const landingPageType = defineType({
  name: "landingPage",
  title: "Landing Page",
  type: "document",
  fields: [
    defineField({ name: "companyName", title: "Company Name", type: "string" }),
    defineField({
      name: "logo",
      title: "Logo (optional — replaces company name in nav)",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({
      name: "navigation",
      title: "Navigation",
      type: "array",
      of: [
        defineField({
          name: "item",
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "href", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "description", type: "text" }),
        defineField({
          name: "bannerImage",
          title: "Banner Image",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "bannerVideo",
          title: "Banner Video (overrides image if set)",
          type: "file",
          options: { accept: "video/mp4,video/webm" },
        }),
        defineField({
          name: "primaryCta",
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "href", type: "string" }),
          ],
        }),
        defineField({
          name: "secondaryCta",
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "href", type: "string" }),
          ],
        }),
        defineField({
          name: "stats",
          type: "array",
          of: [
            defineField({
              name: "stat",
              type: "object",
              fields: [
                defineField({ name: "value", type: "string" }),
                defineField({ name: "label", type: "string" }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "benefits",
      title: "Benefits",
      type: "array",
      of: [
        defineField({
          name: "benefit",
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "description", type: "text" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "about",
      title: "Про нас",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "description", type: "text" }),
        defineField({
          name: "images",
          title: "Images (2 recommended)",
          type: "array",
          of: [defineField({ name: "image", type: "image", options: { hotspot: true } })],
        }),
      ],
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [
        defineField({
          name: "service",
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "description", type: "text" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "expertise",
      title: "Expertise Section",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "description", type: "text" }),
        defineField({
          name: "items",
          title: "List Items",
          type: "array",
          of: [{ type: "string" }],
        }),
      ],
    }),
    defineField({
      name: "process",
      title: "Process Steps",
      type: "array",
      of: [
        defineField({
          name: "processStep",
          type: "object",
          fields: [
            defineField({ name: "step", type: "string" }),
            defineField({ name: "title", type: "string" }),
            defineField({ name: "description", type: "text" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "portfolioItems",
      title: "Portfolio / Achievements",
      type: "array",
      of: [
        defineField({
          name: "portfolioItem",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Title", type: "string" }),
            defineField({ name: "sub", title: "Description", type: "string" }),
            defineField({ name: "stat", title: "Stat (e.g. 600 км)", type: "string" }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Lightning / Power", value: "lightning" },
                  { title: "Globe / Network", value: "globe" },
                  { title: "Light Bulb", value: "bulb" },
                  { title: "Settings / Generator", value: "settings" },
                  { title: "Building", value: "building" },
                  { title: "Document", value: "document" },
                ],
              },
            }),
            defineField({
              name: "image",
              title: "Image (optional)",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "stat" },
          },
        }),
      ],
    }),
    defineField({
      name: "works",
      title: "Works Gallery",
      type: "array",
      of: [
        defineField({
          name: "work",
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "location", type: "string" }),
            defineField({ name: "capacity", type: "string" }),
            defineField({ name: "category", type: "string" }),
            defineField({ name: "description", type: "text" }),
            defineField({
              name: "images",
              title: "Images",
              type: "array",
              of: [defineField({ name: "image", type: "image", options: { hotspot: true } })],
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "location" },
          },
        }),
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [
        defineField({
          name: "faqItem",
          type: "object",
          fields: [
            defineField({ name: "question", type: "string" }),
            defineField({ name: "answer", type: "text" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "cta",
      title: "Call to Action",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "description", type: "text" }),
        defineField({ name: "buttonLabel", type: "string" }),
        defineField({ name: "buttonHref", type: "string" }),
      ],
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        defineField({ name: "address", type: "string" }),
        defineField({ name: "phone", type: "string" }),
        defineField({ name: "email", type: "string" }),
      ],
    }),
  ],
});
