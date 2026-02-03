import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import auth from "./middleware/authMiddleware.js";
import cors from "cors";
import taskRoute from "./routes/taskRoute.js";
import userRoute from "./routes/userRoute.js";

const router=express.Router();
const app=express();
app.use(cors());
app.use(express.json());


app.get("/",async(req ,res)=>{
    res.send("hello");
});

connectDB();

app.use("/api/v1" ,  userRoute);
app.use("/task" , taskRoute);
app.listen(5000 ,()=>{
    console.log("server is running in 5000");
});
