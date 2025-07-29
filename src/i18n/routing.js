// @ import dependencies
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en'],
  defaultLocale: 'en',
  localeDetection: false,
  pathnames: {
    '/': '/',
    '/pathnames': {
      en: '/pathnames',
    },
  },
  localeNames: {
    en: 'English',
  },
});
