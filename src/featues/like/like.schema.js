import mongoose from "mongoose";


export const likeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likeable:{
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'on_model' 
    },
    on_model:{
        type: String,
        enum: ['Product', 'Category']
    }
}).pre('save', (next)=>{
    console.log("Like is coming")
    next();
})
.post('save', (doc)=>{
    console.log("Like is saved");
    console.log(doc);
})
.pre('find',(next)=>{
    console.log("Retrieving Likes");
    next();
})
.post('find', (docs) => {
    console.log("Post find");
    console.log(docs);
})