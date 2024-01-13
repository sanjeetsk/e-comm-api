import CartItemModel from "./cartItems.model.js";
import CartRepository from "./cartItems.repository.js";

export default class CartItemsController {
    constructor() {
        this.cartRepository = new CartRepository();
    }
    async add(req, res) {
        try {
            const { productId, quantity } = req.body;
            const userId = req.userId;
            await this.cartRepository.add(productId, userId, quantity);
            return res.status(201).send("Successfully Added to Cart");
        }
        catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong in database", 500);
        }
    }

    async get(req, res) {
        try {
            const userId = req.userId;
            const items = await this.cartRepository.get(userId);
            if (!items) {
                return res.status(404).json({ message: 'No cart items found' });
            }
            return res.status(201).send(items);
        }
        catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong in database", 500);
        }
    }

    async delete(req, res) {
        try {
            const userId = req.userId;
            const { cartItemId } = req.body;
            const isDeleted = await this.cartRepository.delete(cartItemId, userId);
            if(!isDeleted){
                return res.status(404).send("Item not found");
            }
            return res.status(200).send('Deleted successfully');
        }
        catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong in database", 500);
        }
    }
}