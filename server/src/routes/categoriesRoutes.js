import  express  from 'express';
import { createCategories, deleteCategorie, updateCategorie, getCategories } from '../controllers/categoriesController.js';
import { checkUserRole } from '../middlewares/authMiddlewares.js';
import { verifyUser } from '../middlewares/authMiddlewares.js';

const router = express.Router();

router.post('/createcategorie', verifyUser, checkUserRole('admin'), createCategories);
router.delete('/:id', verifyUser, checkUserRole('admin'), deleteCategorie); 
router.put('/:id', verifyUser, checkUserRole('admin'), updateCategorie); 
router.get('/', verifyUser, checkUserRole('admin'), getCategories ); 

export default router; 

