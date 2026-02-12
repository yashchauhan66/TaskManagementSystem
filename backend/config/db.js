import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB=async()=>{
    const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/taskmanagement';
    try{
     await mongoose.connect(mongoUrl);
     console.log("MONGODB IS CONNECTED");
    }catch(err){
     console.log(err.message);
    }
}
export default connectDB;