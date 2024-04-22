import { configDotenv } from "dotenv";
import mongoose, { Mongoose } from "mongoose";
configDotenv();

const dbUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/automation";

export async function DBconnection() {
  try {
    const connect = await mongoose.connect(dbUrl);
    if (connect) {
      console.log("Mongodb is connected");
    } else console.log("Mongodb is not connected");
  } catch (error) {
    console.log("Mongo DB Connection Error!", error);
  }
}
