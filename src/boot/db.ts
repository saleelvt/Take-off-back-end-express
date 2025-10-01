import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const db = async () => {
  try {
    const mongoosURL: any = process.env.mongoosURL;

    await mongoose.connect(mongoosURL.trim());
    console.log(" connect it done");
  } catch (error) {
    console.error("Db cnnection failed");
    console.error(error);
    process.exit(1);
  }
};
