import React from 'react';

const Orders = () => (
  <div className="bg-orange-200 p-4 rounded">
    <h3 className="text-xl font-bold mb-2">Orders</h3>
    <table className="w-full">
      <thead>
        <tr>
          <th className="text-left">Product</th>
          <th className="text-left">Price</th>
          <th className="text-left">Delivery Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Bolu Kukus Mang Haji Donal</td>
          <td>$99,89</td>
          <td>2024-08-07</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default Orders;
