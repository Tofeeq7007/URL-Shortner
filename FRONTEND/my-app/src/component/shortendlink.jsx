import { useState } from "react";
import { MdContentCopy } from "react-icons/md";

export function ShortendLink({shorturl}){
    const [copied, setCopied] = useState(false);
    function handleCopy(){
        navigator.clipboard.writeText(shorturl);
        setCopied(true);
        setTimeout(()=>setCopied(false),2000);
    }
    return (
        <div className="flex flex-col">
        
            <div className="mt-4 font-semibold">Your Short URL:</div>
            <div className="bg-green-100
            mt-4 p-3  flex justify-between">
                <a
                    href={shorturl}
                    target="_blank"
                    className="text-blue-600 max-[375px]:overflow-hidden underline"
                >
                    {shorturl}
                </a>
                <div>
                {!copied && (
                    <MdContentCopy className="cursor-pointer max-sm:hidden text-2xl" onClick={handleCopy}/>
                )}
                {copied && (
                    <span className="text-green-600 text-xs mt-1 animate-bounce">Copied!</span>
                )}
                </div>
            </div>
        </div>
    )
}