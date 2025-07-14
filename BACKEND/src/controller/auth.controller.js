import { cookieOption } from "../config/config.js";
import { loginUser, registerUser } from "../services/auth.service.js";
import wrapAsync from "../utils/helper.js";

export async function register(req,res){

    const {name ,email,password} = req.body;
    
    const token = await registerUser(name,email,password);
    res.cookie("accessToken", token , cookieOption);
    res.status(200).json({
        message:"register success"
    });
}

export async function login(req,res){
    const {email ,password} = req.body;
    // console.log(email);
    // console.log(password);
    
    // console.log(email);
    // console.log(typeof(email));
    // console.log(typeof(password));
    
    // console.log(password);
    
    const {token,user }= await loginUser(email,password);
    // console.log(user);
    
    
    res.cookie("accessToken", token,cookieOption);
    res.status(200).json({
        user:user,
        message:"login success"
    });
}

export  const get_current_user = wrapAsync(async (req,res)=>{
    res.status(200).json({user:req.user});
})
export function logout(req, res) {
  res.clearCookie("accessToken", { // must match the name used in res.cookie
    httpOnly: true,                // must match how it was originally set
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/"
  });
  return res.status(200).json({ message: "Logged out successfully" });
};