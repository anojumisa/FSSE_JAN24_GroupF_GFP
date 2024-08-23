import React from 'react';

const ProfilePicture = () => (
  <div className="p-4 bg-gray-100 rounded border">
    <div className="mb-4">
      <div className="text-lg font-bold mb-2">Profile Picture</div>
      <div className="h-40 bg-gray-300 rounded flex items-center justify-center">
        <p>This will be Picture</p>
      </div>
    </div>
    <button className="bg-orange-400 text-white py-2 px-4 rounded w-full">Pilih Foto</button>
  </div>
);

export default ProfilePicture;
