import mongoose from "mongoose";


const db = async () => {
  try {
    await mongoose.connect("mongodb+srv://girisujata110_db_user:test@cluster0.3h2omiu.mongodb.net/dbtest");

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection failed:", error.message);
  }
};

export default db;
