
import React from 'react';
import type { ProductAnalysis } from '../types';
import { ScoreGauge } from './ScoreGauge';
import { MetricCard } from './MetricCard';
import { VerificationReport } from './VerificationReport';
import { FootprintIcon } from './icons/FootprintIcon';
import { WaterDropIcon } from './icons/WaterDropIcon';
import { CertificateIcon } from './icons/CertificateIcon';
import { ImageWithFallback } from './ImageWithFallback';

interface DashboardProps {
  analysis: ProductAnalysis;
}

export const Dashboard: React.FC<DashboardProps> = ({ analysis }) => {
  const { 
    product_name,
    UPC,
    description,
    image_url,
    trust_score,
    environmental_metrics,
    certifications,
    retailers,
    reviews,
    blockchain_record,
    brand,
    dataSource,
    trustJustification
  } = analysis;
  
  const certText = certifications.map(c => c.name).join(', ') || 'None verified';
  const placeholderImage = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>')}`;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Product Header */}
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-start gap-8">
        <div className="w-full md:w-1/3 h-64 flex-shrink-0 bg-gray-200 rounded-lg flex items-center justify-center">
            <ImageWithFallback 
              src={image_url} 
              fallbackSrc={placeholderImage}
              alt={product_name} 
              className="w-full h-full object-contain rounded-lg" 
            />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <h2 className="text-3xl font-bold text-brand-green-dark break-words">{product_name}</h2>
            {dataSource && (
              <div className="group relative mt-2 sm:mt-0">
                <span 
                  className={`px-2 py-0.5 text-xs font-semibold rounded-full cursor-help ${
                    dataSource === 'Verified Database' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {dataSource}
                </span>
                <div className="absolute bottom-full mb-2 w-64 hidden group-hover:block bg-black text-white text-xs rounded py-2 px-3 text-center z-10">
                  {dataSource === 'Verified Database'
                    ? 'Data sourced from trusted databases for highest accuracy.'
                    : 'Data sourced from a targeted internet search. Some details may be unverified.'}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-black"></div>
                </div>
              </div>
            )}
          </div>
          {brand && <p className="text-md font-semibold text-brand-green mt-1">{brand}</p>}
          <p className="text-gray-500 mt-2 font-mono text-sm">UPC: {UPC || 'N/A'}</p>
          <p className="mt-4 text-brand-text break-words">{description || 'No description available.'}</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-4 text-brand-text">AI Trust Score</h3>
            <ScoreGauge score={trust_score} />
            {trustJustification && <p className="mt-4 text-gray-600 text-sm">{trustJustification}</p>}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-6 text-brand-text">Key Metrics</h3>
            <div className="space-y-4">
              <MetricCard
                icon={<FootprintIcon className="h-8 w-8 text-brand-green"/>}
                label="Carbon Footprint"
                value={`${environmental_metrics.carbon_footprint || 'N/A'}`}
              />
              <MetricCard
                icon={<WaterDropIcon className="h-8 w-8 text-brand-blue"/>}
                label="Water Usage"
                value={`${environmental_metrics.water_usage || 'N/A'}`}
              />
              <MetricCard
                icon={<CertificateIcon className="h-8 w-8 text-yellow-500"/>}
                label="Certifications"
                value={certText.split(',').length > 1 ? `${certText.split(',')[0]}, ...` : certText}
                tooltip={certText}
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2">
           <VerificationReport 
            certifications={certifications}
            retailers={retailers}
            reviews={reviews}
            blockchainRecord={blockchain_record}
          />
        </div>
      </div>
    </div>
  );
};