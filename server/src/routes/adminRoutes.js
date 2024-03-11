import express  from "express";
import { checkUserRole, verifyUser } from "../middlewares/authMiddlewares.js";
import  product  from "../routes/product.js"
import { getUsers, deleteUser, updateUser } from "../controllers/userController.js";

const router = express.Router(); 

router.get('/dashboard', verifyUser, checkUserRole('admin'), (req, res) => {
    res.json({ message: 'Acceso permitido para administrador', username: req.name, role: req.role }); 
})
router.use('/products', product); 
router.get('/allusers', verifyUser, checkUserRole('admin'), getUsers); 
router.delete('/deleteuser/:id', verifyUser, checkUserRole('admin'), deleteUser); 
router.put('/updateuser/:id', verifyUser, checkUserRole('admin'), updateUser);


export default router; 