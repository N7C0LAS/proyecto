const PostgresPatientRepo = require('../adapters/db/PostgresPatientRepo');
module.exports = {
  patientRepo: new PostgresPatientRepo()
};
