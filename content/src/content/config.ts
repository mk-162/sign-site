import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string().optional(),
        author: z.string().default('SafetySignHub Team'),
        tags: z.array(z.string()).default([]),
        featured: z.boolean().default(false),
        relatedProducts: z.array(z.string()).optional(),
    }),
});

const kb = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        lastUpdated: z.coerce.date(),
        category: z.enum(['Compliance', 'Installation', 'Materials', 'General']),
        relatedProducts: z.array(z.string()).optional(), // IDs of related products
    }),
});

export const collections = { blog, kb };
