import React, { createContext, useContext, useEffect, useState } from 'react';
import { LayoutDashboard, Truck, Users, Map, CreditCard, Settings, Search, Sun, Moon, Bell, ChevronDown, Plus, PlusCircle, Siren } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { LucideIcon } from 'lucide-react';

// Theme Context
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// KPI Card Component
interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendPositive?: boolean;
}

const KpiCard: React.FC<KpiCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendPositive = true 
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6 hover:bg-gray-50 dark:hover:bg-slate-750 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{value}</p>
          {trend && (
            <p className={`text-sm font-medium ${
              trendPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {trend}
            </p>
          )}
        </div>
        <div className="ml-4">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-600 dark:bg-opacity-20 rounded-full flex items-center justify-center">
            <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Quick Actions Component
const QuickActions: React.FC = () => {
  const actions = [
    { name: 'Dodaj Novo Vozilo', icon: PlusCircle },
    { name: 'Kreiraj Putni Nalog', icon: Map },
    { name: 'Prijavi Trošak', icon: CreditCard },
    { name: 'Vidi Sva Upozorenja', icon: Siren },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Brze Akcije</h3>
      <div className="space-y-3">
        {actions.map((action) => {
          const IconComponent = action.icon;
          return (
            <button
              key={action.name}
              className="w-full flex items-center space-x-3 p-3 text-left rounded-lg border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-600 dark:bg-opacity-20 rounded-full flex items-center justify-center">
                <IconComponent className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-slate-300">
                {action.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const navigationItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Vozila', icon: Truck, path: '/vehicles' },
    { name: 'Vozači', icon: Users, path: '/drivers' },
    { name: 'Putni Nalozi', icon: Map, path: '/travel-orders' },
    { name: 'Troškovi', icon: CreditCard, path: '/expenses' },
    { name: 'Podešavanja', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 flex flex-col">
      {/* Logo and App Name */}
      <div className="p-6 border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-gray-900 dark:text-white font-bold text-lg">Transport</h1>
            <p className="text-gray-500 dark:text-slate-400 text-sm">Manager</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-gray-200 dark:border-slate-700">
        <div className="flex items-center space-x-3 px-3 py-2">
          <div className="w-8 h-8 bg-gray-300 dark:bg-slate-600 rounded-full flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-700 dark:text-white">AM</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Admin</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">Fleet Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Header Component
interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { theme, toggleTheme } = useTheme();
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-400" />
            <input
              type="text"
              placeholder="Pretraži..."
              className="bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-slate-200 placeholder-gray-500 dark:placeholder-slate-400 border border-gray-300 dark:border-slate-600 rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center space-x-3 p-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-white">AM</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Admin</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Fleet Manager</p>
              </div>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Dropdown Menu */}
            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg shadow-lg z-50">
                <div className="py-2">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-600 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  >
                    Profil
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-600 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  >
                    Podešavanja
                  </a>
                  <hr className="my-2 border-gray-200 dark:border-slate-600" />
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-600 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200"
                  >
                    Odjavi se
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Main Dashboard Component
const Dashboard: React.FC = () => {
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
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
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
              icon={Users}
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
    </div>
  );
};

export default Dashboard;