import { getDb } from "../../confing/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class UserRepository{
    async signUp(newUser){
        try {
            // Get the database
            const db = getDb();

            // get the collection
            const collection = db.collection("users");

            // insert document
            await collection.insertOne(newUser);
            return newUser;
        }
        catch(err){
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async findByEmail(email){
        try {
            // Get the database
            const db = getDb();

            // get the collection
            const collection = db.collection("users");

            // insert document
            return await collection.findOne({email});
        }
        catch(err){
            throw new ApplicationError("Something went wrong", 500);
        }
    }
}

export default UserRepository;