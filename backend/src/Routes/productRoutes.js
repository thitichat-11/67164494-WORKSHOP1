import express from 'express';
import { 
    getProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} from '../controllers/productController.js';

const router = express.Router();


router.get('/', getProducts);          // Read (GET)
router.post('/', createProduct);       // Create (POST)
router.put('/:id', updateProduct);     // Update (PUT)
router.delete('/:id', deleteProduct);  // Delete (DELETE)

export default router;