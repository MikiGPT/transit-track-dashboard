
import React from 'react';
import { PlusCircle, Map, CreditCard, Siren } from 'lucide-react';

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

export default QuickActions;
