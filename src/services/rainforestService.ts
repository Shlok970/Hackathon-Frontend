import axios from 'axios';

const RAINFOREST_KEY = process.env.RAINFOREST_API_KEY;
const BASE_URL = 'https://api.rainforestapi.com/request';

export const searchProducts = async (q: string) => {
  if (!RAINFOREST_KEY) {
    console.warn('RAINFOREST_API_KEY is not set. Returning mock search results.');
    return mockSearchResults(q);
  }

  try {
    console.log(`Searching Amazon for: "${q}"...`);
    const response = await axios.get(BASE_URL, {
      params: {
        api_key: RAINFOREST_KEY,
        type: 'search',
        amazon_domain: 'amazon.com',
        search_term: q,
        sort_by: 'most_recent'
      }
    });

    if (response.data.request_info && !response.data.request_info.success) {
      console.error('Rainforest API returned success:false. Message:', response.data.request_info.message || 'No message provided');
      return [];
    }

    const results = response.data.search_results || [];
    console.log(`Found ${results.length} results.`);
    return results;
  } catch (error: any) {
    console.error('Rainforest Search Error:', error.response?.data || error.message);
    return [];
  }
};

export const getProductDetails = async (asin: string) => {
  if (!RAINFOREST_KEY) {
    console.warn('RAINFOREST_API_KEY is not set. Returning mock product details.');
    return mockProductDetails(asin);
  }

  try {
    console.log(`Fetching details for ASIN: ${asin}...`);
    const response = await axios.get(BASE_URL, {
      params: {
        api_key: RAINFOREST_KEY,
        type: 'product',
        amazon_domain: 'amazon.com',
        asin: asin
      }
    });

    if (!response.data.product) {
      console.error('Rainforest Detail Error: product data missing from response.', response.data);
      throw new Error('Product not found in Rainforest API response');
    }

    return response.data.product;
  } catch (error: any) {
    console.error('Rainforest Detail Error:', error.response?.data || error.message);
    throw error;
  }
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
