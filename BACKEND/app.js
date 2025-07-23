
// const express = require('express');
// const app = express();
import express from 'express'
import connectDb from './src/config/monogo.config.js';
import router from './src/routes/short_url.routes.js';
import dotenv from 'dotenv'
import { redirectFromShortUrl } from './src/controller/short_url.controller.js';
import cors from 'cors'
import authRoutes from './src/routes/auth.routes.js';
import User_router from './src/routes/user.routes.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL, // ⬅️ Replace with your frontend domain
  credentials: true               // ⬅️ Important for cookies
}));


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use("/api/create" , router);
app.use("/api/auth" , authRoutes);
app.use('/api/user' , User_router);
app.get('/test', (req, res) => {
  console.log("Cookies:", req.cookies);
  res.send("Check your console for cookies");
});

app.get("/:id", redirectFromShortUrl)
app.listen(process.env.PORT,()=>{
    connectDb();
    console.log("I am currently Port http://localhost:3000");
    
})

// GET - Redirection
// POST - Create short url