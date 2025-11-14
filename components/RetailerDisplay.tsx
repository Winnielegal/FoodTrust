
import React from 'react';
import type { Retailer } from '../types';
import { TagIcon } from './icons/TagIcon';
import { ChainIcon } from './icons/ChainIcon';
import { StoreIcon } from './icons/StoreIcon';
import { ImageWithFallback } from './ImageWithFallback';

interface RetailerDisplayProps {
  retailers: Retailer[];
}

export const RetailerDisplay: React.FC<RetailerDisplayProps> = ({ retailers }) => {
  if (!retailers || retailers.length === 0) {
    return (
        <div className="text-center py-8 text-gray-500 animate-fade-in">
            <StoreIcon className="h-12 w-12 mx-auto text-gray-300 mb-2"/>
            <p className="font-semibold">No Retailers Found</p>
            <p className="text-sm">The AI investigator could not find verified purchase links for this product.</p>
        </div>
    );
  }

  const placeholderLogo = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5A2.25 2.25 0 0011.25 11.25H10.5a2.25 2.25 0 00-2.25 2.25V21M3 3h18v18H3V3zm18 0l-9 6.75L3 3" /></svg>')}`;

  return (
    <div className="animate-fade-in">
      <h3 className="text-xl font-semibold mb-4 text-brand-text">Where to Buy</h3>
      <div className="space-y-2">
        {retailers.map((retailer, index) => (
          <a key={index} href={retailer.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group">
            <div className="flex items-center min-w-0">
               <ImageWithFallback
                src={retailer.logo_url}
                fallbackSrc={placeholderLogo}
                alt={`${retailer.name} logo`}
                className="h-8 w-8 object-contain mr-4 flex-shrink-0"
              />
              <p className="font-semibold text-brand-text truncate group-hover:text-brand-green">{retailer.name}</p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0 ml-4">
              {retailer.price && (
                <div className="flex items-center text-sm font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-md">
                  <TagIcon className="h-4 w-4 mr-1"/>
                  {retailer.price}
                </div>
              )}
              <ChainIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};