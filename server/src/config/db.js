import mongoose from "mongoose";
import { config } from "dotenv";
config()
mongoose.set("strictQuery", true);

export const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.DB_URL);
    console.log(`mongoDB connected:${con.connection.host+" "+ con.connection.name}`);
  } catch (err) {
    console.log(err);
  }
};


