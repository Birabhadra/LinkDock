import Express from "express";
import {authMiddleware} from "../middlewares/authMiddleware.js";
import * as linkController from "../controllers/linkController.js"
const router=Express.Router()

router.post('/generate',authMiddleware,linkController.generateLink);

router.get('/my-links',authMiddleware,linkController.getMyLinks)

router.put('/my-links/:id',authMiddleware,linkController.updateLink)

router.delete('/my-links/:id',authMiddleware,linkController.deleteLink)



export default router;