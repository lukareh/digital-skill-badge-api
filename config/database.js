const { Pool } = require('pg');

// database configuration
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'harish',
  database: 'assignment-demo-project',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

// test connection
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('database connected successfully');
    client.release();
  } catch (error) {
    console.error('database connection failed:', error.message);
  }
};

module.exports = { pool, testConnection };
