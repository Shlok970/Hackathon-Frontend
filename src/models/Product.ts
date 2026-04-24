import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  amazonId: string;
  title: string;
  image: string;
  brand: string;
  category: string;
  price: string;
  rating: number;
  reviewsCount: number;
  description: string;
  ratingBreakdown: {
    [key: string]: number;
  };
  topReviews: Array<{
    body: string;
    rating: number;
    title: string;
  }>;
  lastFetched: Date;
}

const ProductSchema: Schema = new Schema({
  amazonId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  image: { type: String },
  brand: { type: String },
  category: { type: String },
  price: { type: String },
  rating: { type: Number },
  reviewsCount: { type: Number },
  description: { type: String },
  ratingBreakdown: { type: Object },
  topReviews: [{ body: String, rating: Number, title: String }],
  lastFetched: { type: Date, default: Date.now }
});

export default mongoose.model<IProduct>('Product', ProductSchema);
