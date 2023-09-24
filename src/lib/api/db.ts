import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import { dbUri } from '@/lib/const';
import clientPromise from "@/lib/api/mongodb";


let client

let mongooseConnection: typeof mongoose;


/**
 * Init connections to both driver
 * @return {Promise<MongoClient>}
 */
export async function connectDB() {
    console.log('f: connectDB:', mongooseConnection);
    console.log('db: URI:', dbUri);
    return await clientPromise;

    if (!mongoose.connections[0]?.readyState) {
        mongooseConnection = await mongoose.connect(dbUri, { useNewUrlParser: true });
    }
    const client = new MongoClient(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
    return await client.connect();
}
