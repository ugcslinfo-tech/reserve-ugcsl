import mongoose, { Schema, Document } from 'mongoose';

export interface INews extends Document {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  date: Date;
  image?: string;
  author?: string;
}

const NewsSchema = new Schema<INews>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  image: { type: String },
  author: { type: String, default: 'UGCSL Communications' },
});

export default mongoose.model<INews>('News', NewsSchema);
