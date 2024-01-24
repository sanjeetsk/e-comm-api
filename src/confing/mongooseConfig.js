import mongoose from "mongoose";
import dotenv from 'dotenv';
import { categorySchema } from "../featues/product/category.schema.js";

dotenv.config();
const url = process.env.DB_URL;
export const connectUsingMongoose = async() => {
    try{
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongDb connected using Mongoose");
        addCategories()
    }
    catch(err){
        console.error(`Error while connecting to MongoDB ${err}`);
    }
}

async function addCategories(){
    const CategoryModel = mongoose.model("Category", categorySchema);
    const categories = CategoryModel.find();
    if(!categories || (await categories).length==0){
        await CategoryModel.insertMany([{name:'Books'}, {name:'Clothings'}, {name: 'Electronics'}])
    }
    console.log("Categories added");
}
