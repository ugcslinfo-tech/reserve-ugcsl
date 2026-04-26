import mongoose from 'mongoose';
import { Request, Response } from 'express';
import app from '../src/app';

let isConnected = false;

async function connectDb() {
  if (isConnected) return;
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not set');
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
  isConnected = true;
}

// Routes that don't need DB
const DB_FREE_ROUTES = ['/api/csrf-token', '/api/health', '/'];

export default async function handler(req: Request, res: Response) {
  const needsDb = !DB_FREE_ROUTES.includes(req.url?.split('?')[0] ?? '');
  if (needsDb) {
    try {
      await connectDb();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'DB connection failed';
      res.status(500).json({ message: msg });
      return;
    }
  }
  return app(req, res);
}
