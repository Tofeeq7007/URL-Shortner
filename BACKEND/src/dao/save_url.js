import urlSchema from "../Models/shorturl.model.js";

export const saveShortUrl = async(url, nano_shortUrl, userId)=>{
    const newUrl = new urlSchema({
        full_url:url,
        short_url:nano_shortUrl
    })
    if(userId){
        newUrl.user  = userId;
    }
    newUrl.save(); // ye call hoga tho hi mongoDB mai data save hoga    
    console.log("Save data");
};

export const getShortUrl = async(short_url) =>{
    return await urlSchema.findOneAndUpdate({short_url:short_url},{$inc:{clicks:1}});
}
export const getCustomShortUrl = async(slug) =>{
    return await urlSchema.findOne({short_url:slug});
}