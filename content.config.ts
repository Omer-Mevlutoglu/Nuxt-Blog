import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    news: defineCollection({
      // Specify the source as a glob pointing to news markdown files inside src/content.
      // Optionally, use an object with 'include' and 'exclude' to control what files are loaded.
      source: {
        include: "src/content/news/*.md",
        // Exclude files from the drafts folder (if you use it)
        exclude: ["src/content/news/drafts/*.md"],
      },
      type: "page",
      // Define a Zod schema to enforce data consistency and enable type inference.
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        tags: z.array(z.string()),
        image: z.string(),
        date: z.date(),
      }),
    }),

    docs: defineCollection({
      // Example collection for documentation pages.
      source: "src/content/docs/**/*.md",
      type: "page",
      schema: z.object({
        title: z.string(),
        order: z.number().optional(),
        content: z.string().optional(),
      }),
    }),
  },
});
