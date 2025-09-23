require('dotenv').config();
const express = require('express');
const container = require('./di/container');
const initDb = require('./infra/init-db');

const app = express();
app.use(express.json());

const router = require('./app/routes/patients')(container);
app.use('/patients', router);

const PORT = process.env.PORT || 3001;

initDb().then(() => {
  app.listen(PORT, () => {
    console.log('Pacientes service listening on', PORT);
  });
}).catch(err => {
  console.error('Failed to init pacientes DB', err);
  process.exit(1);
});
