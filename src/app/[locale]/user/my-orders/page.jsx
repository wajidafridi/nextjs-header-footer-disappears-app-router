import { Suspense } from 'react';
// @import dependencies
// import dynamic from 'next/dynamic';
// @import components
// const UserLayout = dynamic(() => import('@/components/UserLayout'));
// @import pages
// const OrderTable = dynamic(() => import('@/pages/profile/orders'));

const OrderPage = async ({ params }) => {
  const { locale } = await params;

  return (
    <Suspense fallback={<div>Loading Page...</div>}>
      my orders
      {/* <UserLayout>
        <OrderTable locale={locale} />
      </UserLayout> */}
    </Suspense>
  );
};

export default OrderPage;
