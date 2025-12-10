import { defineCollection, z } from 'astro:content';

// Blog collection - News, guides, and industry updates
const blog = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        // Support both pubDate and publishedAt for flexibility
        pubDate: z.coerce.date().optional(),
        publishedAt: z.coerce.date().optional(),
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string().optional(),
        image: z.string().optional(), // Alternative to heroImage
        author: z.string().default('SafetySignHub Team'),
        // Hierarchical categorization  
        category: z.string().optional(),
        subcategory: z.string().optional(),
        tags: z.array(z.string()).default([]),
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
        // E-commerce integration
        relatedProducts: z.array(z.string()).optional(),
    }),
});

// Knowledge Base collection - Educational and reference content
const kb = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        // Support multiple date field names
        lastUpdated: z.coerce.date().optional(),
        publishedAt: z.coerce.date().optional(),
        author: z.string().optional(),
        // Hierarchical categorization (can be inferred from folder structure)
        category: z.string().optional(),
        subcategory: z.string().optional(),
        // Content metadata
        tags: z.array(z.string()).optional(),
        readingTime: z.number().optional(),
        difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
        order: z.number().default(0),
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
        image: z.string().optional(),
        // E-commerce integration
        relatedProducts: z.array(z.string()).optional(),
        keywords: z.array(z.string()).optional(),
    }),
});

export const collections = { blog, kb };
