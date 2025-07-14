export const CustomUrl = ()=>{
    return (
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
    )
}