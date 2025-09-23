require('dotenv').config();
const express = require('express');
const container = require('./di/container');
const initDb = require('./infra/init-db');

const app = express();
app.use(express.json());

const appointmentsRouter = require('./app/routes/appointments')(container);
app.use('/appointments', appointmentsRouter);

const PORT = process.env.PORT || 3000;

initDb(container).then(() => {
  app.listen(PORT, () => {
    console.log(`Citas service listening on ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to init DB:', err);
  process.exit(1);
});
