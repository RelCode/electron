const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.resolve(__dirname, '../database.sqlite');
const db = new sqlite3.Database(dbPath);

const getCurrentVersion = () => {
  return new Promise((resolve, reject) => {
    db.get('PRAGMA user_version', (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row.user_version);
      }
    });
  });
};

const setCurrentVersion = (version) => {
  return new Promise((resolve, reject) => {
    db.run(`PRAGMA user_version = ${version}`, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const applyMigrations = async () => {
  try {
    const currentVersion = await getCurrentVersion();
    const migrationsDir = path.resolve(__dirname);
    const versions = fs.readdirSync(migrationsDir).filter((dir) => dir.startsWith('version'));

    for (const version of versions) {
      const versionNumber = parseInt(version.replace('version', ''), 10);
      if (versionNumber > currentVersion) {
        const migrationFiles = fs.readdirSync(path.join(migrationsDir, version));
        for (const file of migrationFiles) {
          const migration = require(path.join(migrationsDir, version, file));
          await migration(db);
        }
        await setCurrentVersion(versionNumber);
      }
    }
    console.log('Migrations applied successfully');
  } catch (err) {
    console.error('Error applying migrations', err);
  } finally {
    db.close();
  }
};

applyMigrations();
