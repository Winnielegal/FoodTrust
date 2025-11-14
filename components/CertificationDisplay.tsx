
import React from 'react';
import type { Certification } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { CertificateIcon } from './icons/CertificateIcon';

interface CertificationDisplayProps {
  certifications: Certification[];
}

const ValidityIndicator: React.FC<{ status: string }> = ({ status }) => {
  if (status === 'verified') {
    return <span className="flex-shrink-0 flex items-center text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full"><div className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></div>Verified</span>;
  }
  if (status === 'unverified') {
    return <span className="flex-shrink-0 flex items-center text-xs font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-full"><div className="w-2 h-2 bg-red-500 rounded-full mr-1.5"></div>Unverified</span>;
  }
  return <span className="flex-shrink-0 flex items-center text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full"><div className="w-2 h-2 bg-gray-500 rounded-full mr-1.5"></div>Pending</span>;
};

export const CertificationDisplay: React.FC<CertificationDisplayProps> = ({ certifications }) => {
  if (!certifications || certifications.length === 0) {
    return (
        <div className="text-center py-8 text-gray-500 animate-fade-in">
            <CertificateIcon className="h-12 w-12 mx-auto text-gray-300 mb-2"/>
            <p className="font-semibold">No Certifications Found</p>
            <p className="text-sm">This product does not have any verifiable sustainability certifications listed.</p>
        </div>
    );
  }

  const placeholderLogo = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>')}`;

  return (
    <div className="animate-fade-in">
      <h3 className="text-xl font-semibold mb-4 text-brand-text">Verified Certifications</h3>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {certifications.map((cert, index) => (
          <div key={index} className={`flex items-center justify-between p-3 transition-colors hover:bg-gray-50 ${index < certifications.length - 1 ? 'border-b border-gray-200' : ''}`}>
            <div className="flex items-center min-w-0 mr-4">
              <ImageWithFallback 
                src={cert.logo_url}
                fallbackSrc={placeholderLogo}
                alt={`${cert.name} logo`}
                className="h-8 w-8 object-contain mr-4 flex-shrink-0"
              />
              <p className="font-semibold text-brand-text break-words">{cert.name}</p>
            </div>
            <ValidityIndicator status={cert.status} />
          </div>
        ))}
      </div>
    </div>
  );
};