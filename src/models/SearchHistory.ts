import mongoose, { Schema, Document } from 'mongoose';

export interface ISearchHistory extends Document {
  query: string;
  resultCount: number;
  timestamp: Date;
}

const SearchHistorySchema: Schema = new Schema({
  query: { type: String, required: true },
  resultCount: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model<ISearchHistory>('SearchHistory', SearchHistorySchema);
