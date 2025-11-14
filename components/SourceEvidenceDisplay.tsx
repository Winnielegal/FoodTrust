import React from 'react';
import { ChainIcon } from './icons/ChainIcon';

interface SourceEvidenceDisplayProps {
  sources: string[];
}

export const SourceEvidenceDisplay: React.FC<SourceEvidenceDisplayProps> = ({ sources }) => {
  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-brand-text">Source Evidence</h3>
      <div className="space-y-2">
        {sources.map((url, index) => (
          <a 
            key={index} 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-sm text-blue-600 hover:text-blue-800"
          >
            <ChainIcon className="h-4 w-4 mr-3 flex-shrink-0" />
            <span className="truncate">{url}</span>
          </a>
        ))}
      </div>
    </div>
  );
};