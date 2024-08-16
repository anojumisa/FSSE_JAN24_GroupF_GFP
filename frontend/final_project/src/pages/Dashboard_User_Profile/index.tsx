import React from 'react';
import Sidebar from '../../components/layouts/Dashboard_User/sidebar';
import Notification from '../../components/layouts/Dashboard_User/notification';
import ProfilePicture from '../../components/layouts/Dashboard_User_Profile/profile_picture';
import PersonalInfoForm from '../../components/layouts/Dashboard_User_Profile/personal_information';

const Profile = () => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 p-6">
      <div className="flex justify-between mb-6">
        <Notification />
      </div>
      <div className="mb-6">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold mr-4">Biodata</h2>
          <a href="#" className="text-red-500">Riwayat Pembelian</a>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <ProfilePicture />
        </div>
        <div className="col-span-2">
          <PersonalInfoForm />
        </div>
      </div>
    </div>
  </div>
);

export default Profile;
