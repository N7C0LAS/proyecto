const { Pool } = require('pg');
const Patient = require('../../domain/Patient');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

class PostgresPatientRepo {
  async create({ name, email }) {
    const res = await pool.query(
      `INSERT INTO patients (name, email) VALUES ($1,$2) RETURNING *`,
      [name, email]
    );
    const r = res.rows[0];
    return new Patient({ id: r.id, name: r.name, email: r.email, createdAt: r.created_at });
  }

  async list() {
    const res = await pool.query(`SELECT * FROM patients ORDER BY id DESC`);
    return res.rows.map(r => new Patient({ id: r.id, name: r.name, email: r.email, createdAt: r.created_at }));
  }
}

module.exports = PostgresPatientRepo;
