import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/layouts/Dashboard_User/sidebar';
import Notification from '../../components/layouts/Dashboard_User/notification';
import Biodata from '../../components/layouts/Dashboard_User/biodata';
import TransactionList from '../../components/layouts/Dashboard_User/transaction';
import { User, Transaction } from '../../types/user/types';
import { useRouter } from 'next/router';
import LogoutButton from '@/components/elements/logoutbutton';

interface UserDashboardData {
  user: User;
  transactions: Transaction[];
}

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserDashboardData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('access_token'); // Fetch JWT token from localStorage
      console.log('Token from localStorage:', token); // Log token for debugging

      if (!token) {
        console.log('No token found, redirecting to login');
        router.push('/login'); // Redirect to login if no token is found
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/dashboard`, {
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Add the JWT token in the Authorization header
          }
        });

        console.log('Response status:', response.status); // Log response status
        if (response.status === 401) {
          console.log('Unauthorized access, redirecting to login');
          localStorage.removeItem('access_token'); // If unauthorized, remove token and redirect
          router.push('/login');
          return;
        }

        const data = await response.json();
        console.log('Data fetched from API:', data); // Log data from API response

        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchDashboardData();
  }, [router]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between mb-6">
          <Notification />
          {}
          <LogoutButton />
        </div>
        <div className="mb-6">
          {userData.user ? (
            <Biodata user={userData.user} />
          ) : (
            <div>User data not available</div>
          )}
        </div>
        <div className="grid gap-6">
          {userData.transactions && userData.transactions.length > 0 ? (
            userData.transactions.map((transaction) => (
              <TransactionList key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <div>No transactions found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
