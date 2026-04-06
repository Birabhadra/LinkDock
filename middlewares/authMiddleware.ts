import type { Response,Request,NextFunction } from "express";
import User from "../models/user.model.js"
import { verifyAccessToken } from "../lib/jwt.js";

const authMiddleware=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {authorization}=req.headers;
        if (!authorization){
            return res.status(401).json({
                message:"Please login to continue"
            })
        }
        const accessToken=authorization.split(' ')[1]
        const{userId}=verifyAccessToken(accessToken)
        
        req.userId=userId
        const user=await User.findOne({_id:userId})
        if (!user||user.isActive==false){
            return res.status(403).json({
                message:"User not found"
            })
        }
        req.user=user
        next()
    }catch(error){
        console.log(error);
        return res.status(401).json({
            message:"Invalid access Token"
        })
    }
}
export {
    authMiddleware
}