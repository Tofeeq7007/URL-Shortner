import mongoose from "mongoose";

const Schema = mongoose.Schema

const shortUrlSchema = new Schema({
    full_url: {
        type:String,
        require:true
    },
    short_url:{
        type:String,
        require:true,
        index:true,
        unique:true
    },
    clicks:{
        type:Number,
        require:true,
        default:0,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref: "User",
    },  
       
});

const urlSchema = mongoose.model("shortUrl" , shortUrlSchema);

export default urlSchema;
