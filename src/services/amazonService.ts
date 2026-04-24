import axios from 'axios';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || 'ca098f1cd2msh7f3db64387cd7f8p14c4b1jsn75d59db0e70e';
const RAPIDAPI_HOST = 'real-time-amazon-data.p.rapidapi.com';
const BASE_URL = `https://${RAPIDAPI_HOST}`;

export const searchProducts = async (q: string) => {
  if (!RAPIDAPI_KEY) {
    console.warn('RAPIDAPI_KEY is not set. Returning mock search results.');
    return mockSearchResults(q);
  }

  try {
    console.log(`Searching Amazon via RapidAPI for: "${q}"...`);
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        query: q,
        page: '1',
        country: 'US',
        sort_by: 'RELEVANCE',
        product_condition: 'ALL'
      },
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': RAPIDAPI_HOST
      }
    });

    const products = response.data.data?.products || [];
    console.log(`Found ${products.length} results.`);
    
    // Normalize to match the expected format
    return products.map((p: any) => ({
      asin: p.asin,
      title: p.product_title,
      image: p.product_photo,
      price: parsePrice(p.product_price),
      rating: parseFloat(p.product_star_rating) || 0,
      ratings_total: p.product_num_ratings || 0
    }));
  } catch (error: any) {
    console.error('RapidAPI Search Error:', error.response?.data || error.message);
    return [];
  }
};

export const getProductDetails = async (asin: string) => {
  if (!RAPIDAPI_KEY) {
    console.warn('RAPIDAPI_KEY is not set. Returning mock product details.');
    return mockProductDetails(asin);
  }

  try {
    console.log(`Fetching details for ASIN via RapidAPI: ${asin}...`);
    const response = await axios.get(`${BASE_URL}/product-details`, {
      params: {
        asin: asin,
        country: 'US'
      },
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': RAPIDAPI_HOST
      }
    });

    const data = response.data.data;
    if (!data) {
      console.error('RapidAPI Detail Error: product data missing from response.', response.data);
      throw new Error('Product not found in RapidAPI response');
    }

    // Normalize to match the structure the controller expects
    return {
      asin: data.asin,
      title: data.product_title,
      brand: data.product_brand || 'Unknown',
      categories: [{ name: 'Product' }], // RapidAPI doesn't always provide categories in a simple way
      main_image: { link: data.product_photo },
      price: parsePrice(data.product_price),
      rating: parseFloat(data.product_star_rating) || 0,
      ratings_total: data.product_num_ratings || 0,
      description: data.product_description,
      rating_breakdown: normalizeRatingBreakdown(data.product_rating_breakdown),
      top_reviews: data.product_reviews?.map((r: any) => ({
        body: r.review_comment,
        rating: parseInt(r.review_star_rating),
        title: r.review_title
      })) || []
    };
  } catch (error: any) {
    console.error('RapidAPI Detail Error:', error.response?.data || error.message);
    throw error;
  }
};

// Helper to parse price string like "$299.00" to { value, currency }
const parsePrice = (priceStr: string) => {
  if (!priceStr) return { value: 0, currency: 'USD' };
  const currency = priceStr.charAt(0);
  const value = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
  return { value, currency: currency === '$' ? 'USD' : currency };
};

// Helper to normalize rating breakdown from {"5": "82%", ...} to {five_star: {percentage: 82}, ...}
const normalizeRatingBreakdown = (breakdown: any) => {
  if (!breakdown) return null;
  const map: any = {
    '5': 'five_star',
    '4': 'four_star',
    '3': 'three_star',
    '2': 'two_star',
    '1': 'one_star'
  };
  const result: any = {};
  Object.keys(breakdown).forEach(key => {
    if (map[key]) {
      result[map[key]] = {
        percentage: parseInt(breakdown[key].replace('%', '')) || 0
      };
    }
  });
  return result;
};

// MOCK DATA FOR DEMO PURPOSES
const mockSearchResults = (q: string) => [
  {
    asin: 'B08H75RTZ8',
    title: `${q} - Pro Wireless Edition`,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    price: { value: 299.00, currency: 'USD' },
    rating: 4.8,
    ratings_total: 12482
  }
];

const mockProductDetails = (asin: string) => ({
  asin,
  title: 'Quantum Ultra Pro Wireless',
  brand: 'ApexTech',
  categories: [{ name: 'Electronics' }, { name: 'Smart Audio' }],
  main_image: { link: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800' },
  price: { value: 299.00, currency: 'USD' },
  rating: 4.8,
  ratings_total: 12482,
  description: 'Premium wireless headphones with high-fidelity audio...',
  rating_breakdown: {
    five_star: { percentage: 82 },
    four_star: { percentage: 12 },
    three_star: { percentage: 4 },
    two_star: { percentage: 1 },
    one_star: { percentage: 1 }
  },
  top_reviews: [
    { body: 'The active noise cancellation is superior to competitors...', rating: 5, title: 'Amazing ANC' },
    { body: 'Battery lasts significantly longer than the advertised 30 hours...', rating: 5, title: 'Best battery' }
  ]
});
