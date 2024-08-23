import React from 'react';

interface NotificationProps {
  username: string;
}

const Notification: React.FC<NotificationProps> = ({ username }) => {
  return (
    <div className="bg-gray-100 p-4 rounded">
      {username ? `Welcome, ${username}!` : 'Welcome, Guest!'}
    </div>
  );
};

export default Notification;
