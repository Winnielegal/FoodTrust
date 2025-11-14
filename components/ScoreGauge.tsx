import React from 'react';

interface ScoreGaugeProps {
  score: number;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
  const radius = 60;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreDetails = (s: number): { color: string; label: string } => {
    if (s >= 90) return { color: '#2E7D32', label: 'Excellent' }; // brand-green-dark
    if (s >= 75) return { color: '#4CAF50', label: 'Good' }; // brand-green-light
    if (s >= 50) return { color: '#FFC107', label: 'Fair' }; // amber
    return { color: '#F44336', label: 'Poor' }; // red
  };
  
  const { color, label } = getScoreDetails(score);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative inline-flex items-center justify-center">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="-rotate-90"
        >
          <circle
            className="text-gray-200"
            strokeWidth={stroke}
            stroke="currentColor"
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke={color}
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset, strokeLinecap: 'round' }}
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-1000 ease-in-out"
          />
        </svg>
        <span className="absolute text-3xl font-bold" style={{ color }}>
          {score}
        </span>
      </div>
      <p className="mt-2 text-lg font-semibold" style={{ color }}>{label}</p>
    </div>
  );
};