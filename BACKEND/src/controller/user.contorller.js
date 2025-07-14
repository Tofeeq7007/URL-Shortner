import { getShortUrls } from "../dao/auth.dao.js"

export const getAllUserUrls = async(req,res)=>{
    const {_id} = req.user
    
    const urls = await getShortUrls(_id);
    res.status(200).json({message:"success",urls});
}