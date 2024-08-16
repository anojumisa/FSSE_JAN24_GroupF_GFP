import React from 'react';
import { Order } from '../../../../types/seller/index'; // adjust the path as necessary

interface OrdersProps {
  orders: Order[] | null;
}

const Orders: React.FC<OrdersProps> = ({ orders }) => {
  return (
    <div className="bg-orange-200 p-4 rounded">
      <h3 className="text-xl font-bold mb-2">Orders</h3>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Order ID</th>
            <th className="text-left">Total Amount</th>
            <th className="text-left">Delivery Date</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>${order.total_amount}</td>
                <td>{order.delivery_date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
