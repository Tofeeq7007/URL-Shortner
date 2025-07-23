import { getShortUrl } from "../dao/save_url.js";
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/shorturl.services.js";
import { genrateNanoId } from "../utils/helper.js";
import dotenv from "dotenv";
dotenv.config({path:"../.env"});

function isValidHttpUrl(string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}
export const createShortUrl = async(req,res)=>{
  
  const {url,slug} = req.body;
  
  if(!isValidHttpUrl(url)) return res.status(404).send("wrong Url")
  
    if(req.user){
      console.log("user hai");
      console.log(slug);
      
      
      const shorturl = await createShortUrlWithUser(url,req.user._id,slug);
    res.send(process.env.APP_URL + shorturl);
    }
    else{
      const shorturl = await createShortUrlWithoutUser(url);      
      res.send(process.env.APP_URL + shorturl);
    }
   
}
export const createShortUrlAuth = async(req,res)=>{
  const {url} = req.body;
  if(!isValidHttpUrl(url)) return res.status(404).send("wrong Url")
  const shorturl = await createShortUrlWithUser(url,req.user._id);
  res.send(process.env.APP_URL + shorturl);
}

export const redirectFromShortUrl = async(req,res)=>{
    const {id} = req.params;
    const url = await getShortUrl(id)
    res.redirect(url.full_url);
}
// export const createCustomShortUrl = async(req,res)=>{
//   const {url, slug} = req.body;
//     if(!isValidHttpUrl(url)) return res.status(404).send("wrong Url")
//     const shorturl = await createShortUrlWithUser(url,req.user._id);
//     res.send(process.env.APP_URL + shorturl);

// }