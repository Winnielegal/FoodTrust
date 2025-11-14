
import React, { useState } from 'react';
import type { Certification, Retailer, BlockchainRecord, Review } from '../types';
import { CubeIcon } from './icons/CubeIcon';
import { ChainIcon } from './icons/ChainIcon';
import { CertificationDisplay } from './CertificationDisplay';
import { RetailerDisplay } from './RetailerDisplay';
import { ReviewDisplay } from './ReviewDisplay';
import { CertificateIcon } from './icons/CertificateIcon';
import { StoreIcon } from './icons/StoreIcon';
import { StarIcon } from './icons/StarIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';


interface VerificationReportProps {
  certifications: Certification[];
  retailers: Retailer[];
  reviews: Review[];
  blockchainRecord: BlockchainRecord | null;
}

type Tab = 'Certifications' | 'Retailers' | 'Reviews' | 'Blockchain';

const TabButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center w-full sm:w-auto flex-1 sm:flex-initial gap-2 px-4 py-3 text-sm font-semibold border-b-4 transition-all duration-300 ${
      isActive
        ? 'border-brand-green text-brand-green'
        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
    }`}
    role="tab"
    aria-selected={isActive}
  >
    {icon}
    {label}
  </button>
);


export const VerificationReport: React.FC<VerificationReportProps> = ({ 
  certifications, 
  retailers, 
  reviews, 
  blockchainRecord,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('Certifications');

  return (
    <div className="bg-white rounded-xl shadow-lg h-full">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex flex-wrap" aria-label="Tabs">
            <TabButton label="Certifications" icon={<CertificateIcon className="h-5 w-5"/>} isActive={activeTab === 'Certifications'} onClick={() => setActiveTab('Certifications')} />
            <TabButton label="Retailers" icon={<StoreIcon className="h-5 w-5"/>} isActive={activeTab === 'Retailers'} onClick={() => setActiveTab('Retailers')} />
            <TabButton label="Reviews" icon={<StarIcon className="h-5 w-5"/>} isActive={activeTab === 'Reviews'} onClick={() => setActiveTab('Reviews')} />
            {blockchainRecord && <TabButton label="Blockchain" icon={<CubeIcon className="h-5 w-5"/>} isActive={activeTab === 'Blockchain'} onClick={() => setActiveTab('Blockchain')} />}
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'Certifications' && <CertificationDisplay certifications={certifications} />}
        {activeTab === 'Retailers' && <RetailerDisplay retailers={retailers} />}
        {activeTab === 'Reviews' && <ReviewDisplay reviews={reviews} />}
        {activeTab === 'Blockchain' && blockchainRecord && (
           <div className="animate-fade-in">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-lg shadow-lg">
                 <div className="flex items-center gap-3 mb-4 border-b border-slate-700 pb-3">
                    <CheckCircleIcon className="h-6 w-6 text-green-400 flex-shrink-0" />
                    <h3 className="text-xl font-semibold text-slate-100">Verified on Ledger</h3>
                </div>
                <div className="text-sm space-y-3 font-mono">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-slate-400 font-sans font-semibold">Network</span>
                    <span className="text-slate-200 text-right">{blockchainRecord.network}</span>
                  </div>
                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-slate-400 font-sans font-semibold">Block Number</span>
                    <span className="text-slate-200">{blockchainRecord.block_number}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-400 font-sans font-semibold mb-1">Transaction Hash</span>
                    <span className="text-slate-300 break-all text-xs bg-slate-700 p-2 rounded">
                      {blockchainRecord.tx_hash}
                    </span>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
    </div>
  );
};