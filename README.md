

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
=======
# 🌱 FoodTrust  
AI-Verified Sustainable Product Scanner  

FoodTrust is an intelligent sustainability and authenticity checker that verifies products using:
- AI-powered product identification  
- UPC/EAN scanning  
- Verified databases  
- Real-time trusted web sources  
- Trust score computation  
- Certification validation (USDA Organic, Non-GMO, Kosher, etc.)  
- Blockchain-style immutable logs  

## 🚀 Features  
- Scan products (camera or manual input)  
- Fetch images from verified sources or fallback internet sources  
- Display retailer logos + links  
- Suggest similar sustainable alternatives  
- Provide a sustainability profile (carbon, water, certifications)  
- Maintain an immutable ledger (simulated blockchain)

## 🛠️ Tech Stack  
- **Frontend:** React Native / Flutter (your choice)  
- **Backend:** Node.js / Express  
- **Database:** MongoDB  
- **OCR/Vision:** AI Model (256-char vision prompt)  
- **Verification Sources:** Retailers, product info APIs, brand websites  

## 📦 Installation  
```bash
git clone https://github.com/<your-username>/FoodTrust.git
cd FoodTrust
npm install
npm start
>>>>>>> a311870353f0d03a9b87694eb72b962e63d8f927
