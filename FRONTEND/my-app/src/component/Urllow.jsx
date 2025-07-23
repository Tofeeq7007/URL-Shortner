import { useState } from "react"
import { ShortendLink } from "./shortendlink";
import { createShortUrl } from "../services/urlServices";
import { useSelector } from "react-redux";
import { UserUrl } from "./UserUrls";
export function Abcd(){
    const [url , setUrl] = useState("");
    const [slug, setslug] = useState("");
    const [shorturl , setShorttUrl] = useState("");

    const auth = useSelector((state)=>state.auth);
    

    async function handleURL(){
        if(!url) return ;
        // console.log(url);
        
        try{
            const genratedUrl = await createShortUrl(url,slug);
            setShorttUrl(genratedUrl);
        }
        catch(error){
            console.error("Error :" , error);
        }
    }

    return (
        <div className="w-full h-[685px] bg-gradient-to-r  from-blue-400 to-green-400">
            <div className="flex  justify-center items-center  h-full w-full">
                <div className={`bg-white mx-10  max-md:mx-0 shadow-lg rounded-2xl p-10 ${auth.isAuthenticated ? 'w-[70%]' :'min-sm:w-96'}`}>

                    <h2 className="bg-white text-2xl font-semibold text text-center mb-6 text-gray-800">URL Shortner</h2>
                    <div className="mb-4">
                        <input
                            type="url"
                            value={url}
                            onChange={(e)=>setUrl(e.target.value)}
                            placeholder="Enter Url"
                            className="border border-gray-300 w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400 focus:border-transparent"
                        ></input>
                    </div>
                    {  auth.isAuthenticated && (
                        <>

                        <div className="font-semibold">Custom URL:</div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e)=>setslug(e.target.value)}
                                    placeholder="Enter Custom url"
                                    className="border border-gray-300 w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400 focus:border-transparent"
                                ></input>
                        </div>  
                        </>
                    )}    
                    <button className="bg-blue-500 w-full text-white py-2 rounded-md hover:bg-blue-600 trasnsitio" onClick={handleURL} >Shorten URL</button>
                    {shorturl && <ShortendLink shorturl={shorturl} />}
                   {auth.isAuthenticated && (<UserUrl/>)}
                </div>
            </div>
        </div>
    )
}