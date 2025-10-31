import React from "react";
import { Clock, Sparkles } from "lucide-react";

export default function ComingSoon({ featureName = "This feature" }) {
  return (
    <div className="min-h-screen overflow-hidden flex flex-col items-center justify-center bg-slate-900 text-center p-8">
      {/* Icon Section */}
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
          <Clock className="w-10 h-10 text-white" />
        </div>
        <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-blue-300 animate-pulse" />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-white mb-3">
        {featureName} Coming Soon 🚀
      </h1>

      {/* Subtitle */}
      <p className="text-slate-400 max-w-md mb-8">
        We’re working on something exciting! Stay tuned — this section will be
        available in an upcoming update.
      </p>

      {/* Tag / Info Box */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-300 shadow-lg">
        <span className="text-sm font-medium">Stay connected for updates ✨</span>
      </div>
    </div>
  );
}
