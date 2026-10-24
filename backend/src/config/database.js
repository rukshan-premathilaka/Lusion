import mysql from 'mysql2/promise';

const requiredVariables = ['DB_HOST', 'DB_USER', 'DB_NAME'];
const missingVariables = requiredVariables.filter((key) => !process.env[key]);

if (missingVariables.length > 0) {
  throw new Error(`Missing database environment variables: ${missingVariables.join(', ')}`);
}

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
