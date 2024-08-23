import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/layouts/Dashboard_User/sidebar';
import Notification from '../../components/layouts/Dashboard_User/notification';
import Biodata from '../../components/layouts/Dashboard_User/biodata';
import TransactionList from '../../components/layouts/Dashboard_User/transaction';
import { User, Transaction } from '../../types/user/types';
import { useRouter } from 'next/router';
import LogoutButton from '@/components/elements/logoutbuttonuser';
import UserNavbar from '../../components/layouts/Dashboard_User/navbar'; // Adjust the path as needed

interface UserDashboardData {
  user: User;
  transactions: Transaction[];
}

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserDashboardData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/dashboard`, {
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 401) {
          localStorage.removeItem('access_token');
          router.push('/login');
          return;
        }

        const data = await response.json();
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
    <div>
      {}
      <UserNavbar username={userData.user.first_name} />
      
      {}
      <div className="flex pt-20">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="flex justify-between mb-6">
            <Notification username={userData.user.first_name} />
            <LogoutButton />
          </div>
          <div className="mb-6">
            {userData.user ? (
              <Biodata user={userData.user} onUpdate={(updatedUser: User) => {}} />
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
    </div>
  );
};

export default Dashboard;
