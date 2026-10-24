import { Router } from 'express';
import { getApiHealth, getDatabaseHealth } from '../controllers/health.controller.js';

const router = Router();

router.get('/', getApiHealth);
router.get('/database', getDatabaseHealth);

export default router;
