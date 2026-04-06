import { type RateLimitRequestHandler,type Options, type RateLimitReachedEventHandler, rateLimit } from "express-rate-limit";
import "dotenv/config"
type RateLimitType='basic'|'auth'|'passReset'


const defaultLimitOps:Partial<Options>={
    windowMs:parseInt(process.env.WINDOW_MS!),
    legacyHeaders:false,
    standardHeaders:true
}

const rateLimitOpt=new Map<string,Partial<Options>>([
    ['basic',{...defaultLimitOps,limit:100}],
    ['auth',{...defaultLimitOps,limit:10}],
    ['passReset',{...defaultLimitOps,limit:3}]
])

const expressRateLimit=(type:RateLimitType):RateLimitRequestHandler=>{
    return rateLimit(rateLimitOpt.get(type))
}
export default expressRateLimit;