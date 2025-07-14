import mongoose from "mongoose";
import crypto from 'crypto'
import bcrypt from 'bcrypt'
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,    
    },
    password:{
        type:String,
        require:true,   
    },
    avatar:{
        type:String,
        required:false,
    },
});



function getGravatarUrl(email){
    const hash = require('crypto')
                    .createHash("md5")
                    .update(email.trim().toLowerCase())
                    .digest('hex');
    return `https://www.gravtar.com/avatar/${hash}?d=mp`;
}
// Pre-save hook for automatic avatar generation
UserSchema.pre('save', function(next) {
    if (!this.isModified('avatar') && !this.avatar) {
        this.avatar = this.getGravatarUrl();
    }
    next();
});
// Instance method to generate Gravatar URL
UserSchema.methods.getGravatarUrl = function(size = 200) {
    if (!this.email) {
        return `https://www.gravatar.com/avatar/?d=mp&s=${size}`;
    }
    
    const hash = crypto
    .createHash("md5")
    .update(this.email.trim().toLowerCase())
        .digest('hex');
    
    return `https://www.gravatar.com/avatar/${hash}?d=mp&s=${size}`;
};

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