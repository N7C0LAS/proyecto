require('dotenv').config();
const RabbitConsumer = require('./adapters/mq/RabbitConsumer');
const handlers = require('./handlers/AppointmentHandlers');

const consumer = new RabbitConsumer(process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672');
consumer.start('appointments', 'appointment.created', handlers.onAppointmentCreated)
  .then(() => console.log('Notificaciones service consumer started'))
  .catch(err => { console.error('Consumer error', err); process.exit(1); });

// optional HTTP health endpoint
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Notificaciones service running'));
app.listen(3002, () => console.log('Notificaciones HTTP available on 3002'));
