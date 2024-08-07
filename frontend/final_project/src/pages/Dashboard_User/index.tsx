import React from 'react';
import Sidebar from '../../components/layouts/Dashboard_User/Sidebar';
import TopButtons from '../../components/layouts/Dashboard_User/TopButtons';
import Notification from '../../components/layouts/Dashboard_User/Notifications';
import RecentOrder from '../../components/layouts/Dashboard_User/RecentOrder';
import TopProducts from '../../components/layouts/Dashboard_User/TopProducts';
import BestShopBuyers from '../../components/layouts/Dashboard_User/BestShopBuyers';
import ProductOverview from '../../components/layouts/Dashboard_User/ProductOverview';
import Orders from '../../components/layouts/Dashboard_User/Orders';
import Earnings from '../../components/layouts/Dashboard_User/Earnings';
import NewReview from '../../components/layouts/Dashboard_User/NewReview';

const Dashboard = () => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 p-6">
      <div className="flex justify-between mb-6">
        <TopButtons />
        <Notification />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <RecentOrder />
        <TopProducts />
        <BestShopBuyers />
        <ProductOverview />
        <Orders />
        <Earnings />
        <NewReview />
      </div>
    </div>
  </div>
);

export default Dashboard;
