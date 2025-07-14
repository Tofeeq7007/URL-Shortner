import express from 'express'
import { createShortUrl } from '../controller/short_url.controller.js';
import { authMiddleware } from '../middlware/auth.middleware.js';
import cookieParser from "cookie-parser";
const router = express.Router();
router.use(cookieParser());  // ✅ This populates req.cookies
router.post("/" ,authMiddleware,createShortUrl);
export default router;