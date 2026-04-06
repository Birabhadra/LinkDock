import { Request,Response} from "express";
import User from "../models/user.model.js";
import "dotenv/config"

export const getCurrentUser=async(req:Request,res:Response)=>{
    try{
        const userId=req.userId
        const user=await User.findOne({_id:userId}).select("+__v")
        if (!user){
            return res.status(400).json({
                message:"User not found"
            })
        }
        return res.status(200).json({
            user:user
        })

    }catch(error:any){
        console.log("Unexpected error occured ",error)
        return res.status(400).json({
            message:`Unexpected error ${error.message}`
        })
    }
}

export const deleteCurrentUser=async(req:Request,res:Response)=>{
    try{
        const userId=req.userId
        await User.findOneAndUpdate({_id:userId},{isActive:false})
        res.status(200).json({
            message:"User deleted successfully"
        })
        
    }catch(error:any){
        console.log("Unexpected error occured ",error)
        return res.status(400).json({
            message:`Unexpected error ${error.message}`
        })
    }
}


export const updateCurrentUser=async(req:Request,res:Response)=>{
    try{
        const userId=req.userId
        const user=await User.findOne({_id:userId}).select("+password")
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const {name,current_pass,new_pass}=req.body;
        const isValid=await user.comparePassword(current_pass)
        if (!isValid){
            return res.status(400).json({
                message:"Invalid password"
            })
        }
        user.password=new_pass||user.password;
        user.name=name||user.name;
        await user.save()
        return res.status(200).json({
            message:"User updated successfully"
        })        

    }catch(error:any){
        console.log("Unexpected error occured ",error)
        return res.status(400).json({
            message:`Unexpected error ${error.message}`
        })
    }
}