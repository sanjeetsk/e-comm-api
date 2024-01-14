
export default class CartItemModel{
    constructor(productId, userId, quantity){
        this.productId = productId;
        this.userId = userId;
        this.quantity = quantity;
    }

//     static delete(cartItemId, userId){
//         const cartItemIndex = cartItems.findIndex(i => i.id == cartItemId && i.userId == userId)
//         console.log(cartItemIndex);
//         if(cartItemIndex <= -1){
//             throw new ApplicationError('Item not found', 404);
//         }
//         else{
//             cartItems.splice(cartItemIndex, 1);
//         }
//     }
}