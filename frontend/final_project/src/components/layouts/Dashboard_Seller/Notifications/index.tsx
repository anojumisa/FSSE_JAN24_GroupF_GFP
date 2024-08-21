import React from 'react';

interface NotificationProps {
  storeName: string;
  storeImage: string;
}

const Notification: React.FC<NotificationProps> = ({ storeName, storeImage }) => {
  console.log('storeImage:', storeImage); // Log the storeImage URL

  return (
    <div className="bg-amber-400 opacity-90 shadow-xl text-slate-950 p-4 rounded flex items-center space-x-4">
      <img src={storeImage} alt={`${storeName} logo`} className="w-10 h-10 rounded-full" />
      <span>{storeName}!</span>
    </div>
  );
};

export default Notification;