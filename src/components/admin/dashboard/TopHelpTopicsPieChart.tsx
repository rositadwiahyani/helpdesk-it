import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Reset Password SSO', value: 45 },
  { name: 'Koneksi WIFI Eduroam', value: 32 },
  { name: 'Akses Email Undip', value: 28 },
  { name: 'Kendala SIAP', value: 18 },
  { name: 'Lainnya', value: 24 },
];

const COLORS = ['#0369a1', '#0ea5e9', '#38bdf8', '#7dd3fc', '#e0f2fe'];

export default function TopHelpTopicsPieChart() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col h-[350px]">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Top Help Topics</h3>
      
      <div className="flex-1 w-full relative -mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '13px' }}
              itemStyle={{ color: '#0f172a' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle" 
              iconSize={8}
              wrapperStyle={{ fontSize: '12px', color: '#475569' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
