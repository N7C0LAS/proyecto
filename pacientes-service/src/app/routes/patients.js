const express = require('express');

module.exports = function makeRouter(container) {
  const router = express.Router();
  const repo = container.patientRepo;

  router.post('/', async (req, res) => {
    try {
      const { name, email } = req.body;
      if (!name || !email) return res.status(400).json({ error: 'Missing fields' });
      const p = await repo.create({ name, email });
      res.status(201).json(p);
    } catch (err) {
      console.error('Error create patient', err);
      res.status(500).json({ error: 'Internal error' });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const list = await repo.list();
      res.json(list);
    } catch (err) {
      console.error('Error list patients', err);
      res.status(500).json({ error: 'Internal error' });
    }
  });

  return router;
};
