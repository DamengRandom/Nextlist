import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googletagmanager.com;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              img-src 'self' data: https://*.google-analytics.com https://s4.anilist.co;
              font-src 'self' https://fonts.gstatic.com;
              connect-src 'self' https://*.google-analytics.com https://graphql.anilist.co;
              frame-src 'self';
              base-uri 'self';
              form-action 'self';
            `.replace(/\s{2,}/g, ' ').trim()
          }
        ],
      },
    ];
  }, // for prevent XSS attack
  images: {
    domains: ['s4.anilist.co'],
  },
};

export default nextConfig;
