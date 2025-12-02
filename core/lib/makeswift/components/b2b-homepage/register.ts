import {
  Checkbox,
  Color,
  Group,
  Image,
  Link,
  List,
  Number,
  Select,
  Style,
  TextInput,
} from '@makeswift/runtime/controls';

import { runtime } from '~/lib/makeswift/runtime';

import { B2BHero, CategoryGrid, IndustrySectors, StatsCounter, TrustBadges } from './client';

// B2B Hero Component
runtime.registerComponent(B2BHero, {
  type: 'b2b-hero',
  label: 'B2B / Hero Section',
  icon: 'layout',
  props: {
    className: Style(),
    headline: TextInput({
      label: 'Headline',
      defaultValue: 'Over 50,000 Products for Industry Professionals',
    }),
    subheadline: TextInput({
      label: 'Subheadline',
      defaultValue: 'Your trusted partner for cable ties, signage, and industrial supplies',
    }),
    showSearch: Checkbox({
      label: 'Show search bar',
      defaultValue: true,
    }),
    searchPlaceholder: TextInput({
      label: 'Search placeholder',
      defaultValue: 'Search products...',
    }),
    backgroundImage: Image({
      label: 'Background image',
    }),
    overlayOpacity: Number({
      label: 'Overlay opacity (%)',
      defaultValue: 70,
      min: 0,
      max: 100,
    }),
    trustBadges: List({
      label: 'Trust badges',
      type: Group({
        label: 'Badge',
        props: {
          icon: Select({
            label: 'Icon',
            options: [
              { value: 'shield', label: 'Shield' },
              { value: 'truck', label: 'Truck' },
              { value: 'users', label: 'Users' },
              { value: 'check', label: 'Check' },
              { value: 'star', label: 'Star' },
            ],
            defaultValue: 'check',
          }),
          text: TextInput({ label: 'Text', defaultValue: 'Trust badge' }),
        },
      }),
      getItemLabel(badge) {
        return badge?.text || 'Badge';
      },
    }),
    ctaText: TextInput({
      label: 'CTA button text',
      defaultValue: '',
    }),
    ctaLink: Link({
      label: 'CTA button link',
    }),
  },
});

// Stats Counter Component
runtime.registerComponent(StatsCounter, {
  type: 'b2b-stats-counter',
  label: 'B2B / Stats Counter',
  icon: 'layout',
  props: {
    className: Style(),
    stats: List({
      label: 'Statistics',
      type: Group({
        label: 'Stat',
        props: {
          value: Number({ label: 'Value', defaultValue: 1000 }),
          suffix: TextInput({ label: 'Suffix', defaultValue: '+' }),
          label: TextInput({ label: 'Label', defaultValue: 'Products' }),
        },
      }),
      getItemLabel(stat) {
        return stat?.label || 'Stat';
      },
    }),
    backgroundColor: Color({
      label: 'Background color',
      defaultValue: '#F8FAFC',
    }),
    textColor: Color({
      label: 'Text color',
      defaultValue: '#1E293B',
    }),
    accentColor: Color({
      label: 'Accent color (numbers)',
      defaultValue: '#3B82F6',
    }),
    animationDuration: Number({
      label: 'Animation duration (ms)',
      defaultValue: 2000,
      min: 500,
      max: 5000,
    }),
  },
});

// Category Grid Component
runtime.registerComponent(CategoryGrid, {
  type: 'b2b-category-grid',
  label: 'B2B / Category Grid',
  icon: 'layout',
  props: {
    className: Style(),
    title: TextInput({
      label: 'Title',
      defaultValue: 'Shop by Category',
    }),
    subtitle: TextInput({
      label: 'Subtitle',
      defaultValue: 'Browse our extensive range of industrial supplies',
    }),
    categories: List({
      label: 'Categories',
      type: Group({
        label: 'Category',
        props: {
          title: TextInput({ label: 'Title', defaultValue: 'Category' }),
          image: Image({ label: 'Image' }),
          href: Link({ label: 'Link' }),
          productCount: Number({ label: 'Product count', defaultValue: 0 }),
        },
      }),
      getItemLabel(category) {
        return category?.title || 'Category';
      },
    }),
    columns: Select({
      label: 'Columns',
      options: [
        { value: '3', label: '3 columns' },
        { value: '4', label: '4 columns' },
        { value: '6', label: '6 columns' },
      ],
      defaultValue: '3',
    }),
    showProductCount: Checkbox({
      label: 'Show product count',
      defaultValue: true,
    }),
  },
});

// Trust Badges Component
runtime.registerComponent(TrustBadges, {
  type: 'b2b-trust-badges',
  label: 'B2B / Trust Badges',
  icon: 'layout',
  props: {
    className: Style(),
    badges: List({
      label: 'Badges',
      type: Group({
        label: 'Badge',
        props: {
          icon: Select({
            label: 'Icon',
            options: [
              { value: 'credit-card', label: 'Credit Card' },
              { value: 'truck', label: 'Truck' },
              { value: 'phone', label: 'Phone' },
              { value: 'shield-check', label: 'Shield Check' },
              { value: 'clock', label: 'Clock' },
              { value: 'refresh', label: 'Refresh' },
              { value: 'star', label: 'Star' },
              { value: 'certificate', label: 'Certificate' },
            ],
            defaultValue: 'shield-check',
          }),
          title: TextInput({ label: 'Title', defaultValue: 'Trust Badge' }),
          description: TextInput({ label: 'Description', defaultValue: '' }),
        },
      }),
      getItemLabel(badge) {
        return badge?.title || 'Badge';
      },
    }),
    backgroundColor: Color({
      label: 'Background color',
      defaultValue: '#F1F5F9',
    }),
    layout: Select({
      label: 'Layout',
      options: [
        { value: 'horizontal', label: 'Horizontal' },
        { value: 'grid', label: 'Grid' },
      ],
      defaultValue: 'horizontal',
    }),
  },
});

// Industry Sectors Component
runtime.registerComponent(IndustrySectors, {
  type: 'b2b-industry-sectors',
  label: 'B2B / Industry Sectors',
  icon: 'layout',
  props: {
    className: Style(),
    title: TextInput({
      label: 'Title',
      defaultValue: 'Industries We Serve',
    }),
    subtitle: TextInput({
      label: 'Subtitle',
      defaultValue: 'Tailored solutions for every sector',
    }),
    industries: List({
      label: 'Industries',
      type: Group({
        label: 'Industry',
        props: {
          title: TextInput({ label: 'Title', defaultValue: 'Industry' }),
          description: TextInput({ label: 'Description', defaultValue: '' }),
          image: Image({ label: 'Image' }),
          href: Link({ label: 'Link' }),
          icon: Select({
            label: 'Icon (if no image)',
            options: [
              { value: 'building', label: 'Building' },
              { value: 'factory', label: 'Factory' },
              { value: 'bolt', label: 'Bolt' },
              { value: 'heart', label: 'Heart' },
              { value: 'academic-cap', label: 'Academic Cap' },
              { value: 'truck', label: 'Truck' },
              { value: 'home', label: 'Home' },
              { value: 'shopping-cart', label: 'Shopping Cart' },
            ],
            defaultValue: 'building',
          }),
        },
      }),
      getItemLabel(industry) {
        return industry?.title || 'Industry';
      },
    }),
    columns: Select({
      label: 'Columns',
      options: [
        { value: '2', label: '2 columns' },
        { value: '3', label: '3 columns' },
        { value: '4', label: '4 columns' },
      ],
      defaultValue: '4',
    }),
  },
});
