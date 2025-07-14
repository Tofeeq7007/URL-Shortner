import { Link,useNavigate } from "@tanstack/react-router"
import { useDispatch, useSelector } from "react-redux"
import {login,logout} from '../store/slice/authslice.js'
import { logoutUser } from "../api/user.api.js";
export const Navbar= ()=>{

    const auth  = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    function handle(){
        navigate({to:"/auth"})
    }
    async function handleLogout() {
        const data = await logoutUser()
        dispatch(logout());
    }
    return (
        <nav className=" items-center bg-gradient-to-r  from-blue-400 to-green-400 bg-gray-300 px-15 py-1 ">
            <div className="flex justify-between items-center mx-20">

            <ul>
                <li>
                    <Link to='/' className="text-xl font-serif cursor-pointer">URL Shortner</Link>
                </li>
            </ul>
            <ul>
                <li>
                   {!auth.isAuthenticated && (<button className="bg-blue-500 px-4 py-2 rounded-md  text-white font-se hover:bg-blue-600 transition active:scale-110 text-lg" onClick={handle}>Login</button>)}
                   {auth.isAuthenticated && (<button className="bg-blue-500 px-4 py-2 rounded-md  text-white font-se hover:bg-blue-600 transition active:scale-110 text-lg" onClick={handleLogout}>Logout</button>)}
                </li>
            </ul>
            </div>
        </nav>
    )
}