class Appointment {
  constructor({ id, patientName, doctor, scheduledAt, createdAt }) {
    this.id = id;
    this.patientName = patientName;
    this.doctor = doctor;
    this.scheduledAt = scheduledAt;
    this.createdAt = createdAt;
  }

  toEvent() {
    return {
      id: this.id,
      patientName: this.patientName,
      doctor: this.doctor,
      scheduledAt: this.scheduledAt
    };
  }
}

module.exports = Appointment;
