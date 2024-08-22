const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../../database'); // Adjust the path according to your structure
const keywords = require('./../util/keywords');
const verifyToken = require('./../util/middleware');

// Endpoint to get all (ACTIVE) users
router.get('/all', verifyToken, (req, res) => {
	db.get(`SELECT * FROM users WHERE active = ?`, [keywords.active], (err, rows) => {
		if (err) {
			return res.status(301).json({ message: 'Failed to Fetch Requested Data' });
		} else {
			// console.log('selectedUsers', rows);
			return res.status(200).json({ users: rows });
		}
	})
});

router.post('/create', verifyToken, (req, res) => {
	const { payload } = req.body;
	console.log('payload!!!', payload);
	db.get(`SELECT * FROM loginDetails WHERE username = ?`,[payload.userName],(err, rows) => {
		if(err){
			console.log('26', err);
			return res.status(500).json({ message: keywords.dbError })
		}
		if(typeof rows === 'object'){
			return res.status(442).json({ message: 'Username Already Registered' });
		}
		db.get(`SELECT * FROM userTypes WHERE typeID = ?`, [payload.userType], (err, rows) => {
			if (err) {
				console.log('34', err);
				return res.status(500).json({ message: keywords.dbError });
			}
			if (typeof rows === undefined) {
				return res.status(404).json({ message: 'Invalid User Type' })
			}
			const moment = require("moment");
			let timestamp = moment().local().format('YYYY-MM-DD HH:mm:SS');
			db.run(`INSERT INTO users (firstName, lastName, timeCreated) VALUES (?, ?, ?)`, [
				payload.firstName, payload.lastName, timestamp
			], async function(err) {
				if (err) {
					return res.status(500).json({ message: keywords.dbError });
				}
				const userID = this.lastID;
				const hashed = await bcrypt.hash(payload.password, 10);
				db.run(`INSERT INTO loginDetails (userID, username, password) VALUES (?, ?, ?)`,[
					userID, payload.userName, hashed
				],(err) => {
					if(err){
						return res.status(500).json({ message: keywords.dbError });
					}
					db.run(`INSERT INTO assignedUserTypes (userID, userTypeID) VALUES (?, ?)`,[userID, payload.userType],(err) => {
						if(err){
							return res.status(500).json({ message: keywords.dbError });
						}
						return res.status(200).json({ message: 'User Created Successfully!!!' });
					});
				});
			});
		});
	})
});

// router.get('/testGet',verifyToken,(req, res) => {
// 	console.log("testing GET");
// 	console.log(req.headers.authorization)
// 	res.status(200).json({ message: 'Test Finished' })
// });

module.exports = router;
