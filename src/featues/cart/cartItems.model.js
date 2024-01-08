import { ApplicationError } from "../../error-handler/applicationError.js";

export default class CartItemModel{
    constructor(productId, userId, quantity, id){
        this.productId = productId;
        this.userId = userId;
        this.quantity = quantity;
        this.id = id;
    }

    static add(productId, userId, quantity){
        const cartItem = new CartItemModel(
            productId,
            userId,
            quantity
        );
        cartItem.id = cartItems.length + 1;
        cartItems.push(cartItem);
        return cartItem;
    }

    static get(userId){
        return cartItems.filter((item) => item.userId === userId);
    }

    static delete(cartItemId, userId){
        const cartItemIndex = cartItems.findIndex(i => i.id == cartItemId && i.userId == userId)
        console.log(cartItemIndex);
        if(cartItemIndex <= -1){
            throw new ApplicationError('Item not found', 404);
        }
        else{
            cartItems.splice(cartItemIndex, 1);
        }
    }
}

let cartItems = [
    new CartItemModel(1, 2, 1, 1),
    new CartItemModel(2, 2, 1, 2),
];