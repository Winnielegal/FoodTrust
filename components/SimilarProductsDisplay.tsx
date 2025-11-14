import React from 'react';
import type { SimilarProduct } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface SimilarProductsDisplayProps {
  products: SimilarProduct[];
}

export const SimilarProductsDisplay: React.FC<SimilarProductsDisplayProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return null;
  }
  const placeholderImage = 'https://picsum.photos/seed/similar/400/300';
  const placeholderLogo = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5A2.25 2.25 0 0011.25 11.25H10.5a2.25 2.25 0 00-2.25 2.25V21M3 3h18v18H3V3zm18 0l-9 6.75L3 3" /></svg>')}`;


  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-brand-text">Similar Sustainable Products</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <ImageWithFallback 
                src={product.image_url}
                fallbackSrc={placeholderImage}
                alt={product.name} 
                className="w-full h-40 object-cover rounded-t-lg bg-gray-100" 
            />
            <div className="p-4 flex-grow flex flex-col justify-between">
              <h4 className="font-semibold text-brand-text mb-2">{product.name}</h4>
              <div className="flex items-end justify-between mt-2">
                <div className="text-center">
                    <p className="text-xs text-gray-500">Trust Score</p>
                    <p className="font-bold text-lg text-brand-green">{product.trust_score}</p>
                </div>
                {product.retailer_logos && product.retailer_logos.length > 0 && (
                  <div className="flex items-center space-x-2">
                     <p className="text-xs text-gray-500 mr-1">Available at:</p>
                    {product.retailer_logos.slice(0, 3).map((logoUrl, i) => (
                       <ImageWithFallback
                         key={i}
                         src={logoUrl}
                         fallbackSrc={placeholderLogo}
                         alt="Retailer"
                         className="h-5 w-5 object-contain"
                       />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};