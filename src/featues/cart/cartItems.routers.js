import express from 'express';
import CartItemsController from './cartItems.controller.js';

// initialize express router
const cartRouter = express.Router();

const cartItemsController = new CartItemsController();

cartRouter.post('/', (req,res) => {
    cartItemsController.add(req, res)});
cartRouter.get('/', (req, res) =>{
    cartItemsController.get(req, res)});
cartRouter.delete('/', (req, res) =>{
    cartItemsController.delete(req, res)});

export default cartRouter;