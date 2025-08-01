import mongoose from "mongoose";

export const connectDB = async (mongoUri: string) => {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
