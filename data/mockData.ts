
import type { Product } from '../types';

export const MOCK_PRODUCTS: { [key: string]: Product } = {
  'AVO-23X-45T': {
    id: 'AVO-23X-45T',
    name: 'Organic Hass Avocados',
    imageUrl: 'https://picsum.photos/seed/avocado/600/400',
    description: 'Creamy and delicious Hass avocados, grown organically in the sun-drenched orchards of Michoacán, Mexico. Perfect for guacamole, salads, and toast.',
    provenance: [
      { stage: 'Harvesting', location: 'Michoacán, Mexico', timestamp: '2023-10-01T08:00:00Z', details: 'Hand-picked at peak ripeness.', icon: 'farm' },
      { stage: 'Processing', location: 'Uruapan Packing Co.', timestamp: '2023-10-02T14:00:00Z', details: 'Washed, sorted, and packed in sustainable materials.', icon: 'factory' },
      { stage: 'Transportation', location: 'Port of Manzanillo to Long Beach, CA', timestamp: '2023-10-05T22:00:00Z', details: 'Shipped in refrigerated containers to ensure freshness.', icon: 'transport' },
      { stage: 'Retail', location: 'FreshMart, San Francisco, CA', timestamp: '2023-10-10T06:00:00Z', details: 'Stocked and ready for purchase.', icon: 'store' },
    ],
    metrics: {
      carbonFootprint: { value: 0.85, unit: 'kg CO2e/kg' },
      waterUsage: { value: 227, unit: 'liters/avocado' },
      certifications: { isOrganic: true, isFairTrade: true },
    },
    aiVerification: {
      trustScore: 95,
      summary: 'High confidence in sustainability claims. Organic and Fair Trade certifications verified against international databases. Provenance data is consistent across supply chain partners.',
      evidence: [
        { source: 'USDA Organic Database', finding: 'Certified Organic since 2019.' },
        { source: 'Fair Trade International Registry', finding: 'Producer certification is active and in good standing.' },
      ],
    },
    blockchainRecord: {
      transactionHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
      blockNumber: 133742,
      timestamp: '2023-10-10T06:15:23Z',
      network: 'OriginTrail DKG (Testnet)',
    },
  },
  'BNN-91Y-82U': {
    id: 'BNN-91Y-82U',
    name: 'Equatorial Bananas',
    imageUrl: 'https://picsum.photos/seed/banana/600/400',
    description: 'Sweet and nutritious bananas sourced from Rainforest Alliance Certified farms in Ecuador. A healthy snack for any time of day.',
    provenance: [
      { stage: 'Harvesting', location: 'Esmeraldas, Ecuador', timestamp: '2023-10-12T09:00:00Z', details: 'Harvested from family-owned farms.', icon: 'farm' },
      { stage: 'Processing', location: 'Guayaquil Packing Facility', timestamp: '2023-10-13T11:00:00Z', details: 'Cleaned and boxed for export.', icon: 'factory' },
      { stage: 'Transportation', location: 'Port of Guayaquil to Port of Miami', timestamp: '2023-10-17T18:00:00Z', details: 'Ocean freight with optimized routing for lower emissions.', icon: 'transport' },
      { stage: 'Retail', location: 'GrocerPro, Atlanta, GA', timestamp: '2023-10-22T04:00:00Z', details: 'Available in the produce section.', icon: 'store' },
    ],
    metrics: {
      carbonFootprint: { value: 0.48, unit: 'kg CO2e/kg' },
      waterUsage: { value: 790, unit: 'liters/kg' },
      certifications: { isOrganic: false, isFairTrade: true },
    },
    aiVerification: {
      trustScore: 88,
      summary: 'Good confidence in claims. Fair Trade status is confirmed. Not certified organic, but farm practices align with sustainable agriculture principles noted by Rainforest Alliance.',
      evidence: [
        { source: 'Rainforest Alliance', finding: 'Farm certification valid, focus on biodiversity and worker welfare.' },
        { source: 'Fair Trade USA', finding: 'Associated cooperative is a registered partner.' },
      ],
    },
    blockchainRecord: {
      transactionHash: '0x9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e',
      blockNumber: 133981,
      timestamp: '2023-10-22T04:05:11Z',
      network: 'OriginTrail DKG (Testnet)',
    },
  },
};
   