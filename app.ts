import express,{Request,Response} from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import CorsOptions from "./lib/cors.js";
import cors from "cors"
import indexRouter from "./routes/index.js"
import {connectDB,disconnectDatabase} from "./lib/mongoose.js"
const PORT=process.env.PORT||3000
const app=express()
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true}));
app.use(helmet())
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`))
app.use(compression())
app.use(cors(CorsOptions))


app.get('/health',(req:Request,res:Response)=>{
    return res.status(200).json("OK")
})

app.use('/api',indexRouter)

const serverTermination=async(signal:NodeJS.Signals):Promise<void>=>{
    try{
        console.log("Server is shutting down");
        disconnectDatabase()
        process.exit(0);
    }catch(err:any){
        console.log("Error occured",err.message)
    }
    
}

process.on("SIGINT",serverTermination)
process.on("SIGTERM",serverTermination)


app.listen(PORT,()=>{
    console.log(`app listening on http://localhost:${PORT}`)
    connectDB()
})
