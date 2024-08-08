import React from 'react';

const TransactionList = () => (
  <div className="bg-gray-100 p-4 rounded">
    <div className="mb-4">
      <div className="text-lg font-bold mb-2">Daftar Transaksi</div>
      <div className="mb-2">Tanggal: 2024-08-08</div>
      <div className="mb-2">Nama Produk: Sample Product</div>
      <div className="mb-2">Jumlah: 2</div>
    </div>
    <div className="flex justify-between items-center border-t pt-4">
      <div>
        <div>Produk</div>
        <div>Total Harga: $200</div>
      </div>
      <button className="bg-orange-400 text-white py-2 px-4 rounded">Beli Lagi</button>
    </div>
  </div>
);

export default TransactionList;
