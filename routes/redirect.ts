import Express from "express";
import expressRateLimit from "../lib/rateLimit.js";
import * as redirectController from "../controllers/redirectController.js"
const router=Express.Router()

router.get('/:backHalf',expressRateLimit('basic'),redirectController.redirect)

export default router;
