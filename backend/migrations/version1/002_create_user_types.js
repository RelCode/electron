module.exports = (db) => {
    return new Promise ((resolve, reject) => {
        db.run(`SELECT name from sqlite_master WHERE type = "table" AND name = "userTypes"`, (err, row) => {
            if(err){
                reject("Failed to Select UserTypes Table");
            }else{
                if(row){
                    resolve("UserTypes Already Exists!")
                }else{
                    db.run(`CREATE TABLE IF NOT EXISTS userTypes (
                        typeID INTEGER PRIMARY KEY,
                        typeName TEXT NOT NULL
                    );`, (err) => {
                        if (err) {
                            console.log(err);
                            reject("Error: Failed to Create Users Table");
                        } else {
                            const insertTypes = [`INSERT INTO userTypes(typeID, typeName) VALUES(1, "super admin");`,
                                                `INSERT INTO userTypes(typeID, typeName) VALUES(2, "supervisor");`,
                                                `INSERT INTO userTypes(typeID, typeName) VALUES(3, "admin");`,
                                                `INSERT INTO userTypes(typeID, typeName) VALUES(4, "operator");`];
                            for(let i = 0; i < insertTypes.length; i++){
                                db.run(insertTypes[i],(err) => {
                                    if(err){
                                        reject("Failed to Insert Into UserTypes Table");
                                    }
                                })
                            }
                            db.run(`CREATE TABLE IF NOT EXISTS assignedUserTypes (
                                assignedTypeID INTEGER PRIMARY KEY,
                                userID INTEGER NOT NULL,
                                userTypeID INTEGER NOT NULL
                                );`,(err) => {
                                    if(err){
                                        reject("Failed to Create AssignedUserTypes Table");
                                    }else{
                                        db.run(`INSERT INTO assignedUserTypes (userID, userTypeID) VALUES (1, 1);`,(err) => {
                                            if(err){
                                                reject("Failed to Insert AssignedUserTypes");
                                            }else{
                                                console.log("Created UserTypes Table & Inserted User")
                                                resolve();
                                            }
                                        })
                                    }
                                }
                            );
                        }
                    });
                }
            }
        });
    });
}