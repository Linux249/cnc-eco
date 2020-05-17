import { MongoClient } from 'mongodb';

export const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

/**
 * Init connections to both driver
 * @return {Promise<MongoClient>}
 */
export async function connectDB() {
    const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = await client.connect();

    // mongoose.Promise = global.Promise;
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true });

    return db;
}
