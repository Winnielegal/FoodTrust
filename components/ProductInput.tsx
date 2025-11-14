import React, { useState, useEffect, useRef } from 'react';
import { QrCodeIcon } from './icons/QrCodeIcon';

interface ProductInputProps {
  onSearch: (productId: string) => void;
  isLoading: boolean;
}

const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);


export const ProductInput: React.FC<ProductInputProps> = ({ onSearch, isLoading }) => {
  const [productId, setProductId] = useState('');
  const debounceTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = window.setTimeout(() => {
      onSearch(productId);
    }, 500); // 500ms debounce delay

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [productId, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    onSearch(productId);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const barcode = '0857682003016'; // Barnana Organic Chocolate Banana Bites
      setProductId(barcode);
      onSearch(barcode);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
             <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Enter Product Name, UPC, or Description..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green-light bg-white text-black placeholder-gray-500"
            disabled={isLoading}
            aria-label="Product Identifier Input"
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="qr-upload" className="cursor-pointer w-1/3 sm:w-auto flex items-center justify-center px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors" title="Scan QR Code">
             <QrCodeIcon className="h-6 w-6" />
             <span className="sr-only">Scan QR Code</span>
             <input id="qr-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={isLoading} />
          </label>
          <button
            type="submit"
            className="w-2/3 sm:w-auto flex-grow px-6 py-3 bg-brand-green text-white font-semibold rounded-lg hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-brand-green-light focus:ring-offset-2 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
    </div>
  );
};