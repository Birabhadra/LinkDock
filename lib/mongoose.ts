import mongoose from "mongoose";
import "dotenv/config"
import { loggers } from "winston";

const DB_URL=process.env.MONGODB_URL

if (!DB_URL){
    throw new Error("Database url is not ste in environment variables");

}
export const connectDB=async()=>{
    try{
        await mongoose.connect(DB_URL);
        console.log("Database connected successfully");

    }catch(error){
        console.log("Database connection failed",error);
    }
}

export const disconnectDatabase=async():Promise<void>=>{
    try{
        await mongoose.disconnect();
        console.log("Database disconnected successfully")
    }catch(err:any){
        console.error("error during disconnecting ")
    }
}
