import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://miryalasathvika:hhHymBwvh3ePHHfH@cluster0.snmrt3o.mongodb.net/food-del").then(()=>{
        console.log("MongoDB connected successfully");
    })
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};



