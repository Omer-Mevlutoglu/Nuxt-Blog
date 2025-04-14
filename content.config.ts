import { defineContentConfig, defineCollection, z } from "@nuxt/content";
export default defineContentConfig({
  collections: {
    news: defineCollection({
      source: "**",
      type: "data",
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        tags: z.array(z.string()),
        image: z.string(),
        date: z.date(),
        locale: z.string(),
        slug: z.string(),
      }),
    }),
  },
});
