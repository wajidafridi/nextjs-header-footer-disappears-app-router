const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude `winston` and related transports from client-side bundle
      config.externals = {
        winston: 'commonjs winston',
        'winston-daily-rotate-file': 'commonjs winston-daily-rotate-file',
      };
    }
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
