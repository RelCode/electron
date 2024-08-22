const express = require('express');
const router = express.Router();
const db = require('../../database'); // Adjust the path according to your structure
const keywords = require('./../util/keywords');

router.get('/', (req, res) => {
    db.all(`SELECT * FROM userTypes ORDER BY typeID ASC`,(err, rows) => {
        if(err){
            res.status(404).json({ message: 'Failed to Fetch User Types' });
        }else{
            res.status(200).json({ types: rows });
        }
    });
})

module.exports = router;