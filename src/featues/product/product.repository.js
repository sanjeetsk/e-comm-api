import { ObjectId } from "mongodb";
import { getDb } from "../../confing/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";


class ProductRepository{
    constructor(){
        this.collection = "products";
    }

    async add(newProduct){
        try{
            const db = getDb();
            const collection = db.collection(this.collection);
            await collection.insertOne(newProduct);
            return newProduct;
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong in database", 500);
        }

    }

    async get(id){
        console.log("id", new ObjectId(id));
        try{
            const db = getDb();
            const collection = db.collection(this.collection);
            return await collection.findOne({_id: new ObjectId(id)});
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async getAll(){
        try{
            const db = getDb();
            const collection = db.collection(this.collection);
            return await collection.find().toArray();
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async filter(minPrice, maxPrice, category){
        try{
            const db = getDb();
            const collection = db.collection(this.collection);
            let filterExpression = {};
            if(minPrice){
                filterExpression.price = {$gte: parseFloat(minPrice)}
            }
            if(maxPrice){
                filterExpression.price = {...filterExpression.price, $lte: parseFloat(maxPrice)}
            }
            if(category){
                filterExpression.category = category
            }
            return await collection.find(filterExpression).toArray();
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async rate(userId, productId, rating){
        try{
            const db = getDb();
            const collection = db.collection(this.collection);
            //1. Find the product
            const product = await collection.findOne({_id: new ObjectId(productId)});
            //2. Find the rating
            const userRating = product?.ratings?.find(r => r.userId == userId);
                // update the rating
                // if(userRating){
                //     await collection.updateOne(
                //         {_id:new ObjectId(productId), "ratings.userId": new ObjectId(userId)},
                //         {$set: {"ratings.$.rating": rating} } 
                //     )

            //3. Remove the existing entry
            await collection.updateOne({
                _id:new ObjectId(productId)
            }, {
                $pull: {ratings: {userId: new ObjectId(userId)}}
            })
            //4. Add new entry
            await collection.updateOne({
                _id:new ObjectId(productId)
            },{
                $push: {rating: {_id: new ObjectId(userId), rating}}
            })
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }
}

export default ProductRepository