import db from '../db.js'; 
import bcrypt from 'bcrypt';

const userService = {
  async registerUser(username, email, contact, password) {
    return new Promise((resolve, reject) => {
      if (!password) {
        reject({ Error: 'La contraseña no está definida.' });
        return;
      }

      const salt = 10;
      const sql = "INSERT INTO Users (`username`,`email`,`contact`,`password`) VALUES (?)";

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          console.error('Error al hashear la contraseña:', err);
          reject({ Error: 'Error al hashear la contraseña', BcryptError: err });
          return;
        }

        if (!hash) {
          console.error('El hash de la contraseña no se generó correctamente.');
          reject({ Error: 'Error al hashear la contraseña', BcryptError: 'Hash indefinido' });
          return;
        }

        const values = [username, email, contact, hash];

        db.query(sql, [values], (err, result) => {
          if (err) {
            console.error('Error en la consulta SQL:', err);
            reject({ Error: 'Error al insertar datos en el servidor', SQLerror: err });
          } else {
            resolve(result);
          }
        });
      });
    });
  },

  async getUserByEmail(email) {
    const sql = "SELECT * FROM Users WHERE email = ?"; 

    return new Promise((resolve, reject) => {
      db.query(sql, [email], (err, data) => {
        if (err) {
          console.error('Error en la consulta SQL:', err);
          reject({ Error: 'Error al obtener usuario por email', SQLerror: err });
        } else {
          resolve(data.length > 0 ? data[0] : 0); 
        }
      });
    });
  },
};

export default userService;