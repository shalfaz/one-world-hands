import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error(
      "MongoDB connection string is not configured. Set MONGO_URI or MONGODB_URI in your environment."
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
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

export { connectToDatabase };
export default connectToDatabase;
