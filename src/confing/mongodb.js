import { MongoClient } from "mongodb";

let client;
export const connectToMongoDB = async() => {
    await MongoClient.connect(process.env.DB_URL)
        .then(clientInstance => {
            client = clientInstance
            console.log("Connected to MongoDB");
            createCounter(client.db());
        })
        .catch((err) => 
            console.error(`Could not connect to MongoDB ${err}`)
        );
}

export const getDb = () => {
    return client.db();
}

const createCounter = async(db) => {
    const existingCounter = await db.collection("counters").findOne({_id:'cartItemId'});
    if(!existingCounter){
        await db.collection("counters").insertOne({_id:'cartItemId', value: 0});
    }
}