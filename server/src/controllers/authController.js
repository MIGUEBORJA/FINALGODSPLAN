import { config } from 'dotenv';
import userService from "../services/userService.js";
import bcrypt from 'bcrypt'; 
import jwt  from "jsonwebtoken";

config()

const authController = {
  async register(req, res) {
    try {
      const { username, email, contact, password} = req.body;
      const result = await userService.registerUser(username, email, contact, password);
      res.status(200).json({ Status: 'Success', result });
    } catch (error) {
      console.error('Error en el registro:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userService.getUserByEmail(email);

      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          /*const token = jwt.sign({ name: 'usuario', role: 'admin' }, 'jwt-secret-key', { expiresIn: '1d' });
          res.cookie('token', token);
          return res.json({ Status: "Success" });*/
          const token = jwt.sign({ name: user.username, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1d' });
          console.log("Token generado:", token);
          res.cookie('token', token);
          return res.json({ Status: "Success" });
        } else {
          return res.json({ Error: "Contraseña incorrecta" });
        }
      } else {
        return res.json({ Error: "El email ingresado no existe" });
      }
    } catch (error) {
      console.error('Error en el login:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },
  logout(req, res) {
    try {
      res.clearCookie('token');
      return res.json({ Status: "Success" });
    } catch (error) {
      console.error('Error en el logout:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },
};

export default authController;