import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";


//Creating Model from Schema.
const UserModal = mongoose.model('User', userSchema)

export default class UserRepository{

    async resetPassword(userId, hashedPassword){
        try{
            let user = await UserModal.findById(userId);
            user.password = hashedPassword;
            user.save();
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async signUp(user){
        try{
            // creating instance from modal
            const newUser = new UserModal(user);
            await newUser.save();
            return newUser;
        }
        catch(err){
            if(err instanceof mongoose.Error.ValidationError){
                throw err;
            }
            else{
                console.log(err);
                throw new ApplicationError("Something went wrong", 500);
            } 
        }
    }

    async signin(email, password){
        try{
            return await UserModal.findOne({email, password});
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async findByEmail(email){
        try {
            return await UserModal.findOne({email});
        }
        catch(err){
            throw new ApplicationError("Something went wrong", 500);
        }
    }
}