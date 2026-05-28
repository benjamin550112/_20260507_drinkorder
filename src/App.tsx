/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { OrderForm } from './components/OrderForm';
import { OrderList } from './components/OrderList';
import { MenuItem, Order } from './types';

const API_URL = 'https://script.google.com/macros/s/AKfycbzGEhpqjr1ZXt_W3I6m41xATjHy_jpwqrDQVu91h-hlTQphYi_0uFWvvDc8JvAXBXeF/exec';

export default function App() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  const fetchData = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setMenu(data.menu);
    setOrders(data.orders || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (orderId: string) => {
    await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'delete', data: { orderId } })
    });
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-4 md:p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600 mb-2">Office Drink System</h1>
        <p className="text-gray-600">今日點單統計</p>
      </header>

      <main className="max-w-4xl mx-auto grid md:grid-cols-[1fr,2fr] gap-8">
        <OrderForm 
          menu={menu} 
          onOrderSubmitted={() => { fetchData(); setEditingOrder(null); }} 
          initialData={editingOrder}
          onCancel={() => setEditingOrder(null)}
        />
        <OrderList orders={orders} onEdit={setEditingOrder} onDelete={handleDelete} />
      </main>
    </div>
  );
}

