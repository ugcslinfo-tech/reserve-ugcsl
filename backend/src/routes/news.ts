import { Router, Request, Response } from 'express';
import News from '../models/News';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(20, parseInt(req.query.limit as string) || 10);
    const news = await News.find().sort({ date: -1 }).skip((page - 1) * limit).limit(limit);
    const total = await News.countDocuments();
    res.json({ data: news, total, page, pages: Math.ceil(total / limit) });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const news = await News.findOne({ slug: req.params.slug });
    if (!news) return res.status(404).json({ message: 'News not found' });
    res.json(news);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
