import { defineField, defineType } from "sanity";

export const landingPageType = defineType({
  name: "landingPage",
  title: "Landing Page",
  type: "document",
  fields: [
    defineField({ name: "companyName", title: "Company Name", type: "string" }),
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
        defineField({
          name: "slider",
          type: "array",
          of: [
            defineField({
              name: "slide",
              type: "object",
              fields: [
                defineField({ name: "title", type: "string" }),
                defineField({ name: "description", type: "text" }),
                defineField({ name: "metric", type: "string" }),
                defineField({
                  name: "image",
                  type: "image",
                  options: { hotspot: true },
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "benefits",
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
      name: "services",
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
      name: "process",
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
      name: "projects",
      type: "array",
      of: [
        defineField({
          name: "project",
          type: "object",
          fields: [
            defineField({ name: "name", type: "string" }),
            defineField({ name: "location", type: "string" }),
            defineField({ name: "summary", type: "text" }),
            defineField({ name: "result", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "testimonials",
      type: "array",
      of: [
        defineField({
          name: "testimonial",
          type: "object",
          fields: [
            defineField({ name: "quote", type: "text" }),
            defineField({ name: "name", type: "string" }),
            defineField({ name: "role", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "faq",
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
      type: "object",
      fields: [
        defineField({ name: "address", type: "string" }),
        defineField({ name: "phone", type: "string" }),
        defineField({ name: "email", type: "string" }),
        defineField({ name: "copyright", type: "string" }),
      ],
    }),
  ],
});
