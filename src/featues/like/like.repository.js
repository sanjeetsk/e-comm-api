import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { ObjectId } from "mongodb";


const LikeModel = mongoose.model("Like", likeSchema);

export class LikeRepository{

    async getLikeItems(id, type){
        return await LikeModel.find({
            likeable: new ObjectId(id),
            on_model: type
        }).populate('user')
        .populate({path: 'likeable', on_model: type})
    }

    async LikeProduct(userId, productId){
        try{
            const newLike = new LikeModel({
                user: new ObjectId(userId),
                likeable: new ObjectId(productId),
                on_model: 'Product'
            })
            await newLike.save();
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with Order", 500);
        }
    }

    async LikeCategory(userId, categoryId){
        try{
            const newLike = new LikeModel({
                user: new ObjectId(userId),
                likeable: new ObjectId(categoryId),
                on_model: 'Category'
            })
            await newLike.save();
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with Order", 500);
        }
    }
}