import express from 'express'
import { getAllUserUrls } from '../controller/user.contorller.js';
import { auth_me } from '../middlware/authme.js';
const User_router = express.Router();
User_router.post("/urls",auth_me, getAllUserUrls)

export default User_router;