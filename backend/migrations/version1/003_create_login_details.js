module.exports = (db) => {
    return new Promise ((resolve, reject) => {
        db.run(`SELECT name FROM sqlite_master WHERE type = "table" AND name = "loginDetails"`, (err, row) => {
            if(err) {
                reject("Failed to Select LoginDetails Table");
            }else{
                if(row){
                    resolve("Login Details Table Already Exists!");
                }else{
                    db.run(`CREATE TABLE IF NOT EXISTS loginDetails (
                        loginDetailsID INTEGER PRIMARY KEY,
                        userID INTEGER NOT NULL,
                        username TEXT NOT NULL,
                        password TEXT NOT NULL,
                        loginAttempts INTEGER DEFAULT 0
                    );`, (err) => {
                        if (err) {
                            console.log("Error: ", err);
                            reject("Failed To Create Login Details Table");
                        } else {
                            db.run(`INSERT INTO loginDetails (userID, username, password) VALUES (1, "fana", "$2b$10$WA4gT6iQ.eKfZjj7Wc9CdOL2GsCCuOG3cmL8bfAkS8y7/7VucoAwK");`,(err) => {
                                if(err){
                                    reject("Failed to Insert Login Details");
                                }else{
                                    resolve("Login Details Table Created & Admin Details Captured Successfully");
                                }
                            })
                        }
                    });
                }
            }
        });
    })
}