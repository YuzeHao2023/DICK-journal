import { defineCollection, z } from "astro:content";

const columns = defineCollection({
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    tagline: z.string(),
    scope: z.string(),
    callForPapers: z.string(),
    editors: z.array(z.string()).optional(),
    updated: z.coerce.date(),
    status: z.enum(["Open", "Closed", "Seasonal"]),
  }),
});

const articles = defineCollection({
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).min(1),
    articleType: z.enum(["Research", "Methods", "Replication", "Opinion"]),
    accessRoute: z.enum(["OA", "Non-OA"]),
    published: z.coerce.date(),
    received: z.coerce.date().optional(),
    accepted: z.coerce.date().optional(),
    doi: z.string().optional(),
    license: z.string().optional(),
    keywords: z.array(z.string()),
    abstract: z.string(),
    pdfUrl: z.string().optional(),
    columns: z.array(z.string()),
    contentWarning: z.string().optional(),
    demo: z.boolean().optional(),
  }),
});

export const collections = {
  columns,
  articles,
};
