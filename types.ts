// Represents the entire flat JSON response from the AI.
export interface ProductAnalysis {
  product_name: string;
  UPC: string | null;
  image_url: string | null;
  description: string;
  certifications: Certification[];
  environmental_metrics: EnvironmentalMetrics;
  retailers: Retailer[];
  reviews: Review[];
  trust_score: number;
  blockchain_record: BlockchainRecord | null;
  
  // Optional fields from previous versions, kept for graceful degradation
  brand?: string;
  dataSource?: 'Verified Database' | 'Internet Search';
  trustJustification?: string;
  message?: string;
}

export interface Certification {
  name: string;
  status: 'verified' | 'unverified' | 'pending';
  logo_url: string | null;
}

export interface EnvironmentalMetrics {
  carbon_footprint: string | number | null;
  water_usage: string | number | null;
}

export interface Retailer {
  name: string;
  logo_url: string | null;
  price: string | null;
  link: string;
}

export interface Review {
  source: string;
  rating: number | null;
  summary: string;
}

export interface BlockchainRecord {
  network: string;
  block_number: number | string;
  tx_hash: string;
}

// FIX: Define and export the SimilarProduct interface to resolve module import error.
export interface SimilarProduct {
  name: string;
  image_url: string | null;
  trust_score: number;
  retailer_logos?: string[];
}


// Legacy types that are no longer part of the primary data flow
// but kept to prevent compilation errors in unused mock data files.

export interface ProvenanceStep {
  stage: string;
  location: string | null;
  date: string | null;
  icon?: 'farm' | 'transport' | 'factory' | 'store';
}

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  provenance: Array<{
    stage: string;
    location: string;
    timestamp: string;
    details: string;
    icon: 'farm' | 'factory' | 'transport' | 'store';
  }>;
  metrics: {
    carbonFootprint: { value: number; unit: string };
    waterUsage: { value: number; unit: string };
    certifications: { isOrganic: boolean; isFairTrade: boolean };
  };
  aiVerification: {
    trustScore: number;
    summary: string;
    evidence: Array<{
      source: string;
      finding: string;
    }>;
  };
  blockchainRecord?: {
      transactionHash: string;
      blockNumber: number;
      timestamp: string;
      network: string;
  };
}
