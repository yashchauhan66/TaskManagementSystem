import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const getUserData = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: "Server error" });
    }
};

export const Signup=async(req, res)=>{
    try{
    const {name ,email , password , role}=req.body;
    if (!name || !email || !password || !role){
        return res.status(400).json({message:"All fields are required"});
    }
    const userExit=await User.findOne({email});
    if(userExit){
        return res.status(409).json({message:"User already exists"});
    }
   const salt= await bcrypt.genSalt(10);
   const hashPassword= await bcrypt.hash(password, salt);
   const user= await User.create({
    name,
    email,
    password: hashPassword,
    role
   });
   res.status(201).json({
    user:{
        id:user._id,
        name:user.name,
        email:user.email,
    
    },
   });
}catch(err){
    return res.status(500).json(err.message);
}
}


export const Login=async(req ,res)=>{
    try{
    const {email , password}= req.body;
    if(!email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    const user= await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"User not found"});
    }
    
    const isMatch=await bcrypt.compare(password ,user.password );
   if(!isMatch){
    return res.status(400).json({message:"Incorrect password"});
   }

   const token =jwt.sign(
    {id: user._id , role: user.role},
    process.env.SECRET_KEY,
    {expiresIn: "1d"}
   );
   res.status(200).json({
    message:" Login Successful",
    token,
    user:{
        id: user._id,
        name:user.name,
        email:user.email,
    },
   });

} catch(err){
res .status(500).json({message:"server error"});
}
}

export const getUserById=async(req ,res)=>{
    try{
    const user=await User.findById(req.params.id).select('-password');
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    res.status(200).json({
        success:true,
        user
    });
}catch(err){
    res.status(500).json({message:err.message});
    }
};
