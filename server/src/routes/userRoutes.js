import express from 'express';
import { checkUserRole, verifyUser } from '../middlewares/authMiddlewares.js'; 
import { obtenerDatosProtegidos } from '../controllers/userController.js';

const router = express.Router();

router.get('/', verifyUser, obtenerDatosProtegidos);
router.get('/admin', checkUserRole('admin'), obtenerDatosProtegidos); 

export default router;