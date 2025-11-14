import { GoogleGenAI } from "@google/genai";
import type { ProductAnalysis } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const cache = new Map<string, ProductAnalysis>();

const getPrompt = (productId: string) => `
You are an AI-powered product investigator for "FoodTrust". Your mission is to find and verify information about a food product using your web search capabilities.

**Product to Investigate**: "${productId}"

**Your Task**:
1.  **Search & Identify**: Use your web search tool to find information about the product identifier provided. Prioritize trusted databases (like UPCitemdb, OpenFoodFacts), official brand websites, major retailers, and sustainability certification bodies (USDA Organic, Fair Trade, etc.).
2.  **Critical Task: Find the Product Image**: Image accuracy is your highest priority.
    - **Search Strategy**: After identifying the product, your main goal is to find a high-quality, official photograph. Search official brand websites, major retailer product pages (e.g., Amazon, Walmart), and high-resolution sources first.
    - **Accuracy is Non-Negotiable**: The \`image_url\` you return MUST be a real photo of the specific product being investigated. Do not use generic stock photos, placeholder images, or photos of similar but different products.
    - **Exhaustive Search**: If a trusted database does not provide an image, you are REQUIRED to perform a targeted internet search specifically to find one.
    - **Confidence**: Only if you have performed an exhaustive search and are still unable to find a high-confidence, accurate image should you return \`null\`.
3.  **Collect Data & Format**: Once you have the image (or have confirmed one isn't available), gather the remaining data and consolidate all findings into a single JSON object.
    - All URLs for logos and retailer links must be valid.

**Output requirements**:
- Your entire response MUST be a single JSON object enclosed in a markdown code block (\`\`\`json ... \`\`\`).
- If you cannot find the product, you MUST return this specific JSON: \`{ "message": "Product not found for identifier: ${productId}" }\`
- Otherwise, structure your response according to this schema:

\`\`\`json
{
  "product_name": "Example Product Name",
  "UPC": "123456789012",
  "image_url": "https://example.com/image.jpg",
  "description": "A detailed and accurate product description.",
  "certifications": [
    {"name": "USDA Organic", "status": "verified", "logo_url": "https://example.com/logo.png"}
  ],
  "environmental_metrics": {
    "carbon_footprint": "Value or 'Not Disclosed'",
    "water_usage": "Value or 'Not Disclosed'"
  },
  "retailers": [
    {
      "name": "Example Retailer",
      "logo_url": "https://example.com/retailer_logo.png",
      "price": "$X.XX",
      "link": "https://example.com/product_link"
    }
  ],
  "reviews": [
    {
      "source": "Verified Customer",
      "rating": 4.8,
      "summary": "A summary of a customer review."
    }
  ],
  "trust_score": 95,
  "blockchain_record": {
    "network": "OriginTrail DKG (Simulated)",
    "block_number": 123456,
    "tx_hash": "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b"
  }
}
\`\`\`
`;

const parseJsonResponse = (text: string): ProductAnalysis | { message: string } | null => {
  const match = text.match(/```json\n([\s\S]*?)\n```/);
  if (match && match[1]) {
    try {
      return JSON.parse(match[1]) as ProductAnalysis;
    } catch (e) {
      console.error("Failed to parse JSON from AI response", e);
      return null;
    }
  }
  try {
    return JSON.parse(text) as ProductAnalysis;
  } catch(e) {
      console.error("No JSON block found and direct parsing failed", e);
  }
  return null;
};


export const fetchProductById = async (id: string): Promise<ProductAnalysis | { message: string } | null> => {
  const upperId = id.toUpperCase();
  if (cache.has(upperId)) {
    console.log(`Returning cached result for ID: ${upperId}`);
    return cache.get(upperId)!;
  }
  
  console.log(`Fetching new data for ID: ${id}`);
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: getPrompt(id),
      config: {
        tools: [{googleSearch: {}}],
        temperature: 0.1,
      },
    });

    const parsedData = parseJsonResponse(response.text);

    if (parsedData && !('message' in parsedData)) {
       cache.set(upperId, parsedData);
    }
    
    return parsedData;

  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    return {
      message: "Failed to communicate with the AI verification service."
    };
  }
};