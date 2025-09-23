const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function initDb(attempts = 10, delay = 2000) {
  for (let i = 0; i < attempts; i++) {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS appointments (
          id SERIAL PRIMARY KEY,
          patient_name TEXT NOT NULL,
          doctor TEXT NOT NULL,
          scheduled_at TIMESTAMP NOT NULL,
          created_at TIMESTAMP DEFAULT now()
        );
      `);
      console.log('Citas DB initialized');
      return;
    } catch (err) {
      console.log(`DB init attempt ${i+1} failed, retrying...`, err.message);
      await new Promise(r => setTimeout(r, delay));
    }
  }
  throw new Error('Could not initialize DB');
}

module.exports = initDb;
