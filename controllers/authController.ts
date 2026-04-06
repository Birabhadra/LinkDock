import { Request,Response} from "express";
import User from "../models/user.model.js";
import "dotenv/config"
import { sendWelcomeEmail,sendPassResetEmail,sendPassResetSuccessEmail} from "../lib/nodemailer.js";
import { generateAccessToken,generateRefreshToken,verifyRefreshToken,generateForgotPassToken,verifyForgetPassToken} from "../lib/jwt.js";

export const register=async(req:Request,res:Response)=>{
    try{
        const {name,email,password}=req.body
        if (!name||!email||!password){
            return res.status(400).json({
                message:"Name  email and password are required"
            })
        }
        if (req.body.role){
            if (req.body.role=="Admin" && !process.env.WHITELISTED_EMAILS!.includes(email)){
                return res.status(400).json({
                    message:"You are not authorized to create an admin account"
                })
            }
        }
        const checkUser=await User.find({email:email})
        if (checkUser){
            return res.status(400).json({
                message:"User already exists Please Login"
            })
        }
        const refreshToken=await generateRefreshToken({email:email})
        const newUser=new User({
            name,
            email,
            password,
            role:req.body.role||"User",
            refreshToken:refreshToken!              
        })
        await newUser.save()
        const accessToken=generateAccessToken({userId:newUser._id})
        res.cookie('refreshToken',refreshToken,{
            maxAge:60*60*24,
            // secure:true
        })
        res.status(200).json({
            user:newUser,
            accessToken:accessToken
        })
        await sendWelcomeEmail(email)
    }catch(error:any){
        console.log("Unexpected error occured ",error)
        return res.status(400).json({
            message:`Unexpected error ${error.message}`
        })
    }

}

export const login=async(req:Request,res:Response)=>{
    try{
        const {email,password}=req.body
        if (!email||!password){
            return res.status(401).json({
                message:"Email and password are required"
            })
        }
        const findUser=await User.findOne({email:email}).select("+password")
        if (!findUser){
            return res.status(401).json({
                message:"User not found please Register"
            })
        }
        const isValid=await findUser.comparePassword(password)
        if(!isValid){
            return res.status(403).json({
                message:"Unauthorized.Incorrect Password"
            })
        }
        const accessToken=await generateAccessToken({userId:findUser._id})
        const refreshToken=await generateRefreshToken({email:email})
        findUser.refreshToken=refreshToken!
        const updatedUser=await findUser.save()
        res.cookie('refreshToken',refreshToken,{
            maxAge:60*60*24,
            // secure:true
        })
        res.status(200).json({
            updatedUser,
            accessToken
        })


    }catch(error:any){
        console.log("Unexpected error occured ",error)
        return res.status(400).json({
            message:`Unexpected error ${error.message}`
        })
    }
}

export const logout=async(req:Request,res:Response)=>{
    try{
        const userId=req.userId
        await User.updateOne({_id:userId},{refreshToken:null})

        res.clearCookie('refreshToken',{
            maxAge:60*60*24,
            // secure:true
        })
        res.sendStatus(204)

    }catch(error:any){
        console.log("Unexpected error occured ",error)
        return res.status(400).json({
            message:`Unexpected error ${error.message}`
        })
    }
}

export const refreshToken=async(req:Request,res:Response)=>{
    try{
        const {refreshToken}=req.cookies
        if (!refreshToken){
            return res.status(401).json({
                message:"Unauthorized please login to continue"
            })
        }
        const {email}=verifyRefreshToken(refreshToken)
        const user=await User.findOne({email:email})
        if (!user) {
            throw new Error("User not found");
        }
        const accessToken=generateAccessToken({userId:user._id})
        res.status(200).json({
            accessToken
        })
        
    }catch(error:any){
        console.log("Unexpected error occured ",error)
        return res.status(400).json({
            message:`Unexpected error ${error.message}`
        })
    }

}

export const forgotPass=async(req:Request,res:Response)=>{
    try{
        const{email}=req.body
        if(!email){
            return res.status(400).json({
                message:"Email is required"
            })
        }
        const user=await User.findOne({email}).select('+passwordResetToken')
        if (!user){
            return res.status(400).json({
                message:"User doesn't exists"
            })
        }
        const forgotPassToken=await generateForgotPassToken({email})
        user.passwordResetToken=forgotPassToken
        await user.save()
        const url=`${process.env.CLIENT_ORIGIN}/reset-password?token=${forgotPassToken}`
        await sendPassResetEmail(email,user.name,url)


        return res.sendStatus(204)
    }catch(error:any){
        console.log("Unexpected error occured ",error)
        return res.status(400).json({
            message:`Unexpected error ${error.message}`
        })
    }
}

export const resetPass=async(req:Request,res:Response)=>{
    try{
        const {token}=req.params
        const {password}=req.body
        if (!token){
            return res.status(403).json({
                message:"Link is invalid"
            })
        }
        if (!password){
            return res.status(400).json({
                message:"New password is required"
            })
        }
        if (typeof token !== "string") {
            return res.status(400).json({ message: "Invalid token" });
        }
        const {email}=verifyForgetPassToken(token)
        const user=await User.findOne({email}).select("+password +passwordResetToken")
        if (!user){
            return res.status(400).json({
                message:"User doesn't exists"
            })
        }
        if (user.passwordResetToken==null || token!==user.passwordResetToken){
            return res.status(400).json({
                message:"This token is already used"
            })
        }
        user.password=password
        user.passwordResetToken=null
        await user.save()
        await sendPassResetSuccessEmail(user?.email,user?.name)
        return res.status(200).json({
            message:"Password updated successfully"
        })
    }catch(error:any){
        console.log("Unexpected error occured ",error)
        return res.status(400).json({
            message:`Unexpected error ${error.message}`
        })
    }
}