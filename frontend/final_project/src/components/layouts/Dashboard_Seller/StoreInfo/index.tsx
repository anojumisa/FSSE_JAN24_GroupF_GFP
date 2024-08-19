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
    <div className="bg-slate-950 text-amber-400 p-4 rounded">
      <h3 className="text-xl text-white font-bold mb-2">Store Information</h3>
      <p><strong className='text-lime-300'>Store Name:</strong> {storeInfo.store_name}</p>
      <p><strong className='text-lime-300'>Description:</strong> {storeInfo.description}</p>
      <p><strong className='text-lime-300'>Contact Number:</strong> {storeInfo.contact_number}</p>
      <p><strong className='text-lime-300'>Address:</strong> {storeInfo.address}, {storeInfo.city}, {storeInfo.state} - {storeInfo.zip_code}</p>
    </div>
  );
};

export default StoreInfo;
