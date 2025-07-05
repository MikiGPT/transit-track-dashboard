
import React from 'react';
import { LayoutDashboard, Truck, Users, Map, CreditCard, Settings } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navigationItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: true },
    { name: 'Vozila', icon: Truck, active: false },
    { name: 'Vozači', icon: Users, active: false },
    { name: 'Putni Nalozi', icon: Map, active: false },
    { name: 'Troškovi', icon: CreditCard, active: false },
    { name: 'Podešavanja', icon: Settings, active: false },
  ];

  return (
    <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
      {/* Logo and App Name */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">Transport</h1>
            <p className="text-slate-400 text-sm">Manager</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.name}>
                <a
                  href="#"
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                    item.active
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3 px-3 py-2">
          <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
            <span className="text-xs font-semibold text-white">AM</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Admin</p>
            <p className="text-xs text-slate-400">Fleet Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
