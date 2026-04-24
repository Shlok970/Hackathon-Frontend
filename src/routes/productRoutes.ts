import { Router } from 'express';
import * as productController from '../controllers/productController';

const router = Router();

router.get('/analyze', productController.searchAndAnalyze);
router.get('/history', productController.getHistory);

// Placeholders for other routes mentioned in prompt
router.get('/health', (req, res) => res.json({ status: 'ok' }));
router.get('/:id', (req, res) => res.json({ message: 'Detail API placeholder' }));
router.get('/competitors/:id', (req, res) => res.json({ message: 'Competitors API placeholder' }));
router.get('/trends/:id', (req, res) => res.json({ message: 'Trends API placeholder' }));

export default router;
