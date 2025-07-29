import { setRequestLocale } from 'next-intl/server';
// 10 minutes
export const revalidate = 600;

//import { getHomeData } from '@/apis/getHomeData';
const getHomeData = async (method = 'GET', headers = {}, body = null) => {
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

//import Home from '@/js/pages/Home';
const Home = ({ data, locale }) => {
  return <div>Home Data</div>;
};

export default async function IndexPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isBuild = process.env.NEXT_PHASE === 'phase-production-build';
  let data = null;
  try {
    if (!isBuild) {
      data = await getHomeData(locale);
    }
    if (!data) {
      throw new Error('getHomeData() returned null or invalid');
    }

    console.log(`BUILD SUCCESS (Home Page) `);
    return <Home data={data} locale={locale} />;
  } catch (error) {
    console.error(
      `Failed to fetch Home data (getHomeData) for locale "${locale}".`,
      error
    );

    if (isBuild) {
      return (
        <div className="p-10 text-center text-gray-600">
          Loading homepage... (data will update shortly)
        </div>
      );
    }

    throw new Error(
      ` Fetching homepage data for locale "${locale}" is unavailable.    `
    );
  }
}
