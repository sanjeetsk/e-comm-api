import express from 'express';
import ProductController from './product.controller.js';
import { upload } from '../../middlewares/fileupload.middleware.js'

// initialize express router
const productRouter = express.Router();

const productController = new ProductController();

// localhost:3000/api/products/filter?minPrice=10&maxPrice=100&category=Category1
productRouter.get('/filter', (req, res) => {
    productController.filterProduct(req, res)})

// All the path to controller method
// localhost:3000/api/products
productRouter.get('/', (req, res) => {
    productController.getAllProduct(req, res)});
productRouter.post('/', upload.single('imageUrl'), (req, res)=>{
    productController.addProduct(req, res)});

productRouter.get('/averagePrice', (req, res) => {
    productController.averagePrice(req, res)});

productRouter.get('/:id', (req, res) => {
    productController.getOneProduct(req, res)});

productRouter.post('/rate', (req, res)=> {
    productController.rateProduct(req, res)});

export default productRouter;