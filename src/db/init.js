const Database = require('config');

Database()

Database.exec(`
CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    monthly-budget INT,
    hours-per-day INT,
    days-per-week INT,
    vacation-per-year INT,
    value-hour INT,
)`)

Database.exec(`
CREATE TABLE jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily-hours INT,
    total-hours INT,
    created_at DATETIME,
    updated_at DATETIME
)`)

Databasea.close()