//@ import dependencies
import { Suspense } from 'react';
// import dynamic from 'next/dynamic';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';

//import Header from '@/components/Header';
const Header = ({ categoriesData, menuData }) => {
  return <div>This is Header</div>;
};

//import Footer from '@/components/Footer';
const Footer = ({ footerMenu }) => {
  return <div>This is Footer</div>;
};

// const LayoutClientCode = dynamic(() => import('@/components/LayoutClientCode'));
const LayoutClientCode = ({ categoriesData, locale, menuData }) => {
  return <div>this is LayoutClientCode </div>;
};
// @ import providers
import { Providers } from '@/store/provider';
// @ import apis
//import { getMenu } from '@/apis/getMenu';
//import { getAllCategories } from '@/apis/getAllCategories';
//import { getConfiguration } from '@/apis/getConfiguration';

// 60 minutes
export const revalidate = 6000;

const getData = async () => {
  const options = {
    method,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  };

  if (method !== 'GET') {
    options.body = JSON.stringify({
      requestString: body,
      timeStamp: JSON.stringify(new Date().getTime()),
    });
  }

  const response = await fetch('https://example.com', options);

  const data = await response.json();

  return {
    data,
    status: response.status,
  };
};

const getMenu = () => {
  //return external api data
  return getData();
};
const getAllCategories = () => {
  //return external api data
  return getData();
};
const getConfiguration = () => {
  //return external api data
  return getData();
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'LocaleLayout' });
  return {
    title: t('title'),
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  const isBuild = process.env.NEXT_PHASE === 'phase-production-build';

  let messages = {};
  let configurationData = {};
  let menuList = { menuList: { Top_Navigation: [], Footer: [] } };
  let allCategories = {};

  let categories, menu, configuration;
  try {
    messages = await getMessages();
    try {
      if (!isBuild) {
        [configuration, menu, categories] = await Promise.all([
          getConfiguration(locale),
          getMenu(locale),
          getAllCategories(locale),
        ]);
      }

      if (!categories || !menu || !configuration) {
        throw new Error(
          '(getConfiguration/getAllCategories/getMenu) One or all API responses are null or undefined'
        );
      }

      allCategories = categories;
      menuList = menu;
      configurationData = configuration;

      console.log(`BUILD SUCCESS (Layout)`, {
        messages: !!messages,
        configurationData: !!configurationData,
        menuList: !!menuList,
        allCategories: !!allCategories,
      });
    } catch (configError) {
      console.error(
        `Failed to fetch configuration/menu/categories for locale "${locale}". `,
        configError
      );

      if (!isBuild) {
        throw new Error(
          `(getConfiguration/getAllCategories/getMenu) failed for locale "${locale}".`
        );
      }
    }
  } catch (fatalError) {
    console.error(
      `Unexpected error in LocaleLayout. This should never happen since messages are local.`,
      fatalError
    );
    throw fatalError;
  }
  const mergedMessages = {
    ...(messages || {}),
    ...(configurationData?.data?.configurations || {}),
  };

  return (
    <html className="h-full" lang={locale}>
      <body
        className={'flex h-full flex-col bg-gray-100 pt-[70px] xl:pt-[178px]'}
      >
        <NextIntlClientProvider messages={mergedMessages}>
          <Providers>
            <Header
              categoriesData={allCategories || []}
              menuData={menuList?.menuList?.Top_Navigation || null}
            />
            {children}
            <Suspense fallback={<div>Loading layout client code...</div>}>
              <LayoutClientCode
                locale={locale}
                categoriesData={allCategories || []}
                menuData={menuList?.menuList?.Top_Navigation || null}
              />
            </Suspense>
          </Providers>
          <Footer footerMenu={menuList?.menuList?.Footer || null} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
