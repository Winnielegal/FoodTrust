
import React from 'react';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  tooltip?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value, tooltip }) => {
  return (
    <div className="flex flex-row items-center text-left p-3 bg-gray-50 rounded-lg group relative gap-4">
      <div className="flex-shrink-0 bg-white p-2 rounded-full shadow-sm">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-lg font-semibold text-brand-text truncate" title={tooltip || value}>{value}</p>
      </div>
       {tooltip && (
         <div className="absolute bottom-full mb-2 w-max max-w-xs hidden group-hover:block bg-black text-white text-xs rounded py-2 px-3 text-center z-10">
            {tooltip}
           <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-black"></div>
         </div>
      )}
    </div>
  );
};