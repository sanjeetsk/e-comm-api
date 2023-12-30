import express from 'express';
import ProductController from './product.controller.js';
import { upload } from '../../middlewares/fileupload.middleware.js'

// initialize express router
const productRouter = express.Router();

const productController = new ProductController();

// localhost:3000/api/products/filter?minPrice=10&maxPrice=100&category=Category1
productRouter.get('/filter', productController.filterProduct)

// All the path to controller method
// localhost:3000/api/products
productRouter.get('/', productController.getAllProduct);
productRouter.post('/', upload.single('imageUrl'), productController.addProduct);
productRouter.get('/:id', productController.getOneProduct);

export default productRouter;