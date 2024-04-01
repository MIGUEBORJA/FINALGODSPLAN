import { config } from 'dotenv';
import mysql from 'mysql2';

config()

const db = mysql.createConnection({
    host: process.env.HOST,
    user: "root",
    password: process.env.PASSWORD, //contraseña
    database: process.env.DATABASE
}); 

export default db; 