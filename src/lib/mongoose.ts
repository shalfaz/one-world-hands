import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGO_URI environment variable inside .env.local");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    // Provide a clearer error message for connection failures
    if (e && (e as any).name === "MongooseServerSelectionError") {
      throw new Error(
        `Could not connect to MongoDB at ${MONGODB_URI.split("@").pop() || MONGODB_URI}: ${
          (e as Error).message
        }`
      );
    }

    throw e;
  }

  return cached.conn;
}

export default connectToDatabase;
