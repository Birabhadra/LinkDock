import "dotenv/config"
import { Request,Response} from "express";
import Link from "../models/link.model.js";
import User from "../models/user.model.js";
export const redirect=async(req:Request,res:Response)=>{
    try{
        const {backHalf}=req.params
        if (!backHalf){
            return res.status(400).json({
                message:"Invalid url"
            })
        }
        const link=await Link.findOne({backhalf:backHalf})
        if (!link){
            return res.status(400).json({
                message:"Invalid URL"
            })
        }
        link.totalVisitCount++;
        const user=await User.findOne({_id:link.creator})
        if (!user){
            return res.status(400).json({
                message:"no creator found"
            })
        }
        user.totalVisitCount++;
        await link.save()
        await user.save()
        res.redirect(
            link.destination.startsWith('https://')?link.destination:`https://${link.destination}`
        )


    }catch(error:any){
        console.log("Unexpected error occured ",error)
        return res.status(400).json({
            message:`Unexpected error ${error.message}`
        })
    }

}