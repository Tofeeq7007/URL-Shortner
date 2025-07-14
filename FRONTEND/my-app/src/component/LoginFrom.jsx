import React, { useState } from "react";
import { loginUser } from "../api/user.api";
import { useDispatch, useSelector } from "react-redux";
import {login} from '../store/slice/authslice.js'
import {useNavigate} from '@tanstack/react-router'
export function LoginForm({state}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const auth = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data = await loginUser(email, password);
            // Handle successful login (e.g., redirect or state update)
            dispatch(login())
            navigate({to:'/dashboard'})
        } catch (err) {
            setError(err.response?.data?.message || 'Login Failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-screen bg-gray-100">
            <div className="flex justify-center items-center h-full px-4">
                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md">
                    <h2 className="text-xl font-bold text-center mb-6 text-gray-800">Login User</h2>
                    
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                            {error}
                        </div>
                    )}

                    <div className="font-medium">
                        <div className="mt-4">
                            <label className="font-medium block mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border border-gray-400 w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <label className="font-medium block mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border border-gray-400 w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                                required
                            />
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition"
                                disabled={loading}
                            >
                                {loading ? "Signing in..." : "Sign In"}
                            </button>
                            <p className="mt-3 text-center">
                                Don't have an account?{" "}
                                <span onClick={()=>state(false)} className="text-blue-600 underline cursor-pointer">Register</span>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}