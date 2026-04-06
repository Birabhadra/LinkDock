import mongoose,{Schema,model,Types} from "mongoose";

export interface ILink{
    title:string,
    destination:string,
    backhalf:string,
    shortLink:string,
    creator:Types.ObjectId,
    totalVisitCount:number,

}

const linkSchema=new Schema<ILink>({
    title:{
        type:String,
        required:true,
        trim:true
    },
    destination:{
        type:String,
        required:true,
        trim:true
    },
    backhalf:{
        type:String,
        required:true,
        trim:true
    },
    shortLink:{
        type:String,
        required:true,
        trim:true
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
        trim:true
    },
    totalVisitCount:{
        type:Number,
        default:0
    },


},{
    timestamps:true
})

const Link=model<ILink>('Link',linkSchema)
export default Link