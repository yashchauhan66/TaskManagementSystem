import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const auth=async(req ,res , next)=>{

 const authHeader= req.headers.authorization;
 if (!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(401).json({message:"Token invalid"});
 }
 const token= authHeader.split(" ")[1];
try{
    const decoded= jwt.verify(token , process.env.SECRET_KEY);
    req.user= decoded;
    next();
}catch(err){
    res.status(500).json({message:" authentication failed"})
}
};
export default auth;