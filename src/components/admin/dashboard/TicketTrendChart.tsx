"use client";

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell } from "recharts";

interface TicketTrendChartProps {
  data?: { name: string; value: number; active?: boolean }[];
}

export default function TicketTrendChart({ data = [] }: TicketTrendChartProps) {
  const [range, setRange] = useState('This Week');

  let displayData = data;
  if (data.length >= 30) {
    if (range === 'This Week') {
      displayData = data.slice(-7);
    } else if (range === 'Last Week') {
      displayData = data.slice(-14, -7);
    } else if (range === 'This Month') {
      displayData = data.slice(-30);
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-800">Tren Tiket Masuk</h3>
        <select 
          className="bg-slate-50 border border-slate-200 text-slate-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-3 py-1.5 outline-none cursor-pointer"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="This Week">This Week</option>
          <option value="Last Week">Last Week</option>
          <option value="This Month">This Month</option>
        </select>
      </div>
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={displayData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#94a3b8' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              tickCount={3}
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
              {displayData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.active ? '#0369a1' : '#cbd5e1'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}