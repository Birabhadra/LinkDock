import jwt from "jsonwebtoken";
import "dotenv/config";
import type { Types } from "mongoose";
import { JwtPayload } from "jsonwebtoken";

export type TokenPayload = {
    userId: Types.ObjectId
}
export type refreshTokenPayload = {
    email: string
}
export type ResetLinkPayload = {
    email: string
}
const generateAccessToken = async (payload: TokenPayload) => {
    const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
        expiresIn: '30m'
    })
    return token
}
const generateRefreshToken = async (payload: refreshTokenPayload) => {
    const token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' })
    return token
}
const generateForgotPassToken = async (payload: refreshTokenPayload) => {
    const token = jwt.sign(payload, process.env.JWT_PASSRESET_SECRET!, { expiresIn: '1h' })
    return token
}
const verifyAccessToken = (token: string): TokenPayload => {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as TokenPayload;
};
const verifyRefreshToken = (token: string): refreshTokenPayload => {
    return jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET!
    ) as refreshTokenPayload;
};
const verifyForgetPassToken = (resetToken: string): refreshTokenPayload => {
    return jwt.verify(resetToken, process.env.JWT_PASSRESET_SECRET!) as refreshTokenPayload;
};
export { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken,
    generateForgotPassToken,verifyForgetPassToken
 }