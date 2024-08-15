import React from 'react';
import Sidebar from '../../components/layouts/Dashboard_Seller/Sidebar';
import TopButtons from '../../components/layouts/Dashboard_Seller/TopButtons';
import Notification from '../../components/layouts/Dashboard_Seller/Notifications';
import RecentOrder from '../../components/layouts/Dashboard_Seller/RecentOrder';
import TopProducts from '../../components/layouts/Dashboard_Seller/TopProducts';
import BestShopBuyers from '../../components/layouts/Dashboard_Seller/BestShopBuyers';
import ProductOverview from '../../components/layouts/Dashboard_Seller/ProductOverview';
import Orders from '../../components/layouts/Dashboard_Seller/Orders';
import Earnings from '../../components/layouts/Dashboard_Seller/Earnings';
import NewReview from '../../components/layouts/Dashboard_Seller/NewReview';
import LogoutButton from '@/components/elements/logoutbutton';

const Dashboard = () => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 p-6">
      <div className="flex justify-between mb-6">
        <TopButtons />
        <Notification />
        {}
        <LogoutButton />        
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
