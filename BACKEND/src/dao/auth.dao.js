import urlSchema from "../Models/shorturl.model.js"
import userSchema from "../Models/user.model.js"

export const findUserByEmail = async (email)=>{
    return await userSchema.findOne({email})
}
export const findUserById = async (id)=>{
    return await userSchema.findOne({id})
}
export const createUser = async (name,email,password)=>{
    
    const newuser = new userSchema({
        name:name,
        email:email,
        password:password
    });
    await newuser.save();
    
    return newuser;
}
export const getShortUrls = async(id)=>{
    return urlSchema.find({user:id});
}