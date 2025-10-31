import React, { useState } from "react";
import { registerUser } from "../api/user.api";
import { User, Mail, Lock, AlertCircle, Loader, CheckCircle } from "lucide-react";

export function RegisterForm({ state }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const checkPasswordStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 6) strength++;
        if (pass.length >= 8) strength++;
        if (/[A-Z]/.test(pass)) strength++;
        if (/[0-9]/.test(pass)) strength++;
        if (/[^A-Za-z0-9]/.test(pass)) strength++;
        console.log("Strength :")
        console.log(strength);
        return strength;
    };

    const handlePasswordChange = (e) => {
        const pass = e.target.value;
        setPassword(pass);
        setPasswordStrength(checkPasswordStrength(pass));
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength <= 1) return "bg-red-500";
        if (passwordStrength <= 2) return "bg-orange-500";
        if (passwordStrength <= 3) return "bg-yellow-500";
        return "bg-green-500";
    };

    const getPasswordStrengthText = () => {
        if (passwordStrength <= 1) return "Weak";
        if (passwordStrength <= 2) return "Fair";
        if (passwordStrength <= 3) return "Good";
        return "Strong";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const data = await registerUser(name, email, password);
            console.log(data);
            state(true);
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <User className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                    <p className="text-slate-400 text-sm">Join us to start shortening URLs</p>
                </div>

                {/* Form Card */}
                <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
                    
                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                            <p className="text-red-300 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Full Name Field */}
                    <div className="mb-5">
                        <label className="block text-sm font-semibold text-slate-200 mb-2">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="mb-5">
                        <label className="block text-sm font-semibold text-slate-200 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="mb-5">
                        <label className="block text-sm font-semibold text-slate-200 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                            <input
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                onKeyPress={handleKeyPress}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        
                        {/* Password Strength Indicator */}
                        {password && (
                            <div className="mt-3">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium text-slate-400">Password Strength</span>
                                    <span className={`text-xs font-medium ${passwordStrength <= 1 ? 'text-red-400' : passwordStrength <= 2 ? 'text-orange-400' : passwordStrength <= 3 ? 'text-yellow-400' : 'text-green-400'}`}>
                                        {getPasswordStrengthText()}
                                    </span>
                                </div>
                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-200 ${getPasswordStrengthColor()}`}
                                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-200 mb-2">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        {password && confirmPassword && (
                            <div className="mt-2 flex items-center gap-2">
                                {password === confirmPassword ? (
                                    <>
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        <span className="text-xs text-green-400">Passwords match</span>
                                    </>
                                ) : (
                                    <>
                                        <AlertCircle className="w-4 h-4 text-red-400" />
                                        <span className="text-xs text-red-400">Passwords do not match</span>
                                    </>
                                )}
                            </div>
                        )}
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
                                Creating Account...
                            </>
                        ) : (
                            'Create Account'
                        )}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-slate-700"></div>
                        <span className="text-xs text-slate-400">Already have an account?</span>
                        <div className="flex-1 h-px bg-slate-700"></div>
                    </div>

                    {/* Sign In Link */}
                    <p className="text-center text-slate-300 text-sm">
                        <button
                            type="button"
                            onClick={() => state(true)}
                            className="text-blue-400 font-semibold hover:text-blue-300 transition"
                        >
                            Sign in instead
                        </button>
                    </p>
                </div>

                {/* Footer Text */}
                <p className="text-center text-xs text-slate-500 mt-6">
                    By creating an account, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
}