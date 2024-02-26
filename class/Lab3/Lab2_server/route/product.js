import express from 'express';
import { productController } from '../controllers/index.js';

// Khai báo đối tượng router
const productRouter = express.Router();

// Tiến hành định tuyến theo URI
// GET: Get all products
productRouter.get('/', productController.getAllProducts);

// GET: Get Product by Id
productRouter.get('/:id', productController.getProductById);

productRouter.get('/comments/:id', productController.getCommentByProductId);

// POST: Create a new Productx
productRouter.post('/', productController.createProduct);

productRouter.put('/:id', productController.updateProductById);

productRouter.delete('/:id', productController.deleteProductById);


export default productRouter;