import jwt from 'jsonwebtoken';
import userSchema from '../Models/user.model.js'
import { createUser, findUserByEmail } from '../dao/auth.dao.js';
import dotenv from 'dotenv'
import { signToken } from '../utils/helper.js';
import bcrypt from 'bcrypt'
dotenv.config({path:"../.env"});

export const registerUser = async (name,email,password) =>{
    const user  = await findUserByEmail(email);
    if(user) throw new Error("User Already Exists");
    const newUser = await createUser(name,email,password);
    const token = signToken({id:newUser._id});
    return token;
}
export const loginUser = async (email,password) =>{
    // console.log(email);
    
    const user  = await findUserByEmail(email);
    // console.log(user);
    
 if (!user ) {
        console.log("User  hi nahi hai");
        throw new Error("Usetr nahi mila");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid Credentials");
    }
    
    const token = signToken({id:user._id});
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    return {token,user:userWithoutPassword};
}

