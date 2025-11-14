import React from 'react';
import type { ProvenanceStep } from '../types';
import { FarmIcon } from './icons/FarmIcon';
import { TransportIcon } from './icons/TransportIcon';
import { FactoryIcon } from './icons/FactoryIcon';
import { StoreIcon } from './icons/StoreIcon';
import { CubeIcon } from './icons/CubeIcon'; // Generic fallback

interface ProvenanceTrackerProps {
  steps: ProvenanceStep[];
}

const getIconForStage = (stage: string): React.ReactElement => {
  const lowerCaseStage = stage.toLowerCase();
  if (lowerCaseStage.includes('farm') || lowerCaseStage.includes('harvest')) {
    return <FarmIcon className="h-6 w-6 text-white" />;
  }
  if (lowerCaseStage.includes('transport') || lowerCaseStage.includes('ship')) {
    return <TransportIcon className="h-6 w-6 text-white" />;
  }
  if (lowerCaseStage.includes('process') || lowerCaseStage.includes('factory') || lowerCaseStage.includes('pack')) {
    return <FactoryIcon className="h-6 w-6 text-white" />;
  }
  if (lowerCaseStage.includes('retail') || lowerCaseStage.includes('store')) {
    return <StoreIcon className="h-6 w-6 text-white" />;
  }
  return <CubeIcon className="h-6 w-6 text-white" />;
};


export const ProvenanceTracker: React.FC<ProvenanceTrackerProps> = ({ steps }) => {
  return (
    <div className="relative pl-4">
      {/* Vertical line */}
      <div className="absolute left-9 top-0 h-full w-0.5 bg-gray-200" aria-hidden="true"></div>

      {steps.map((step, index) => (
        <div key={index} className="relative mb-8 last:mb-0">
          <div className="flex items-center">
            <div className="z-10 flex items-center justify-center w-10 h-10 bg-brand-green rounded-full ring-4 ring-white">
              {getIconForStage(step.stage)}
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-semibold text-brand-text">{step.stage}</h4>
              <p className="text-sm text-gray-500">{step.location || 'Location not specified'}</p>
            </div>
          </div>
           {step.date && (
            <div className="mt-2 ml-14 pl-1">
                <time className="text-xs text-gray-400 mt-1 block">
                {new Date(step.date).toLocaleString()}
                </time>
            </div>
           )}
        </div>
      ))}
    </div>
  );
};
