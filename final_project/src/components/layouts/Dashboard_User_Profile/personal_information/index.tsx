import React from 'react';

const PersonalInfoForm = () => (
  <div className="p-4 bg-gray-100 rounded border">
    <h3 className="text-lg font-bold mb-4">Biodata Diri</h3>
    <div className="mb-4">
      <label className="block mb-1 font-semibold">Nama</label>
      <input type="text" className="w-full p-2 border rounded" placeholder="Masukkan Nama" />
    </div>
    <div className="mb-4">
      <label className="block mb-1 font-semibold">Tanggal Lahir</label>
      <input type="date" className="w-full p-2 border rounded" />
    </div>
    <div className="mb-4">
      <label className="block mb-1 font-semibold">Kontak</label>
      <input type="text" className="w-full p-2 border rounded" placeholder="Masukkan Kontak" />
    </div>
    <div className="mb-4">
      <label className="block mb-1 font-semibold">Email</label>
      <input type="email" className="w-full p-2 border rounded" placeholder="Masukkan Email" />
    </div>
    <div className="mb-4">
      <label className="block mb-1 font-semibold">Nomor HP</label>
      <input type="text" className="w-full p-2 border rounded" placeholder="Masukkan Nomor HP" />
    </div>
    <button className="bg-orange-400 text-white py-2 px-4 rounded w-full">Ubah Data</button>
  </div>
);

export default PersonalInfoForm;
