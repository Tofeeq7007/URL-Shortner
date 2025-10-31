import React, { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../store/slice/authslice.js';
import { logoutUser } from "../api/user.api.js";
import { Menu, X, LogOut, LogIn, Zap } from "lucide-react";

export const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () => {
        navigate({ to: "/auth" });
        setMobileMenuOpen(false);
    };

    const handleLogout = async () => {
        try {
            await logoutUser();
            dispatch(logout());
            navigate({ to: "/" });
            setMobileMenuOpen(false);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg group-hover:shadow-lg transition-shadow">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white hidden sm:inline">
                            URL Shortner
                        </span>
                        <span className="text-xl font-bold text-white sm:hidden">
                            Shortner
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link 
                            to="/" 
                            className="text-slate-300 hover:text-white transition-colors font-medium text-sm"
                        >
                            Home
                        </Link>
                        
                        {auth.isAuthenticated && (
                            <>
                                <Link 
                                    to="/profile" 
                                    className="text-slate-300 hover:text-white transition-colors font-medium text-sm"
                                >
                                    Profile
                                </Link>
                            </>
                        )}

                        {/* Auth Button */}
                        <div className="border-l border-slate-700 pl-6">
                            {!auth.isAuthenticated ? (
                                <button
                                    onClick={handleLogin}
                                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                    <LogIn className="w-4 h-4" />
                                    Sign In
                                </button>
                            ) : (
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 px-4 py-2 rounded-lg font-medium transition-all duration-200 border border-red-500/30"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 hover:bg-slate-700 rounded-lg transition-colors text-white"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-slate-800 border-t border-slate-700 px-4 py-4 space-y-3">
                    <Link
                        to="/"
                        className="block text-slate-300 hover:text-white transition-colors font-medium py-2"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Home
                    </Link>
                    
                    {auth.isAuthenticated && (
                        <>
                            <Link
                                to="/dashboard"
                                className="block text-slate-300 hover:text-white transition-colors font-medium py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/profile"
                                className="block text-slate-300 hover:text-white transition-colors font-medium py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Profile
                            </Link>
                        </>
                    )}

                    <div className="border-t border-slate-700 pt-3">
                        {!auth.isAuthenticated ? (
                            <button
                                onClick={handleLogin}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
                            >
                                <LogIn className="w-4 h-4" />
                                Sign In
                            </button>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 px-4 py-2 rounded-lg font-medium transition-all duration-200 border border-red-500/30"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};