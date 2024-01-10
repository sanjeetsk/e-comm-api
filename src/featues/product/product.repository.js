import { ObjectId } from "mongodb";
import { getDb } from "../../confing/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";


class ProductRepository{
    constructor(){
        this.products = "products";
    }

    async add(newProduct){
        try{
            const db = getDb();
            const collection = db.collection(this.products);
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
            const collection = db.collection(this.products);
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
            const collection = db.collection(this.products);
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
            const collection = db.collection(this.products);
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
            const collection = db.collection(this.products);
            await collection.updateOne(
                {_id:new ObjectId(productId)}, 
                { $push: {rating: {_id: new ObjectId(userId), rating}} }
            )
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }
}

export default ProductRepository