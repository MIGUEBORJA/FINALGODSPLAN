import express from 'express'; 
import { createProduct, deleteProduct, updateProduct } from '../controllers/productsController.js';
import { checkUserRole } from '../middlewares/authMiddlewares.js';
import { verifyUser } from '../middlewares/authMiddlewares.js';
import upload from '../config/multer.js'

const router = express.Router(); 

router.post('/createproduct',verifyUser, checkUserRole('admin'), upload.single('image'), createProduct); 
router.delete('/:id', verifyUser, checkUserRole('admin'), deleteProduct);
router.put('/:id', verifyUser, checkUserRole('admin'), upload.single('image') , updateProduct);

export default router; 