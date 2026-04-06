import "dotenv/config"
import { Request,Response} from "express";
import Link from "../models/link.model.js";
import { isValidUrl,generateBackHalf } from "../helpers/linkServiceHelpers.js";
import User from "../models/user.model.js";
export const generateLink=async(req:Request,res:Response)=>{
    try{
        const {title,destination,backhalf=generateBackHalf()}=req.body;
        const userId=req.userId
        if (!title||!destination||!backhalf){
            return res.status(400).json({
                message:"Title,destination and backhalf are required"
            })
        }
        if (!isValidUrl(destination)){
            return res.status(401).json({
                message:"Invalid URL please check again"
            })
        }
        const checkBackhalf=await Link.findOne({backhalf})
        if (checkBackhalf){
            return res.status(400).json({
                message:"URL is already in use please select any other email"
            })
        }
        const link=await Link.create({
            title,
            destination,
            backhalf,
            shortLink:`${process.env.CLIENT_ORIGIN}/${backhalf}`,
            creator:userId
        })
        
        return res.status(200).json({
            link
        })
        

    }catch(error:any){
        console.log("Unexpected error occured ",error)
        return res.status(400).json({
            message:`Unexpected error ${error.message}`
        })        
    }
}

export const getMyLinks=async(req:Request,res:Response)=>{
    try{
        const userId=req.userId
        const links=await Link.find({creator:userId})
        return res.status(200).json({
            links:links
        })
    }catch(error:any){
        console.log("Unexpected error occured ",error)
        return res.status(400).json({
            message:`Unexpected error ${error.message}`
        })        
    }
}

export const updateLink=async(req:Request,res:Response)=>{
    try{
        const {linkId}=req.params;
        if (!linkId){
            return res.status(400).json({
                message:"Link id is required"
            })
        }
        const {title,destination}=req.body
        if (!title && !destination){
            return res.status(400).json({
                message:"No parameters selected to update"
            })
        }
        const link=await Link.findOne({_id:linkId});
        if (!link){
            return res.status(400).json({
                message:"No Link found with this ID"
            })
        }
        if (link.creator!==req.userId){
            return res.status(403).json({
                message:"You are not authorized to edit"
            })
        }
        link.title=title||link.title
        link.destination=destination||link.destination
        await link.save()
        return res.status(200).json({
            message:"Link updated successfully",
            link
        })


    }catch(error:any){
        console.log("Unexpected error occured ",error)
        return res.status(400).json({
            message:`Unexpected error ${error.message}`
        })        
    }
}

export const deleteLink=async(req:Request,res:Response)=>{
    try{
        const {linkId}=req.params;
        if (!linkId){
            return res.status(400).json({
                message:"Link id is required"
            })
        }
        const link=await Link.findOne({_id:linkId});
        if (!link){
            return res.status(400).json({
                message:"No Link found with this ID"
            })
        }
        if (link.creator!==req.userId){
            return res.status(403).json({
                message:"You are not authorized to edit"
            })
        }
        await link.deleteOne({_id:linkId})
        return res.status(200).json({
            message:"Link deleted successfully"
        })
        


    }catch(error:any){
        console.log("Unexpected error occured ",error)
        return res.status(400).json({
            message:`Unexpected error ${error.message}`
        })

    }
}