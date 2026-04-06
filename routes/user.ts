import Express from "express";
import {authMiddleware} from "../middlewares/authMiddleware.js";
import * as userController from "../controllers/userController.js"
const router=Express.Router()

router.get('/me',authMiddleware,userController.getCurrentUser);

router.delete('/me',authMiddleware,userController.deleteCurrentUser);

router.put('/me',authMiddleware,userController.updateCurrentUser)


export default router;