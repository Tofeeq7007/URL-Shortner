import React, { useState } from "react"
import { registerUser } from "../api/user.api";
export function RegisterForm({state}){
    const [name , setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        if(password.length < 6){
            setError('Password must be atleast 6 character long');
            return;
        }

        try {
            const data = await registerUser(name ,email, password);
            // Handle successful login (e.g., redirect or state update)
            console.log(data);
            state(true);
        } catch (err) {
            setError(err.message || 'Registration Failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };    
    return(
        <div className="w-full h-[685px] bg-gradient-to-r  from-blue-400 to-green-400">
            <div className="flex  justify-center items-center h-full px-4">
                <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md">

                    <h2 className="bg-white text-xl font-bold  text-center mb-6 text-gray-800">Create an Account</h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                            {error}
                        </div>
                    )}

                    <div className="font-medium">
                        <div className="mt-4">
                            <label className="font-medium">Full Name</label>
                            <input type="text" placeholder="Full Name" 
                            required
                            onChange={(e)=>setName(e.target.value)}
                            className="border border-gray-400 w-full
                            focus:outline-none
                            font-medium
                            cursor-pointer
                            px-4 py-1 rounded-md focus:ring
                            focus:ring-blue-400"></input>
                        </div>
                        <div className="mt-4">
                            <label className="font-medium">Email</label>
                            <input type="email"
                            onChange={(e)=>setEmail(e.target.value)}
                             placeholder="email" className="border border-gray-400 w-full
                            focus:outline-none
                            cursor-pointer
                            font-medium
                            px-4 py-1 rounded-md focus:ring
                            focus:ring-blue-400"
                            required></input>
                        </div>
                        <div className="mt-4">
                            <label className="font-medium">Password</label>
                            <input type="password" placeholder="*****************"
                            required
                            onChange={(e)=>setPassword(e.target.value)}
                             className="border 
                             cursor-pointer
                             border-gray-400 w-full
                            focus:outline-none
                            font-medium
                            px-4 py-1 rounded-md focus:ring
                            focus:ring-blue-400 focus:border-transparent"></input>
                        </div>
                        
                        <div className="mt-10 flex flex-col justify-center items-center">
                            <button onClick={handleSubmit} className="w-full p-2 bg-blue-600 hover:bg-blue-400 text-white transition rounded-md mb-2">Create Account</button>
                            <p>Already have an account? <span 
                            onClick={()=>state(true)}
                            className="text-blue-600 cursor-pointer underline">signin</span></p>
                        </div>
                    </div>

                </div>
            </div>
        </div>        
    );
}