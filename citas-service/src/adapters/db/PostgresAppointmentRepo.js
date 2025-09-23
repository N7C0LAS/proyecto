const { Pool } = require('pg');
const Appointment = require('../../domain/Appointment');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

class PostgresAppointmentRepo {
  async create({ patientName, doctor, scheduledAt }) {
    const res = await pool.query(
      `INSERT INTO appointments (patient_name, doctor, scheduled_at) VALUES ($1,$2,$3) RETURNING *`,
      [patientName, doctor, scheduledAt]
    );
    const r = res.rows[0];
    return new Appointment({
      id: r.id,
      patientName: r.patient_name,
      doctor: r.doctor,
      scheduledAt: r.scheduled_at,
      createdAt: r.created_at
    });
  }

  async list() {
    const res = await pool.query(`SELECT * FROM appointments ORDER BY id DESC`);
    return res.rows.map(r => new Appointment({
      id: r.id,
      patientName: r.patient_name,
      doctor: r.doctor,
      scheduledAt: r.scheduled_at,
      createdAt: r.created_at
    }));
  }
}

module.exports = PostgresAppointmentRepo;
