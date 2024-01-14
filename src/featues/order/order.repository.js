import { ObjectId } from "mongodb";
import { getDb } from "../../confing/mongodb.js";


export default class OrderRepository{
    constructor(){
        this.collection = "order";
    }

    async placeOrder(userId){

        // 1. Get cartItems abd calculate toatl amount.
        await this.getTotalAmount(userId);

        // 2. Create an order

        // 3. Reduce the stock.

        // 4. Clear the cart items.
    }

    async getTotalAmount(userId){
        const db = getDb();
        
        const items = await db.collection("cartItems").aggregate([
            // 1. Get cart item for user
            {
                $match: {userId: new ObjectId(userId)}
            },
            // 2. Get the products from products collection
            {
                $lookup:{
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "productInfo"
                }
            },
            // 3. Unwind the productInfo
            {
                $unwind: "$productInfo"
            },
            // 4. Calculate total amount for each cartItem
            {
                $addFields: {
                    "totalAmount":{
                        $multiply: ["$productInfo.price", "$quantity"]
                    }
                }
            }
        ]).toArray();
        console.log("item",items);
    }
}