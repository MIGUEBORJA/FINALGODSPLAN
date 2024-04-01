import mysql from 'mysql2';

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Mianboga2005", //contraseña
    database: "db_godsplan"
}); 

export default db; 