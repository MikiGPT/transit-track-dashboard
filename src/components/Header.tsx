
import React, { useState } from 'react';
import { Search, Sun, Moon, Bell, ChevronDown } from 'lucide-react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-white">{title}</h1>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Pretraži..."
              className="bg-slate-700 text-slate-200 placeholder-slate-400 border border-slate-600 rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white transition-colors duration-200"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white transition-colors duration-200 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center space-x-3 p-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-white">AM</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-white">Admin</p>
                <p className="text-xs text-slate-400">Fleet Manager</p>
              </div>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Dropdown Menu */}
            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-700 border border-slate-600 rounded-lg shadow-lg z-50">
                <div className="py-2">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-600 hover:text-white transition-colors duration-200"
                  >
                    Profil
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-600 hover:text-white transition-colors duration-200"
                  >
                    Podešavanja
                  </a>
                  <hr className="my-2 border-slate-600" />
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-red-400 hover:bg-slate-600 hover:text-red-300 transition-colors duration-200"
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

export default Header;
