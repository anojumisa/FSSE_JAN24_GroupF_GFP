import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/layouts/Dashboard_Seller/Sidebar';
import TopButtons from '../../components/layouts/Dashboard_Seller/TopButtons';
import Notification from '../../components/layouts/Dashboard_Seller/Notifications';
import LogoutButton from '@/components/elements/logoutbuttonseller';
import Orders from '../../components/layouts/Dashboard_Seller/Orders';
import ProductOverview from '../../components/layouts/Dashboard_Seller/ProductOverview';
import StoreInfo from '../../components/layouts/Dashboard_Seller/StoreInfo';
import { Order, ProductOverviewData, StoreInfo as StoreInfoType } from '../../types/seller'; // Adjust the path as necessary

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [overview, setOverview] = useState<ProductOverviewData[]>([]); // Initialize to an empty array
  const [storeInfo, setStoreInfo] = useState<StoreInfoType | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store/orders`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Orders:', data.orders);
        setOrders(data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const fetchOverview = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store/products_overview`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Product Overview:', data);
    
        if (data.products && Array.isArray(data.products)) {
          setOverview(data.products);
        } else {
          console.error('Fetched overview data does not contain products array:', data);
          setOverview([]);
        }
      } catch (error) {
        console.error('Error fetching product overview:', error);
      }
    };
    

    const fetchStoreInfo = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store/info`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Store Info:', data);
        setStoreInfo(data);
      } catch (error) {
        console.error('Error fetching store info:', error);
      }
    };

    fetchOrders();
    fetchOverview();
    fetchStoreInfo();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between mb-6">
          <TopButtons />
          <Notification />
          <LogoutButton />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Orders orders={orders} />
          <ProductOverview overview={overview} />
          <StoreInfo storeInfo={storeInfo} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
