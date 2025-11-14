
import React from 'react';
import { LeafIcon } from './icons/LeafIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-20">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <LeafIcon className="h-8 w-8 text-brand-green" />
        <h1 className="text-2xl font-bold text-brand-green-dark ml-2">
          FoodTrust
        </h1>
        <span className="ml-4 text-sm text-gray-500 hidden md:block">AI-Verified Sustainable Food Supply</span>
      </div>
    </header>
  );
};