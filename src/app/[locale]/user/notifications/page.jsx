import { Suspense } from 'react';
// @import dependencies
// import dynamic from 'next/dynamic';
// @import components
// const UserLayout = dynamic(() => import('@/components/UserLayout'));
// @import pages
// const Notifications = dynamic(() => import('@/pages/profile/notification'));

const NotificationPage = () => {
  return (
    <Suspense fallback={<div>Loading Page...</div>}>
      notification
      {/* <UserLayout>
        <Notifications />
      </UserLayout> */}
    </Suspense>
  );
};

export default NotificationPage;
