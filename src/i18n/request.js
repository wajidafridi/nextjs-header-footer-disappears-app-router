// @ import dependencies
import { getRequestConfig } from 'next-intl/server';
// @ import component
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that the incoming `locale` is valid
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  let messages;
  try {
    messages = (
      await (locale === 'en'
        ? import('../../messages/en.json')
        : import(`../../messages/${locale}.json`))
    ).default;
  } catch (error) {
    console.error(`Missing translation file for locale: ${locale}`, error);
    messages = (await import('../../messages/en.json')).default; // Fallback to English
  }

  return { locale, messages };
});
