import { Suspense } from 'react';
// @import dependencies
// import dynamic from 'next/dynamic';
// @import components
// const UserLayout = dynamic(() => import('@/components/UserLayout'));
// @import pages
// const Dashboard = dynamic(() => import('@/pages/profile/dashboard'));

const UserDashboardPage = () => {
  return (
    <Suspense fallback={<div>Loading Page...</div>}>
      user dashboard
      {/* <UserLayout>
        <Dashboard />
      </UserLayout> */}
    </Suspense>
  );
};

export default UserDashboardPage;
