import { app } from "./index";
import { v2 as cloudnary } from "cloudinary";
import dotenv from "dotenv";
import connectDB from "./utils/db";

// Dotenv Configure
dotenv.config();

// Cloudnary
cloudnary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

// Listen
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
  connectDB();
});
