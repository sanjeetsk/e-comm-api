import { ObjectId } from "mongodb";
import { getClient, getDb } from "../../confing/mongodb.js";
import OrderModel from "./order.model.js";
import { ApplicationError } from "../../error-handler/applicationError.js";


export default class OrderRepository {
    constructor() {
        this.collection = "order";
    }

    async placeOrder(userId) {
        const db = getDb();
        const client = getClient();
        const session = client.startSession();
        try {
            session.startTransaction();
            // 1. Get cartItems abd calculate toatl amount.
            const items = await this.getTotalAmount(userId, session);
            const finalTotalAmount = items.reduce((acc, item) => acc + item.totalAmount, 0)
            console.log(finalTotalAmount);

            // 2. Create an order
            const newOrder = new OrderModel(new ObjectId(userId), finalTotalAmount, new Date());
            await db.collection(this.collection).insertOne(newOrder, { session });
            // 3. Reduce the stock.
            for (let item of items) {
                await db.collection("products").updateOne(
                    { _id: item.productId },
                    { $inc: { stock: -item.quantity } },
                    { session }
                )
            }
            // throw new Error("Something wrong in place order");
            // 4. Clear the cart items.
            await db.collection("cartItems").deleteMany({
                userId: new ObjectId(userId)
            }, { session });
            session.commitTransaction();
            session.endSession();
            return;
        }
        catch (err) {
            await session.abortTransaction();
            session.endSession();
            console.log(err);
            throw new ApplicationError("Something went wrong in placing order", 500);
        }
    }

    async getTotalAmount(userId, session) {
        const db = getDb();

        const items = await db.collection("cartItems").aggregate([
            // 1. Get cart item for user
            {
                $match: { userId: new ObjectId(userId) }
            },
            // 2. Get the products from products collection
            {
                $lookup: {
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
                    "totalAmount": {
                        $multiply: ["$productInfo.price", "$quantity"]
                    }
                }
            }
        ], { session }).toArray();
        return items;
    }
}