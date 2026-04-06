import Express from "express";
import {authMiddleware} from "../middlewares/authMiddleware.js";
import expressRateLimit from "../lib/rateLimit.js";
const router=Express.Router()
import * as authContoller from '../controllers/authController.js'
router.post('/register',expressRateLimit(`passReset`),authContoller.register)
router.post('/login',expressRateLimit('auth'),authContoller.login)
router.delete('/logout',expressRateLimit('basic'),authMiddleware,authContoller.logout)
router.get('/refresh-token',expressRateLimit('basic'),authContoller.refreshToken)
router.post('/forgot-password',expressRateLimit('auth'),authContoller.forgotPass)
router.post('/reset-password',expressRateLimit('auth'),authContoller.resetPass)
export default router;