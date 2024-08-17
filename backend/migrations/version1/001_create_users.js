module.exports = (db) => {
    return new Promise ((resolve, reject) => {
        db.run(`SELECT name FROM sqlite_master WHERE type = "table" AND name = "users"`,(err, row) => {
            if(err){
                console.log("Error: ", err);
                reject("Failed to Check if User Table Exists");
            }else{
                if(row){
                    console.log("Users Table Already Exists");
                    resolve("Users Table Already Exists");
                }else{
                    db.run(`CREATE TABLE IF NOT EXISTS users (
                        userID INTEGER PRIMARY KEY,
                        firstName TEXT NOT NULL,
                        lastName TEXT NOT NULL,
                        active TEXT CHECK (active IN ('ACTIVE','INACTIVE')) NOT NULL DEFAULT 'ACTIVE',
                        timeCreated REAL
                    );`, (err) => {
                        if(err) {
                            console.log(err);
                            reject("Error: Failed to Create Users Table");
                        }else{
                            const moment = require("moment");
                            let timestamp = moment().local().format('YYYY-MM-DD HH:mm:SS');
                            db.run(`INSERT INTO users (firstName, lastName, timeCreated) VALUES ("Lebo", "Nkosi", "${timestamp}");`, (err) => {
                                if (err) {
                                    console.log(err);
                                    reject("Error: Failed to Insert User Details");
                                } else {
                                    console.log("Users Table Created Successfully");
                                    resolve();
                                }
                            });
                        }
                    });
                }
            }
        });
    });
}