import React from 'react';
import { StoreInfo as StoreInfoType } from '../../../../types/seller'; // adjust the path as necessary

interface StoreInfoProps {
  storeInfo: StoreInfoType | null;
}

const StoreInfo: React.FC<StoreInfoProps> = ({ storeInfo }) => {
  if (!storeInfo) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-blue-200 p-4 rounded">
      <h3 className="text-xl font-bold mb-2">Store Information</h3>
      <p><strong>Store Name:</strong> {storeInfo.store_name}</p>
      <p><strong>Description:</strong> {storeInfo.description}</p>
      <p><strong>Contact Number:</strong> {storeInfo.contact_number}</p>
      <p><strong>Address:</strong> {storeInfo.address}, {storeInfo.city}, {storeInfo.state} - {storeInfo.zip_code}</p>
    </div>
  );
};

export default StoreInfo;
