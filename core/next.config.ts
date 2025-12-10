import createWithMakeswift from '@makeswift/runtime/next/plugin';
import bundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

import { writeBuildConfig } from './build-config/writer';
import { client } from './client';
import { graphql } from './client/graphql';
import { cspHeader } from './lib/content-security-policy';

const withMakeswift = createWithMakeswift();
const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: './messages/en.json',
  },
});

const SettingsQuery = graphql(`
  query SettingsQuery {
    site {
      settings {
        url {
          vanityUrl
          cdnUrl
          checkoutUrl
        }
        locales {
          code
          isDefault
        }
      }
    }
  }
`);

async function writeSettingsToBuildConfig() {
  const { data } = await client.fetch({ document: SettingsQuery });

  const cdnEnvHostnames = process.env.NEXT_PUBLIC_BIGCOMMERCE_CDN_HOSTNAME;

  const cdnUrls = (
    cdnEnvHostnames
      ? cdnEnvHostnames.split(',').map((s) => s.trim())
      : [data.site.settings?.url.cdnUrl]
  ).filter((url): url is string => !!url);

  if (!cdnUrls.length) {
    throw new Error(
      'No CDN URLs found. Please ensure that NEXT_PUBLIC_BIGCOMMERCE_CDN_HOSTNAME is set correctly.',
    );
  }

  return await writeBuildConfig({
    locales: data.site.settings?.locales,
    urls: {
      ...data.site.settings?.url,
      cdnUrls,
    },
  });
}

export default async (): Promise<NextConfig> => {
  const settings = await writeSettingsToBuildConfig();

  // Content site URL - defaults to localhost for dev, set CONTENT_SITE_URL in production
  const contentSiteUrl = process.env.CONTENT_SITE_URL || 'http://localhost:4321';
  const isDev = process.env.NODE_ENV === 'development';

  let nextConfig: NextConfig = {
    reactStrictMode: true,
    experimental: {
      optimizePackageImports: ['@icons-pack/react-simple-icons'],
      ppr: 'incremental',
    },
    // B2B Demo: Allow Unsplash placeholder images (remove to rollback)
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
        },
        {
          protocol: 'https',
          hostname: 'cdn11.bigcommerce.com',
        },
        {
          protocol: 'https',
          hostname: 'cdn12.bigcommerce.com',
        },
        {
          protocol: 'https',
          hostname: 'store-749ow690.mybigcommerce.com',
        },
        {
          protocol: 'https',
          hostname: 's3.amazonaws.com', // Sometimes used for digital products
        },
      ],
    },
    typescript: {
      ignoreBuildErrors: !!process.env.CI,
    },
    // default URL generation in BigCommerce uses trailing slash
    trailingSlash: process.env.TRAILING_SLASH !== 'false',
    async rewrites() {
      // Production rewrites for content pages
      const contentRewrites = [
        {
          source: '/about-us',
          destination: `${contentSiteUrl}/about-us`,
        },
        {
          source: '/contact-us',
          destination: `${contentSiteUrl}/contact-us`,
        },
        {
          source: '/trade-enquiries',
          destination: `${contentSiteUrl}/trade-enquiries`,
        },
        {
          source: '/delivery-returns',
          destination: `${contentSiteUrl}/delivery-returns`,
        },
        {
          source: '/terms-conditions',
          destination: `${contentSiteUrl}/terms-conditions`,
        },
        {
          source: '/privacy-policy',
          destination: `${contentSiteUrl}/privacy-policy`,
        },
        {
          source: '/kb',
          destination: `${contentSiteUrl}/kb`,
        },
        {
          source: '/kb/:path*',
          destination: `${contentSiteUrl}/kb/:path*`,
        },
        {
          source: '/blog',
          destination: `${contentSiteUrl}/blog`,
        },
        {
          source: '/blog/:path*',
          destination: `${contentSiteUrl}/blog/:path*`,
        },
        {
          source: '/images/:path*',
          destination: `${contentSiteUrl}/images/:path*`,
        },
        {
          source: '/_astro/:path*',
          destination: `${contentSiteUrl}/_astro/:path*`,
        },
      ];

      // Dev-only rewrites for Vite HMR
      const devRewrites = isDev
        ? [
            {
              source: '/@id/:path*',
              destination: `${contentSiteUrl}/@id/:path*`,
            },
            {
              source: '/@react-refresh',
              destination: `${contentSiteUrl}/@react-refresh`,
            },
            {
              source: '/@vite/:path*',
              destination: `${contentSiteUrl}/@vite/:path*`,
            },
            {
              source: '/@fs/:path*',
              destination: `${contentSiteUrl}/@fs/:path*`,
            },
            {
              source: '/src/:path*',
              destination: `${contentSiteUrl}/src/:path*`,
            },
            {
              source: '/node_modules/:path*',
              destination: `${contentSiteUrl}/node_modules/:path*`,
            },
          ]
        : [];

      return [...contentRewrites, ...devRewrites];
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    async headers() {
      const cdnLinks = settings.urls.cdnUrls.map((url) => ({
        key: 'Link',
        value: `<https://${url}>; rel=preconnect`,
      }));

      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: cspHeader.replace(/\n/g, ''),
            },
            ...cdnLinks,
          ],
        },
      ];
    },
  };

  // Apply withNextIntl to the config
  nextConfig = withNextIntl(nextConfig as any) as any;

  // Apply withMakeswift to the config
  nextConfig = withMakeswift(nextConfig as any) as any;

  if (process.env.ANALYZE === 'true') {
    const withBundleAnalyzer = bundleAnalyzer();

    nextConfig = withBundleAnalyzer(nextConfig as any) as any;
  }

  return nextConfig as any;
};
