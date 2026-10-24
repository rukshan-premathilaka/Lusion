import 'dotenv/config';
import app from './app.js';
import { pool } from './config/database.js';

const port = Number(process.env.PORT || 5000);
const server = app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
  console.log(`Health endpoint: http://localhost:${port}/api/health`);
});

async function shutdown(signal) {
  console.log(`${signal} received. Shutting down...`);
  server.close(async () => {
    try {
      await pool.end();
    } catch (error) {
      console.error('Error closing database pool:', error.message);
    }
    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
