import { pool } from '../config/database.js';

export function getApiHealth(_req, res) {
  res.status(200).json({
    success: true,
    service: 'weightlifting-analysis-api',
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
}

export async function getDatabaseHealth(_req, res) {
  try {
    await pool.query('SELECT 1');
    return res.status(200).json({ success: true, connected: true });
  } catch (error) {
    // Keep internal details in server logs; do not expose DB credentials or errors.
    console.error('Database health check failed:', error.message);
    return res.status(503).json({ success: false, connected: false, message: 'Database unavailable' });
  }
}
