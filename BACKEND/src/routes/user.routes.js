import express from 'express'
import { authMiddleware } from '../middlware/auth.middleware.js';
import { getAllUserUrls } from '../controller/user.contorller.js';
import cookieParser from "cookie-parser";
import { auth_me } from '../middlware/authme.js';
const User_router = express.Router();
User_router.use(cookieParser())
User_router.post("/urls",auth_me, getAllUserUrls)

export default User_router;