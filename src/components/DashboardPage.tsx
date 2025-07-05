
import React from 'react';
import Header from './Header';
import KpiCard from './KpiCard';
import QuickActions from './QuickActions';
import { Truck, Users, Navigation, Siren } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const DashboardPage: React.FC = () => {
  // Mock data for charts
  const costData = [
    { name: 'Jan', troškovi: 45000 },
    { name: 'Feb', troškovi: 52000 },
    { name: 'Mar', troškovi: 48000 },
    { name: 'Apr', troškovi: 61000 },
    { name: 'Maj', troškovi: 55000 },
    { name: 'Jun', troškovi: 67000 },
    { name: 'Jul', troškovi: 59000 },
  ];

  const vehicleStatusData = [
    { name: 'Na Putu', vrednost: 23 },
    { name: 'Miruju', vrednost: 12 },
    { name: 'Održavanje', vrednost: 5 },
  ];

  // Mock data for reminders table
  const reminders = [
    { id: 1, vozilo: 'BG-001-AA', tip: 'Registracija', datum: '2024-01-15' },
    { id: 2, vozilo: 'BG-002-BB', tip: 'Tehnički pregled', datum: '2024-01-18' },
    { id: 3, vozilo: 'NS-003-CC', tip: 'Osiguranje', datum: '2024-01-20' },
    { id: 4, vozilo: 'NI-004-DD', tip: 'Servis', datum: '2024-01-22' },
    { id: 5, vozilo: 'KG-005-EE', tip: 'Registracija', datum: '2024-01-25' },
  ];

  return (
    <div className="flex-1 bg-gray-50 dark:bg-slate-900">
      <Header title="Dashboard" />
      
      <div className="p-6">
        {/* KPI Cards - Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <KpiCard
            title="Ukupno Aktivnih Vozila"
            value={42}
            icon={Truck}
            trend="+5.2%"
            trendPositive={true}
          />
          <KpiCard
            title="Ukupno Aktivnih Vozača"
            value={38}
            icon={Users}
            trend="+2.1%"
            trendPositive={true}
          />
          <KpiCard
            title="Vozila na Putu"
            value={23}
            icon={Navigation}
            trend="-1.3%"
            trendPositive={false}
          />
          <KpiCard
            title="Nerešena Upozorenja"
            value={8}
            icon={Siren}
            trend="+12.5%"
            trendPositive={false}
          />
        </div>

        {/* Charts and Quick Actions - Row 2 */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
          {/* Cost Chart */}
          <div className="xl:col-span-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Troškovi u Poslednjih 7 Meseci</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-600" />
                <XAxis dataKey="name" stroke="#64748b" className="dark:stroke-slate-400" />
                <YAxis stroke="#64748b" className="dark:stroke-slate-400" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgb(var(--color-slate-800))', 
                    border: '1px solid rgb(var(--color-slate-700))',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }} 
                  labelStyle={{ color: '#ffffff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="troškovi" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Actions */}
          <div className="xl:col-span-1">
            <QuickActions />
          </div>
        </div>

        {/* Charts and Tables - Row 3 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Vehicle Status Chart */}
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Status Vozila</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vehicleStatusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-600" />
                <XAxis dataKey="name" stroke="#64748b" className="dark:stroke-slate-400" fontSize={12} />
                <YAxis stroke="#64748b" className="dark:stroke-slate-400" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgb(var(--color-slate-800))', 
                    border: '1px solid rgb(var(--color-slate-700))',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }} 
                  labelStyle={{ color: '#ffffff' }}
                />
                <Bar dataKey="vrednost" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Reminders Table */}
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Najnoviji Nerešeni Podsetnici</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-slate-700">
                    <th className="text-left text-sm font-medium text-gray-500 dark:text-slate-400 pb-3">Vozilo</th>
                    <th className="text-left text-sm font-medium text-gray-500 dark:text-slate-400 pb-3">Tip</th>
                    <th className="text-left text-sm font-medium text-gray-500 dark:text-slate-400 pb-3">Datum</th>
                  </tr>
                </thead>
                <tbody>
                  {reminders.map((reminder, index) => (
                    <tr key={reminder.id} className={index !== reminders.length - 1 ? 'border-b border-gray-200 dark:border-slate-700' : ''}>
                      <td className="py-3 text-sm text-gray-900 dark:text-white font-medium">{reminder.vozilo}</td>
                      <td className="py-3 text-sm text-gray-600 dark:text-slate-300">{reminder.tip}</td>
                      <td className="py-3 text-sm text-gray-500 dark:text-slate-400">{reminder.datum}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
