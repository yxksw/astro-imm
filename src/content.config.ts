import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        // iMM主题扩展字段
        isAdvertise: z.boolean().optional().default(false),
        position: z.string().optional(),
        positionUrl: z.string().optional(),
        heroImage: z.string().optional(),
        // 用于置顶文章
        isTop: z.boolean().optional().default(false),
    }),
});

export const collections = { blog };
