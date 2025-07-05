
import React from 'react';
import { LayoutDashboard, Truck, Users, Map, CreditCard, Settings } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

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

export default Sidebar;
