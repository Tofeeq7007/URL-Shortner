import { axiosInstance } from "../services/urlServices";

export async function loginUser(email,password) {
  const {data} = await axiosInstance.post("/api/auth/login", {
    email: email,
    password:password
  });
  console.log(data);
  
  return data;
}
export async function registerUser(name,email,password) {
  const res = await axiosInstance.post("/api/auth/register", {
    name:name,
    email: email,
    password:password
  });
  console.log(res);
  
  return res.data;
}
export async function logoutUser(email="",password="") {
  const res = await axiosInstance.post("/api/auth/logout", {
    email: email,
    password:password
  });
  console.log(res);
  
  return res.data;
}
export const getCurrentUser = async ()=>{
  const {data} = await axiosInstance.get("/api/auth/me",{
    withCredentials:true
  });
  return data;
}
export const getAllUserUrls = async ()=>{
  const {data} = await axiosInstance.post("/api/user/urls");
  return data;
}