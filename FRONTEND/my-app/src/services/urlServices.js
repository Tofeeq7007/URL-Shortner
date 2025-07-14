import axios from "axios";
export const axiosInstance = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})
export async function createShortUrl(url,slug) {

  
  const res = await axiosInstance.post("/api/create", {
    url: url,
    slug:slug
  });
  
  return res.data;
}
