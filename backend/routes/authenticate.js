const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../../database'); // Adjust the path according to your structure

// Endpoint to add a new user
router.post('/', (req, res) => {
    const { username, password } = req.body;
    db.get(
        `SELECT loginDetails.loginDetailsID, loginDetails.username, loginDetails.password, loginDetails.loginAttempts, users.userID, users.lastName, users.firstName, userTypes.typeID, userTypes.typeName
            FROM loginDetails
            INNER JOIN users
            ON loginDetails.userID = users.userID
            INNER JOIN assignedUserTypes
            ON users.userID = assignedUserTypes.userID 
            INNER JOIN userTypes 
            ON assignedUserTypes.userTypeID = userTypes.typeID
            WHERE loginDetails.username = ? `,
        [username],
        (err, data) => {
            if(err){
                res.status(500).json({message: 'Database Error!'});
            }else{
                // res.status(200).json(data);
                if(data && Object.keys(data).length > 0){
                    if(data.loginAttempts > 2){
                        console.log('Maximum Attempts Exceeded');
                        res.status(301).json({ message: 'Exceeded Maximum Login Attempts!' });
                    }else{
                        bcrypt.compare(password, data.password, (err, match) => {
                            if(err){
                                res.status(400).json({ message: 'Failed to Verify User Credentials' });
                            }else{
                                if(!match){
                                    let attempts = Number(data.loginAttempts) + 1;
                                    db.run(`
                                        UPDATE loginDetails SET loginAttempts = ? WHERE loginDetailsID = ?;
                                        `,[attempts, data.loginDetailsID],(err) => {
                                            if(err){
                                                console.log('Failed to Update Attempts Counter');
                                                res.status(400).json({ message: 'Failed to Update Attempts Counter' })
                                            }else{
                                                console.log('Incorrect Login Details!');
                                                res.status(400).json({ message: 'Incorrect Login Details' });
                                            }
                                    });
                                }else{
                                    if(Number(data.loginAttempts) > 0){
                                        db.run(
                                            `UPDATE loginDetails SET loginAttempts = ? WHERE loginDetailsID = ?`,
                                            [0, data.loginDetailsID],(err) => {
                                                if(err){
                                                    console.log('Failed to Reset Login Attempts Value');
                                                    res.status(400).json({ message: 'Failed to Reset Login Attempts' });
                                                }
                                                console.log('just reset the attempts to 0')
                                            }
                                        );
                                    }
                                    delete data.loginDetailsID;
                                    delete data.username;
                                    delete data.password;
                                    delete data.loginAttempts;
                                    const access_token = jwt.sign(data, process.env.SECRET_KEY, {
                                        expiresIn: (60 * 60 * 8)
                                    });
                                    res.status(200).json({ accessToken: access_token });
                                }
                            }
                        });
                    }
                }else{
                    res.status(401).json({ message: 'Username is Not Registered!' })
                }
            }
        }
    );
});

module.exports = router;
