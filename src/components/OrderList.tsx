import React from 'react';
import { Order } from '../types';
import { Trash2, Edit2 } from 'lucide-react';

interface OrderListProps {
  orders: Order[];
  onEdit: (order: Order) => void;
  onDelete: (orderId: string) => void;
}

export const OrderList: React.FC<OrderListProps> = ({ orders, onEdit, onDelete }) => {
  if (orders.length === 0) {
    return (
      <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center">
        <p className="text-gray-500 text-lg">目前無人訂購，快來開啟第一筆訂單！</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map(order => (
        <div key={order.orderId} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">{order.drink}</h3>
            <p className="text-gray-500">{order.name} | {order.sugar} | {order.ice} | x{order.quantity}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold text-teal-600 text-lg">${order.totalPrice}</span>
            <button onClick={() => onEdit(order)} className="p-2 text-gray-400 hover:text-amber-500"><Edit2 size={18} /></button>
            <button onClick={() => onDelete(order.orderId)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
          </div>
        </div>
      ))}
    </div>
  );
};
