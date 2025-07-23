import axios from "axios";
export const axiosInstance = axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_URL}`,
    withCredentials:true
})
export async function createShortUrl(url,slug) {

  
  const res = await axiosInstance.post("/api/create", {
    url: url,
    slug:slug
  });
  
  return res.data;
}
