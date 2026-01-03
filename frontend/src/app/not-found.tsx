"use client";
import { ArrowLeft, Home, Search, FileQuestion } from "lucide-react";
import { useRouter } from "next/navigation";

const NotFound = () => {

  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const quickLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Help Center", href: "/help" },
    { name: "Contact Support", href: "/contact" },
  ];

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/20 p-8 sm:p-12 text-center space-y-8">
          {/* Icon with animation */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-linear-to-br from-blue-500 to-indigo-600 p-6 rounded-2xl shadow-lg">
                <FileQuestion className="w-16 h-16 text-white" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Error code with gradient */}
          <div>
            <h1 className="text-8xl sm:text-9xl font-bold bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              404
            </h1>
            <p className="text-xs font-semibold tracking-[0.3em] text-slate-400 uppercase">
              Page not found
            </p>
          </div>

          {/* Message */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Oops! Page not found
            </h2>
            <p className="text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
              The page you're looking for doesn't exist or has been moved. 
              Don't worry, let's get you back on track.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="/"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Back to Home
            </a>
            <button
              type="button"
              onClick={handleGoBack}
              className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
          </div>

         

          {/* Search suggestion */}
          <div className="pt-4">
            <p className="text-sm text-slate-500 mb-3">
              Looking for some services?
            </p>
            <a
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Search className="w-4 h-4" />
              Search our site
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;