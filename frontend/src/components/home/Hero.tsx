import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative bg-linear-to-br from-slate-50 via-blue-50/30 to-white min-h-[600px] lg:h-[80vh] flex items-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-linear-to-br from-pblue/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-linear-to-tr from-bluegray/15 to-cyan-300/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-linear-to-r from-pblue/5 to-transparent rounded-full blur-3xl"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-pblue/10 to-bluegray/10 border border-pblue/20 backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-pblue animate-pulse"></div>
              <span className="text-sm font-semibold text-pblue">
                #1 Reputation Management Platform
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight">
              Order Online{" "}
              <span className="bg-linear-to-r from-pblue via-blue-600 to-bluegray bg-clip-text text-transparent">
                Reviews
              </span>{" "}
              for Business
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
              Getting Permanent Positive Reviews Online For Your Business
              Instantly –
              <span className="font-semibold text-slate-900">
                {" "}
                100% Real and Non Drop
              </span>
            </p>

            {/* CTA Buttons */}
            <Link className="cursor-pointer" href="/services">
              <button className="group relative px-8 py-4 bg-linear-to-r from-pblue to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-pblue/30 hover:shadow-xl hover:shadow-pblue/40 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View Services
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-pblue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 lg:gap-8 pt-4 lg:pt-6 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="h-10 w-10 rounded-full bg-linear-to-br from-pblue to-blue-600 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                    5K+
                  </div>
                  <div className="h-10 w-10 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 border-2 border-white"></div>
                  <div className="h-10 w-10 rounded-full bg-linear-to-br from-cyan-500 to-teal-500 border-2 border-white"></div>
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-slate-900">
                    5,000+ Happy Clients
                  </p>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <span className="text-xs">★★★★★</span>
                  </div>
                </div>
              </div>

              <div className="h-12 w-px bg-slate-200"></div>

              <div className="text-sm">
                <p className="font-semibold text-slate-900">100% Guaranteed</p>
                <p className="text-slate-600">Real & Non-Drop Reviews</p>
              </div>
            </div>
          </div>

          {/* Right Side - Visual Element */}
          <div className="relative lg:h-full flex items-center justify-center py-8 lg:py-0">
            {/* Main Card Stack */}
            <div className="relative w-full max-w-md lg:max-w-sm xl:max-w-md">
              {/* Background Cards */}
              <div className="absolute top-6 left-6 right-6 h-72 lg:h-80 bg-linear-to-br from-slate-200/50 to-slate-300/50 rounded-3xl blur-sm transform rotate-6"></div>
              <div className="absolute top-3 left-3 right-3 h-72 lg:h-80 bg-linear-to-br from-slate-100/80 to-slate-200/80 rounded-3xl blur-sm transform rotate-3"></div>

              {/* Main Card */}
              <div className="relative bg-white rounded-3xl shadow-2xl shadow-slate-300/50 p-6 lg:p-8 border border-slate-200/60 backdrop-blur-sm">
                {/* Star Rating Display */}
                <div className="flex items-center justify-center gap-1.5 lg:gap-2 mb-4 lg:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-8 h-8 lg:w-10 lg:h-10 text-yellow-400 drop-shadow-sm"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Review Stats */}
                <div className="space-y-3 lg:space-y-4 mb-4 lg:mb-6">
                  <div className="flex items-center justify-between p-3 lg:p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/50">
                    <span className="text-sm font-medium text-slate-700">
                      Positive Reviews
                    </span>
                    <span className="text-xl lg:text-2xl font-bold text-green-600">
                      98.5%
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 lg:p-4 bg-linear-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200/50">
                    <span className="text-sm font-medium text-slate-700">
                      Average Rating
                    </span>
                    <span className="text-xl lg:text-2xl font-bold text-pblue">
                      4.9/5
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 lg:p-4 bg-linear-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50">
                    <span className="text-sm font-medium text-slate-700">
                      Total Reviews
                    </span>
                    <span className="text-xl lg:text-2xl font-bold text-purple-600">
                      50K+
                    </span>
                  </div>
                </div>

                {/* Verified Badge */}
                <div className="flex items-center justify-center gap-2 p-3 lg:p-4 bg-linear-to-r from-pblue/5 to-bluegray/5 rounded-xl border border-pblue/20">
                  <svg
                    className="w-5 h-5 lg:w-6 lg:h-6 text-pblue"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-pblue">
                    100% Verified & Authentic
                  </span>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 lg:-top-6 -right-4 lg:-right-6 bg-white rounded-2xl shadow-xl p-3 lg:p-4 border border-slate-200 animate-bounce">
                <p className="text-xs lg:text-sm font-semibold text-slate-900">
                  ✓ Instant Delivery
                </p>
              </div>

              <div className="absolute -bottom-4 lg:-bottom-6 -left-4 lg:-left-6 bg-white rounded-2xl shadow-xl p-3 lg:p-4 border border-slate-200 animate-bounce delay-300">
                <p className="text-xs lg:text-sm font-semibold text-slate-900">
                  🔒 100% Secure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-16 lg:h-24 text-white"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
