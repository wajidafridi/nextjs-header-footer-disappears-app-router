import { Suspense } from 'react';
// @import dependencies
// import dynamic from 'next/dynamic';
// @import components
// const UserLayout = dynamic(() => import('@/components/UserLayout'));
// @import pages
// const WishList = dynamic(() => import('@/pages/profile/wishlist'));

export default async function WishListPage({ params }) {
  // const { locale } = await params;

  return (
    <Suspense fallback={<div>Loading Page...</div>}>
      wishlists
      {/* <UserLayout>
        <WishList locale={locale} />
      </UserLayout> */}
    </Suspense>
  );
}
