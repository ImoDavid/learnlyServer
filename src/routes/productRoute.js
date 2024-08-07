import { Router } from 'express';
import {
  addProduct,
  createUser,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from '../controllers/productController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/products', getAllProducts);
router.get('/products/:id', auth(), getProductById);
router.post('/signin', createUser);
router.post('/add-product', auth(), addProduct);
router.patch('/products/:id', auth(), updateProduct);
router.delete('/products/:id', auth(), deleteProduct);

export default router;
