import { Request, Response } from 'express';
import Product from '../models/Product';
import SearchHistory from '../models/SearchHistory';
import * as amazonService from '../services/amazonService';
import { getAIPlaceholders } from '../services/placeholderService';

export const searchAndAnalyze = async (req: Request, res: Response) => {
  const query = req.query.q as string;

  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    // 1. Log search history
    try {
      const searchResults = await amazonService.searchProducts(query);
      
      // Attempt to log search history, but don't fail if DB is offline
      try {
        const searchLog = new SearchHistory({ query });
        if (searchResults.length > 0) {
          searchLog.resultCount = searchResults.length;
          await searchLog.save();
        }
      } catch (dbError: any) {
        console.warn('Database error while saving search history (skipping):', dbError.message);
      }

      if (searchResults.length === 0) {
        return res.status(404).json({ error: `No products found matching "${query}"` });
      }

      // 3. For the demo, we analyze the first search result
      const topAsin = searchResults[0].asin;
      
      // 4. Check if we have this product in cache
      let product = null;
      try {
        product = await Product.findOne({ amazonId: topAsin });
      } catch (dbError) {
        console.warn('Database not available, skipping cache lookup:', dbError.message);
      }
      
      if (!product || (Date.now() - product.lastFetched.getTime() > 24 * 60 * 60 * 1000)) {
        // Fetch fresh details
        const details = await amazonService.getProductDetails(topAsin);
        
        const productData = {
          amazonId: details.asin,
          title: details.title,
          brand: details.brand,
          category: details.categories?.[0]?.name || 'Uncategorized',
          price: details.price?.value ? `${details.price.currency || '$'}${details.price.value}` : 'N/A',
          image: details.main_image?.link,
          rating: details.rating,
          reviewsCount: details.ratings_total,
          description: details.description,
          ratingBreakdown: {
            '5 Stars': details.rating_breakdown?.five_star?.percentage || 0,
            '4 Stars': details.rating_breakdown?.four_star?.percentage || 0,
            '3 Stars': details.rating_breakdown?.three_star?.percentage || 0,
            '2 Stars': details.rating_breakdown?.two_star?.percentage || 0,
            '1 Star': details.rating_breakdown?.one_star?.percentage || 0,
          },
          topReviews: details.top_reviews?.map((r: any) => ({
            body: r.body,
            rating: r.rating,
            title: r.title
          })) || [],
          lastFetched: new Date()
        };

        if (!product) {
          product = new Product(productData);
        } else {
          Object.assign(product, productData);
        }
        
        try {
          await product.save();
        } catch (dbError) {
          console.warn('Database not available, skipping cache save:', dbError.message);
        }
      }

      // 5. Generate ML Placeholders
      const insights = getAIPlaceholders(product.title);

      // 6. Return full payload
      res.json({
        product,
        insights
      });
    } catch (innerError: any) {
      console.error('Inner Search API Error:', innerError);
      res.status(500).json({ 
        error: 'Analysis failed', 
        details: innerError.message,
        hint: 'This could be due to a missing RapidAPI key or a database connection issue.' 
      });
    }
  } catch (error: any) {
    console.error('Global Search API Error:', error);
    res.status(500).json({ error: 'System error during analysis' });
  }
};

export const getHistory = async (req: Request, res: Response) => {
  try {
    const history = await SearchHistory.find().sort({ timestamp: -1 }).limit(10);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};
