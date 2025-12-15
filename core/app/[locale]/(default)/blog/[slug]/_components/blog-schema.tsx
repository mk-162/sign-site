import { Article, BreadcrumbList, WithContext } from 'schema-dts';

interface Post {
    title: string;
    description?: string;
    publishedAt: string;
    author?: string;
    image?: string;
    slug: string;
}

interface Props {
    post: Post;
    breadcrumbs: Array<{ label: string; href: string }>;
}

export const BlogSchema = ({ post, breadcrumbs }: Props) => {
    // Helper to ensure absolute URLs
    const toAbsoluteUrl = (path: string) => {
        const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://safetysignhub.co.uk';
        // Remove leading slash if present to avoid double slashes
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        return `${baseUrl}/${cleanPath}`;
    };

    const postUrl = toAbsoluteUrl(`blog/${post.slug}`);
    const postImageUrl = post.image ? toAbsoluteUrl(post.image) : undefined;

    const breadcrumbSchema: WithContext<BreadcrumbList> = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.label,
            item: toAbsoluteUrl(crumb.href),
        })),
    };

    const articleSchema: WithContext<Article> = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt, // Using published date as modified date fallback
        author: post.author
            ? {
                '@type': 'Person',
                name: post.author,
            }
            : undefined,
        image: postImageUrl,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': postUrl,
        },
    };

    return (
        <>
            <script
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                type="application/ld+json"
            />
            <script
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
                type="application/ld+json"
            />
        </>
    );
};
