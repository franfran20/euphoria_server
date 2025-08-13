import mongoose from "mongoose";
import config from "../config";

const connectToDB = async () => {
  console.log("Connecting To DB...");
  await mongoose.connect(config.mongoURI);
};

export { connectToDB };
