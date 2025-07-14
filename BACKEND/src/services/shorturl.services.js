import { getCustomShortUrl, saveShortUrl } from "../dao/save_url.js";
import urlSchema from "../Models/shorturl.model.js";
import { genrateNanoId } from "../utils/helper.js";

export const createShortUrlWithoutUser = async(url)=>{
    // console.log(url);
    
    const nano_shortUrl = genrateNanoId(7);
    await saveShortUrl(url,nano_shortUrl);
    return nano_shortUrl;
}
export const createShortUrlWithUser = async(url,userId,slug=null)=>{ // slug let  customUrl
    const nano_shortUrl = slug ? slug : genrateNanoId(7);
    const exists = await getCustomShortUrl(slug);
    if(exists) throw new Error("This custom url already exists")
    await saveShortUrl(url,nano_shortUrl,userId);
    return nano_shortUrl;
}