import React, { useState } from "react";
import { Copy, Check, CheckCircle, Share2 } from "lucide-react";

export function ShortendLink({ shorturl }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(shorturl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Check out this shortened URL",
                    text: "I just shortened this URL",
                    url: shorturl,
                });
            } catch (err) {
                console.log("Share cancelled or failed");
            }
        } else {
            handleCopy();
        }
    };

    return (
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6 md:p-8">
            
            {/* Success Icon and Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-500/20 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg">URL Successfully Shortened!</h3>
                    <p className="text-slate-400 text-sm">Your link is ready to share</p>
                </div>
            </div>

            {/* URL Display Box */}
            <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-4 md:p-5 mb-6">
                <p className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Your Short URL</p>
                
                <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <a
                            href={shorturl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 font-mono text-sm md:text-base break-all hover:underline transition-colors"
                            title={shorturl}
                        >
                            {shorturl}
                        </a>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
                {/* Copy Button */}
                <button
                    onClick={handleCopy}
                    className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                        copied
                            ? 'bg-green-500/20 text-green-300 border border-green-500/50'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/50 hover:bg-blue-500/30 active:scale-95'
                    }`}
                >
                    {copied ? (
                        <>
                            <Check className="w-5 h-5" />
                            <span className="hidden sm:inline">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-5 h-5" />
                            <span className="hidden sm:inline">Copy Link</span>
                        </>
                    )}
                </button>

                {/* Share Button */}
                <button
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-lg font-semibold bg-slate-700/50 text-slate-300 border border-slate-600 hover:bg-slate-700 hover:text-white transition-all duration-200 active:scale-95"
                    title="Share this URL"
                >
                    <Share2 className="w-5 h-5" />
                    <span className="hidden sm:inline">Share</span>
                </button>
            </div>

            {/* Info Text */}
            <p className="text-xs text-slate-400 mt-4">
                ✓ Your short URL is active and ready to use. Click to open or copy to clipboard.
            </p>
        </div>
    );
}