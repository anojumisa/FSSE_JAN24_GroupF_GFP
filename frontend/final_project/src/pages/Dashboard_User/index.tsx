import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/layouts/Dashboard_User/sidebar';
import Notification from '../../components/layouts/Dashboard_User/notification';
import Biodata from '../../components/layouts/Dashboard_User/biodata';
import TransactionList from '../../components/layouts/Dashboard_User/transaction';
import { User, Transaction } from '../../../types/user';
interface UserDashboardData {
  user: User;
  transactions: Transaction[];
}

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserDashboardData | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/dashboard`, {
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
        });
        const data = await response.json();
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between mb-6">
          <Notification />
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
