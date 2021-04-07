import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

module.exports = () => {
    open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });
};