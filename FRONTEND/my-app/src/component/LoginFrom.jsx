import React, { useState } from "react";
import { Mail, Lock, AlertCircle, Loader } from "lucide-react";
import { loginUser } from "../api/user.api";
import { useDispatch } from "react-redux";
import { login } from '../store/slice/authslice.js';
import { useNavigate } from '@tanstack/react-router';

export function LoginForm({ state }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data = await loginUser(email, password);
            dispatch(login());
            navigate({ to: '/dashboard' });
        } catch (err) {
            setError(err.response?.data?.message || 'Login Failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Lock className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-slate-400 text-sm">Sign in to your account to continue</p>
                </div>

                {/* Form Card */}
                <div onSubmit={handleSubmit} className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
                    
                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                            <p className="text-red-300 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Email Field */}
                    <div className="mb-5">
                        <label className="block text-sm font-semibold text-slate-200 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-semibold text-slate-200">Password</label>
                            <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition">Forgot password?</a>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-lg"
                    >
                        {loading ? (
                            <>
                                <Loader className="w-4 h-4 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-slate-700"></div>
                        <span className="text-xs text-slate-400">New to our platform?</span>
                        <div className="flex-1 h-px bg-slate-700"></div>
                    </div>

                    {/* Register Link */}
                    <p className="text-center text-slate-300 text-sm">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            onClick={() => state(false)}
                            className="text-blue-400 font-semibold hover:text-blue-300 transition"
                        >
                            Create account
                        </button>
                    </p>
                </div>

                {/* Footer Text */}
                <p className="text-center text-xs text-slate-500 mt-6">
                    By signing in, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
}