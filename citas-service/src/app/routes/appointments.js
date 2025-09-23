const express = require('express');

module.exports = function makeRouter(container) {
  const router = express.Router();
  const repo = container.appointmentRepo;
  const publisher = container.eventPublisher;

  router.post('/', async (req, res) => {
    try {
      const { patientName, doctor, scheduledAt } = req.body;
      if (!patientName || !doctor || !scheduledAt) {
        return res.status(400).json({ error: 'Missing fields' });
      }

      const appt = await repo.create({ patientName, doctor, scheduledAt });

      // Publish event (Pub/Sub)
      await publisher.publish('appointments', 'appointment.created', appt.toEvent());

      res.status(201).json(appt);
    } catch (err) {
      console.error('Error create appointment:', err);
      res.status(500).json({ error: 'Internal error' });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const list = await repo.list();
      res.json(list);
    } catch (err) {
      console.error('Error list appointments:', err);
      res.status(500).json({ error: 'Internal error' });
    }
  });

  return router;
};
