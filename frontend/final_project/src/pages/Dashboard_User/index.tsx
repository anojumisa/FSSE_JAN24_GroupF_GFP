import React from 'react';
import Sidebar from '../../components/layouts/Dashboard_User/sidebar';
import Notification from '../../components/layouts/Dashboard_User/notification';
import Biodata from '../../components/layouts/Dashboard_User/biodata';
import TransactionList from '../../components/layouts/Dashboard_User/transaction';

const Dashboard = () => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 p-6">
      <div className="flex justify-between mb-6">
        <Notification />
      </div>
      <div className="mb-6">
        <Biodata />
      </div>
      <div className="grid gap-6">
        <TransactionList />
        <TransactionList />
        <TransactionList />
      </div>
    </div>
  </div>
);

export default Dashboard;
