import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health.routes.js';

const app = express();
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors({ origin: frontendUrl }));
app.use(express.json({ limit: '1mb' }));

app.get('/', (_req, res) => {
  res.json({ message: 'Weightlifting Analysis API' });
});

app.use('/api/health', healthRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.path}` });
});

app.use((error, _req, res, _next) => {
  console.error('Unhandled API error:', error.message);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

export default app;
