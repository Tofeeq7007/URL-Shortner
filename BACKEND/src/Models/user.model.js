import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,    
    },
    password:{
        type:String,
        required:true,   
    },
    avatar:{
        type:String,
        required:false,
        default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",        
    },
});




// Virtual for public profile (excludes sensitive data)
UserSchema.virtual('publicProfile').get(function() {
    return {
        name: this.name,
        email: this.email,
        avatar: this.avatar,
        createdAt: this.createdAt
    };
});
//
UserSchema.pre('save', async function(next) {

    if (!this.isModified('password')) return next();
    try {
        this.password = await bcrypt.hash(this.password, 12);
        next();
    } catch (err) {
        next(err);
    }
});

const userSchema = mongoose.model("User",UserSchema);

export default userSchema;