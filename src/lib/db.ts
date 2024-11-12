import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
let isConnected = false;

export async function connectToDatabase() {
  try {
    if (!isConnected) {
      await client.connect();
      isConnected = true;
      console.log(
        "Successfully connected to MongoDB:",
        process.env.MONGODB_URI
      );
    }
    return client.db(process.env.MONGODB_DB);
  } catch (error) {
    console.error("Database connection failed. Exiting now...");
    console.error(error);
    process.exit(1);
  }
}
