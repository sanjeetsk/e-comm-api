import { ObjectId } from "mongodb";
import { getDb } from "../../confing/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import mongoose, { mongo } from "mongoose";
import { productSchema } from "./product.schema.js";
import { reviewSchema } from "./review.schema.js";
import { categorySchema } from "./category.schema.js";

const ProductModel = mongoose.model("Product", productSchema);
const ReviewModel = mongoose.model("Review", reviewSchema);
const CategoryModel = mongoose.model("Category", categorySchema);
class ProductRepository{
    constructor(){
        this.collection = "products";
    }

    async add(productData){
        try{
            // 1.Adding Product
            productData.categories = productData.category.split(',');
            const newProduct = new ProductModel(productData);
            const savedProduct = await newProduct.save();

            //2.Update categories.
            await CategoryModel.updateMany(
                {_id: {$in: productData.categories}},
                {$push: {products: new ObjectId(savedProduct._id)}}
            )
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    // async add(newProduct){
    //     try{
    //         const db = getDb();
    //         const collection = db.collection(this.collection);
    //         await collection.insertOne(newProduct);
    //         return newProduct;
    //     }
    //     catch(err){
    //         console.log(err);
    //         throw new ApplicationError("Something went wrong in database", 500);
    //     }
    // }

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

    // with mongoose
    async rate(userId, productId, rating){
        try{
            // 1.Check if product exists
            const productToUpdate = await ProductModel.findById(productId);
            if(!productToUpdate){
                throw new ApplicationError("Product Not Found", 400);
            }

            // find the existing review
            const userReview = await ReviewModel.find({product: new ObjectId(productId), user: new ObjectId(userId)});
            if(userReview){
                userReview.rating = rating;
                await userReview.save();
            }
            else{
                const newRating = new ReviewModel({
                    product: new ObjectId(productId),
                    user: new ObjectId(userId),
                    rating: rating
                })
                await newRating.save();
            }
        }
        catch(err){

        }
    }
    // async rate(userId, productId, rating){
    //     try{
    //         const db = getDb();
    //         const collection = db.collection(this.collection);
    //         //1. Find the product
    //         const product = await collection.findOne({_id: new ObjectId(productId)});
    //         //2. Find the rating
    //         const userRating = product?.ratings?.find(r => r.userId == userId);
    //             // update the rating
    //             // if(userRating){
    //             //     await collection.updateOne(
    //             //         {_id:new ObjectId(productId), "ratings.userId": new ObjectId(userId)},
    //             //         {$set: {"ratings.$.rating": rating} } 
    //             //     )

    //         //3. Remove the existing entry
    //         await collection.updateOne({
    //             _id:new ObjectId(productId)
    //         }, {
    //             $pull: {ratings: {userId: new ObjectId(userId)}}
    //         })
    //         //4. Add new entry
    //         await collection.updateOne({
    //             _id:new ObjectId(productId)
    //         },{
    //             $push: {rating: {_id: new ObjectId(userId), rating}}
    //         })
    //     }
    //     catch(err){
    //         console.log(err);
    //         throw new ApplicationError("Something went wrong", 500);
    //     }
    // }

    async averageProductPricePerCategory(){
        try{
            const db = getDb();
            return await db.collection(this.collection)
                .aggregate([
                    {
                        // Group 1: average price per category
                        $group:{
                            _id:"$category",
                            avgPrice:{$avg:"$price"}
                        }
                    }
                ]).toArray();
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }
}

export default ProductRepository