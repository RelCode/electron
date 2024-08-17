const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../../database'); // Adjust the path according to your structure
const checkToken = require('./../util/checkToken');
const keywords = require('./../util/keywords');

// Endpoint to get all users
router.get('/', (req, res) => {
  	const token = checkToken(req);
  	if(!token){
    	res.status(301).json({ message: 'Token Not Found!' });
  	}
	jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
		if(err){
			res.status(301).json({ message: 'Invalid Access Token' });
		}else{
			console.log(payload);

			db.get(`SELECT * FROM users WHERE active = ?`,[keywords.active],(err, rows) => {
				if(err){
					res.status(301).json({ message: 'Failed to Fetch Requested Data' });
				}
				console.log('rows',rows);
			})
		}
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
