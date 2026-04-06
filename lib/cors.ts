import "dotenv/config";
import type {CorsOptions } from "cors";

const CorsOptions:CorsOptions={
    origin(requestOrigin,callback){
        if(requestOrigin&&process.env.CORS_WHITELIST?.includes(requestOrigin)){
            callback(null,true);
        }else{
            callback(null,true)
        }
    }
}


export default CorsOptions