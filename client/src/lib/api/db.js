import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

export const MONGO_URI = process.env.MONGODB_URI;

let mongooseConnection;
/**
 * Init connections to both driver
 * @return {Promise<MongoClient>}
 */
export async function connectDB() {
    console.log('f: connectDB:', MONGO_URI);

    if (!mongoose.connections[0]?.readyState) {
        mongooseConnection = await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
    }
    const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    return await client.connect();
}
