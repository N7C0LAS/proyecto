const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function initDb(attempts = 10, delay = 2000) {
  for (let i = 0; i < attempts; i++) {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS patients (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT now()
        );
      `);
      console.log('Pacientes DB initialized');
      return;
    } catch (err) {
      console.log('Pacientes DB init attempt failed, retrying...', err.message);
      await new Promise(r => setTimeout(r, delay));
    }
  }
  throw new Error('Could not initialize pacientes DB');
}
module.exports = initDb;
