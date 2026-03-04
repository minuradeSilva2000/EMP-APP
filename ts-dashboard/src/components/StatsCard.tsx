import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'yellow';
  trend?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  trend 
}) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    yellow: 'bg-yellow-500',
  };

  const bgColorClasses = {
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    purple: 'bg-purple-50',
    yellow: 'bg-yellow-50',
  };

  const isPositive = trend && !trend.startsWith('-');
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${bgColorClasses[color]}`}>
          <Icon className={`w-6 h-6 ${colorClasses[color]}`} />
        </div>
      </div>
      {trend && (
        <div className="flex items-center mt-4">
          <TrendIcon 
            className={`w-4 h-4 mr-1 ${
              isPositive ? 'text-green-500' : 'text-red-500'
            }`} 
          />
          <span className={`text-sm font-medium ${
            isPositive ? 'text-green-500' : 'text-red-500'
          }`}>
            {trend} from last month
          </span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
