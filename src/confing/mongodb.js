import { MongoClient } from "mongodb";

let client;
export const connectToMongoDB = async() => {
    await MongoClient.connect(process.env.DB_URL)
        .then(clientInstance => {
            client = clientInstance
            console.log("Connected to MongoDB");
        })
        .catch((err) => 
            console.error(`Could not connect to MongoDB ${err}`)
        );
}

export const getDb = () => {
    return client.db();
}
