import { MongoClient } from "mongodb";

let client;
export const connectToMongoDB = async() => {
    await MongoClient.connect(process.env.DB_URL)
        .then(clientInstance => {
            client = clientInstance
            console.log("Connected to MongoDB");
            createCounter(client.db());
            createIndexes(client.db());
        })
        .catch((err) => 
            console.error(`Could not connect to MongoDB ${err}`)
        );
}

export const getDb = () => {
    return client.db();
}

export const getClient = () => {
    return client;
}

const createCounter = async(db) => {
    const existingCounter = await db.collection("counters").findOne({_id:'cartItemId'});
    if(!existingCounter){
        await db.collection("counters").insertOne({_id:'cartItemId', value: 0});
    }
}

const createIndexes = async(db) => {
    try{
        await db.collection("products").createIndex({price: 1});
        await db.collection("products").createIndex({name: 1, category: -1});
        await db.collection("products").createIndex({desc: "text"});
    }
    catch(err){
        console.log(err);
    }
    console.log("Indexes are created");
}