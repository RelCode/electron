const express = require('express');
const router = express.Router();
const db = require('../../database'); // Adjust the path according to your structure

// Endpoint to get all products
router.get('/', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Endpoint to add a new product
router.post('/', (req, res) => {
  const { name, price } = req.body;
  db.run(
    'INSERT INTO products (name, price) VALUES (?, ?)',
    [name, price],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ message: 'Product added successfully', id: this.lastID });
    }
  );
});

module.exports = router;
