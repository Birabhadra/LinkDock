import {HydratedDocument,Schema,model, Model} from "mongoose";
import bcrypt from "bcrypt";
interface IUser{
    name:string,
    email:string,
    password:string,
    role:"User"|"Admin",
    totalVisitCount:number,
    passwordResetToken:string|null,
    refreshToken:string|null,
    isActive:boolean
}
interface IUserMethods {
    comparePassword(password: string): Promise<boolean>;
}
type UserModel = Model<IUser, {}, IUserMethods>;
const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        select:false,
        trim:true
    },
    role:{
        type:String,
        default:"User"
    },
    totalVisitCount:{
        type:Number,
        default:0
    },
    passwordResetToken:{
        type:String,
        default:null,
        select:false
    },
    refreshToken:{
        type:String,
        default:null,
        select:false
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true

})


UserSchema.pre("save",async function (this: HydratedDocument<any>) {
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})
UserSchema.methods.comparePassword =async function (
    this: HydratedDocument<any>,
    password: string
): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};
const User = model<IUser, UserModel>("User", UserSchema);
export default User;