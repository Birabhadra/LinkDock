import { Types } from "mongoose";
import type IUser from "../models/user.model.ts"
declare global {
  namespace Express {
    interface Request {
      userId?: Types.ObjectId;
      email?:string,
      user:Iuser
    }
  }
}