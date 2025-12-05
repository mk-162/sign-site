import { TextInput, Number, Image, Select, Checkbox } from '@makeswift/runtime/controls';
import { runtime } from '~/lib/makeswift/runtime';

import { HeaderClient } from '~/components/vibe/HeaderClient';
import { Footer } from '~/components/vibe/Footer';
import { HeroSection } from '~/components/vibe/HeroSection';
import { ProductCard } from '~/components/vibe/ProductCard';
import { KnowledgeBanner } from '~/components/vibe/KnowledgeBanner';

runtime.registerComponent(HeaderClient as any, {
    type: 'vibe-header',
    label: 'Vibe Header',
    props: {},
});

runtime.registerComponent(Footer, {
    type: 'vibe-footer',
    label: 'Vibe Footer',
    props: {},
});

runtime.registerComponent(HeroSection, {
    type: 'vibe-hero-section',
    label: 'Vibe Hero Section',
    props: {},
});

runtime.registerComponent(ProductCard, {
    type: 'vibe-product-card',
    label: 'Vibe Product Card',
    props: {
        id: TextInput({ label: 'Product ID', defaultValue: '1' }),
        title: TextInput({ label: 'Title', defaultValue: 'Product Title' }),
        price: TextInput({ label: 'Price', defaultValue: '£0.00' }),
        rating: Number({ label: 'Rating', defaultValue: 5, min: 0, max: 5 }),
        image: Image({ label: 'Image' }),
        badge: TextInput({ label: 'Badge', defaultValue: '' }),
    },
});

runtime.registerComponent(KnowledgeBanner, {
    type: 'vibe-knowledge-banner',
    label: 'Knowledge Banner',
    props: {
        title: TextInput({ label: 'Title', defaultValue: 'Learn More' }),
        description: TextInput({ label: 'Description', defaultValue: 'Read our latest guide.' }),
        articleUrl: TextInput({ label: 'Article URL', defaultValue: 'http://localhost:4321/blog' }),
        ctaText: TextInput({ label: 'CTA Text', defaultValue: 'Read Article' }),
        variant: Select({
            label: 'Variant',
            options: [
                { label: 'Default', value: 'default' },
                { label: 'Highlight', value: 'highlight' },
            ],
            defaultValue: 'default',
        }),
    },
});
