
import React from 'react';
import { LucideIcon } from 'lucide-react';

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
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:bg-slate-750 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-white mb-2">{value}</p>
          {trend && (
            <p className={`text-sm font-medium ${
              trendPositive ? 'text-green-400' : 'text-red-400'
            }`}>
              {trend}
            </p>
          )}
        </div>
        <div className="ml-4">
          <div className="w-12 h-12 bg-blue-600 bg-opacity-20 rounded-full flex items-center justify-center">
            <Icon className="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiCard;
