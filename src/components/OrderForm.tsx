import React, { useState, useEffect } from 'react';
import { MenuItem } from '../types';

interface OrderFormProps {
  menu: MenuItem[];
  onOrderSubmitted: () => void;
  initialData?: any;
  onCancel: () => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ menu, onOrderSubmitted, initialData, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    drink: menu[0]?.name || '',
    sugar: '正常糖',
    ice: '正常冰',
    quantity: 1
  });

  const drinkItem = menu.find(item => item.name === formData.drink);
  const totalPrice = drinkItem ? drinkItem.price * formData.quantity : 0;

  useEffect(() => {
     if(initialData) setFormData(initialData);
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const action = initialData ? 'update' : 'create';
    const data = initialData ? { ...formData, orderId: initialData.orderId, totalPrice } : { ...formData, totalPrice };

    await fetch('https://script.google.com/macros/s/AKfycbzGEhpqjr1ZXt_W3I6m41xATjHy_jpwqrDQVu91h-hlTQphYi_0uFWvvDc8JvAXBXeF/exec', {
      method: 'POST',
      body: JSON.stringify({ action, data: { ...data, totalPrice } })
    });
    
    onOrderSubmitted();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-gray-800">{initialData ? '修改訂單' : '新訂單'}</h2>
      <input type="text" placeholder="訂購人姓名" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 mb-4 border rounded" required />
      <select value={formData.drink} onChange={e => setFormData({...formData, drink: e.target.value})} className="w-full p-2 mb-4 border rounded">
        {menu.map(item => <option key={item.name} value={item.name}>{item.name} (${item.price})</option>)}
      </select>
      
      <div className="mb-4">
        <label className="block mb-2 text-sm text-gray-600">甜度</label>
        {['正常糖', '七分糖', '半糖', '微糖', '無糖'].map(s => (
          <button key={s} type="button" onClick={() => setFormData({...formData, sugar: s})} className={`px-3 py-1 mr-2 rounded text-sm ${formData.sugar === s ? 'bg-amber-500 text-white' : 'bg-gray-100'}`}>{s}</button>
        ))}
      </div>
      
      <div className="mb-4">
        <label className="block mb-2 text-sm text-gray-600">冰塊</label>
        {['正常冰', '少冰', '微冰', '去冰', '溫熱'].map(i => (
          <button key={i} type="button" onClick={() => setFormData({...formData, ice: i})} className={`px-3 py-1 mr-2 rounded text-sm ${formData.ice === i ? 'bg-sky-500 text-white' : 'bg-gray-100'}`}>{i}</button>
        ))}
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
            <button type="button" onClick={() => setFormData({...formData, quantity: Math.max(1, formData.quantity - 1)})} className="p-2 border rounded">-</button>
            <span className="font-bold">{formData.quantity}</span>
            <button type="button" onClick={() => setFormData({...formData, quantity: formData.quantity + 1})} className="p-2 border rounded">+</button>
        </div>
        <div className="text-xl font-bold text-teal-600">總計: ${totalPrice}</div>
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">取消</button>
        <button type="submit" className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded">送出</button>
      </div>
    </form>
  );
};
