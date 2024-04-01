import express from 'express'; 
import { createCheckout, getAllCheck, getPending, deleteCheck, deletePending} from '../controllers/checkoutController.js';
import { checkUserRole } from '../middlewares/authMiddlewares.js';
import { verifyUser } from '../middlewares/authMiddlewares.js';

const router = express.Router(); 

router.post('/createcheckout', createCheckout); 
router.get('/', verifyUser, checkUserRole('admin'), getAllCheck );
router.get('/pending', verifyUser, checkUserRole('admin'), getPending);
router.delete('/:id', verifyUser, checkUserRole('admin'), deleteCheck);
router.delete('/pending/:id', verifyUser, checkUserRole('admin'), deletePending);  

export default router; 