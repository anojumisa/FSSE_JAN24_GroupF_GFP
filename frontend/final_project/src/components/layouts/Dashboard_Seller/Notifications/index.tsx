import React from 'react';

interface NotificationProps {
  storeName: string;
}

const Notification: React.FC<NotificationProps> = ({ storeName }) => (
  <div className="bg-gray-100 p-4 rounded">
    Welcome, {storeName}!
  </div>
);

export default Notification;
