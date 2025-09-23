const PostgresAppointmentRepo = require('../adapters/db/PostgresAppointmentRepo');
const RabbitPublisher = require('../adapters/mq/RabbitPublisher');

module.exports = {
  appointmentRepo: new PostgresAppointmentRepo(),
  eventPublisher: new RabbitPublisher()
};
