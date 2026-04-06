import Express,{Request,Response} from "express";
import authRouter from "./auth.js"
import userRouter from './user.js'
import linkRouter from "./link.js"
import redirectRouter from "./redirect.js"
import expressRateLimit from "../lib/rateLimit.js";
const router=Express.Router()
router.get('/health',(req:Request,res:Response)=>{
    return res.status(200).json("OK")
})


router.use('/auth',authRouter)
router.use('/user',expressRateLimit('basic'),userRouter)
router.use('/link',expressRateLimit('basic'),linkRouter)

router.use('/',redirectRouter)
export default router;