import React from 'react';

interface NotificationProps {
  storeName: string;
}

const Notification: React.FC<NotificationProps> = ({ storeName }) => (
  <div className="bg-slate-950 text-amber-400 p-4 rounded">
    Welcome, {storeName}!
  </div>
);

export default Notification;
