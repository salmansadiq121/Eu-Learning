import mongoose from "mongoose";
require("dotenv").config();

const dbUrl: string = process.env.MONGO_URL || "";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbUrl);
    console.log(
      `Connected to MongoDB DataBase successfully! ${conn.connection.host} `
    );
  } catch (error: any) {
    console.log(error);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
