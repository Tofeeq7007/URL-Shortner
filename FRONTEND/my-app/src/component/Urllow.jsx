import React, { useState } from "react";
import { ShortendLink } from "./shortendlink";
import { createShortUrl } from "../services/urlServices";
import { useSelector } from "react-redux";
import { UserUrl } from "./UserUrls";
import { Copy, AlertCircle, Loader, Zap, Globe } from "lucide-react";

export function Abcd() {
    const [url, setUrl] = useState("");
    const [slug, setslug] = useState("");
    const [shorturl, setShorttUrl] = useState("");
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = useSelector((state) => state.auth);

    async function handleURL() {
        if (!url) return;

        setLoading(true);
        setError('');
        
        try {
            const generatedUrl = await createShortUrl(url, slug);
            setShorttUrl(generatedUrl);
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid URL. Please check and try again.');
        } finally {
            setLoading(false);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleURL();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-lg">
                            <Zap className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">URL Shortener</h1>
                    <p className="text-slate-400">Create short, shareable links instantly</p>
                </div>

                {/* Main Card */}
                <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700 mb-6">
                    
                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                            <p className="text-red-300 text-sm">{error}</p>
                        </div>
                    )}

                    {/* URL Input Field */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-200 mb-2">Original URL</label>
                        <div className="relative">
                            <Globe className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                            <input
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="https://example.com/your-long-url"
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            />
                        </div>
                    </div>

                    {/* Custom Slug - Only for Authenticated Users */}
                    {auth.isAuthenticated && (
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-slate-200 mb-2">Custom Short Link (Optional)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-slate-400 text-sm">short.url/</span>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setslug(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="my-link"
                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-24 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                />
                            </div>
                            <p className="text-xs text-slate-400 mt-2">Leave empty for auto-generated link</p>
                        </div>
                    )}

                    {/* Action Button */}
                    <button
                        onClick={handleURL}
                        disabled={loading || !url}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-lg disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Loader className="w-5 h-5 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            <>
                                <Zap className="w-5 h-5" />
                                Shorten URL
                            </>
                        )}
                    </button>
                </div>

                {/* Result Card */}
                {shorturl && (
                    <div className="mb-6">
                        <ShortendLink shorturl={shorturl} />
                    </div>
                )}

                {/* User URLs Section - Only for Authenticated Users */}
                {auth.isAuthenticated && (
                    <div>
                        <UserUrl />
                    </div>
                )}

                {/* Info Card for Unauthenticated Users */}
                {!auth.isAuthenticated && (
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6">
                        <h3 className="text-white font-semibold mb-2">Sign in for more features</h3>
                        <p className="text-blue-200 text-sm">Create an account to customize your links, track analytics, and manage all your shortened URLs in one place.</p>
                    </div>
                )}
            </div>
        </div>
    );
}