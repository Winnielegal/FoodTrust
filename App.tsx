import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ProductInput } from './components/ProductInput';
import { Dashboard } from './components/Dashboard';
import { fetchProductById } from './services/foodTrustService';
import type { ProductAnalysis } from './types';

const App: React.FC = () => {
  const [analysis, setAnalysis] = useState<ProductAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  const handleSearch = useCallback(async (productId: string) => {
    if (!productId) {
      // Don't show an error for empty input on live search, just clear results
      setAnalysis(null);
      setError(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    setInitialLoad(false);

    try {
      const response = await fetchProductById(productId);
      
      if (response && 'message' in response) {
        setError(response.message);
      } else if (response) {
        setAnalysis(response as ProductAnalysis);
      } else {
        setError(`No verifiable data found for "${productId}". The AI investigator returned an empty or invalid response.`);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 text-brand-text font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <ProductInput onSearch={handleSearch} isLoading={isLoading} />
          
          {isLoading && (
            <div className="text-center mt-12">
              <div className="flex justify-center items-center mb-4">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-green-light"></div>
              </div>
              <p className="text-lg text-gray-600 font-semibold animate-pulse">
                AI Investigator is searching the web for product details...
              </p>
              <p className="text-sm text-gray-500">This may take a moment.</p>
            </div>
          )}

          {error && !isLoading && (
            <div className="mt-8 text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {!isLoading && !error && analysis && (
            <div className="mt-8">
              <Dashboard analysis={analysis} />
            </div>
          )}
          
          {initialLoad && !isLoading && !error && !analysis && (
            <div className="mt-12 text-center text-gray-500">
              <p className="text-lg">Welcome to the FoodTrust Investigator.</p>
              <p>Enter a product name, UPC, or description to begin.</p>
            </div>
          )}
        </div>
      </main>
      <footer className="text-center text-gray-500 py-4 mt-8">
        <p>&copy; {new Date().getFullYear()} FoodTrust. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;