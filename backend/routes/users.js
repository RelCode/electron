const express = require('express');
const router = express.Router();
const db = require('../../database'); // Adjust the path according to your structure

// Endpoint to get all users
router.get('/', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Endpoint to add a new user
router.post('/', (req, res) => {
  const { name, email } = req.body;
  db.run(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ message: 'User added successfully', id: this.lastID });
    }
  );
});

module.exports = router;
