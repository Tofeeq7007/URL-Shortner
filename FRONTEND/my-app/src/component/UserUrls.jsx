import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { getAllUserUrls } from "../api/user.api";
import { Copy, Check, Zap, AlertCircle, Link2, BarChart3 } from "lucide-react";

export const UserUrl = () => {
    const { data: urls, isLoading, isError, error } = useQuery({
        queryKey: ['userUrls'],
        queryFn: getAllUserUrls,
        refetchInterval: 30000,
        staleTime: 0
    });

    const [copiedId, setCopied] = useState(null);

    const handleCopy = (url, id) => {
        navigator.clipboard.writeText(url);
        setCopied(id);

        setTimeout(() => {
            setCopied(null);
        }, 2000);
    };

    if (isLoading) {
        return (
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 flex flex-col items-center justify-center min-h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-600 border-t-blue-500 mb-4"></div>
                <p className="text-slate-400">Loading your URLs...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-slate-800 rounded-2xl border border-red-500/30 p-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                    <p className="text-red-300 font-semibold">Error loading URLs</p>
                    <p className="text-red-200 text-sm">{error?.message}</p>
                </div>
            </div>
        );
    }

    if (!urls?.urls || urls.urls.length === 0) {
        return (
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-12 text-center">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-slate-700 rounded-lg">
                        <Link2 className="w-8 h-8 text-slate-500" />
                    </div>
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">No URLs yet</h3>
                <p className="text-slate-400 text-sm">Start shortening URLs to see them here</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">Your Shortened Links</h2>
                <span className="ml-auto bg-slate-700 px-3 py-1 rounded-lg text-sm text-slate-300">
                    {urls.urls.length} link{urls.urls.length !== 1 ? 's' : ''}
                </span>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-700/50 border-b border-slate-700">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Original URL</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Short Link</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Clicks</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {urls.urls.slice().reverse().map((url) => (
                                <tr key={url._id} className="hover:bg-slate-700/30 transition-colors duration-200">
                                    <td className="px-6 py-4">
                                        <div className="max-w-xs">
                                            <a
                                                href={url.full_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 hover:text-blue-300 text-sm truncate block hover:underline"
                                                title={url.full_url}
                                            >
                                                {url.full_url}
                                            </a>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a
                                            href={`${import.meta.env.VITE_BACKEND_URL}/${url.short_url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:text-blue-300 text-sm hover:underline flex items-center gap-2"
                                        >
                                            <Link2 className="w-4 h-4" />
                                            {url.short_url}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <BarChart3 className="w-4 h-4 text-slate-500" />
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                                {url.clicks}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleCopy(`${import.meta.env.VITE_BACKEND_URL}/${url.short_url}`, url._id)}
                                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                                                copiedId === url._id
                                                    ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30'
                                            }`}
                                        >
                                            {copiedId === url._id ? (
                                                <>
                                                    <Check className="w-4 h-4" />
                                                    Copied!
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-4 h-4" />
                                                    Copy
                                                </>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {urls.urls.slice().reverse().map((url) => (
                    <div key={url._id} className="bg-slate-800 rounded-xl border border-slate-700 p-5 hover:border-slate-600 transition-colors duration-200">
                        {/* Short Link */}
                        <div className="mb-4">
                            <p className="text-xs font-semibold text-slate-400 mb-1">Short Link</p>
                            <div className="flex items-center gap-2 bg-slate-700/50 p-3 rounded-lg">
                                <Link2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                                <a
                                    href={`${import.meta.env.VITE_BACKEND_URL}/${url.short_url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 text-sm truncate hover:underline flex-1"
                                >
                                    {url.short_url}
                                </a>
                            </div>
                        </div>

                        {/* Original URL */}
                        <div className="mb-4">
                            <p className="text-xs font-semibold text-slate-400 mb-1">Original URL</p>
                            <a
                                href={url.full_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-300 text-sm truncate block hover:text-slate-200 hover:underline"
                                title={url.full_url}
                            >
                                {url.full_url}
                            </a>
                        </div>

                        {/* Stats and Action */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <BarChart3 className="w-4 h-4 text-slate-500" />
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                    {url.clicks} click{url.clicks !== 1 ? 's' : ''}
                                </span>
                            </div>
                            <button
                                onClick={() => handleCopy(`${import.meta.env.VITE_BACKEND_URL}/${url.short_url}`, url._id)}
                                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-xs transition-all duration-200 ${
                                    copiedId === url._id
                                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30'
                                }`}
                            >
                                {copiedId === url._id ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        Copy
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};