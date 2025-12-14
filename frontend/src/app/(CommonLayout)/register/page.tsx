"use client";

import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import RegisterForm from "@/components/auth/register/RegisterForm";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirm: string;
  agree: boolean;
}; 

const RegisterPage = () => {
 
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white/90 backdrop-blur shadow-xl rounded-2xl border border-slate-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: Register form (visible on all sizes) */}

          <div className="px-6 sm:px-10 py-8 sm:py-10 flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pblue/80 mb-2">
                  Get started
                </p>
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-2">
                  Create an account
                </h2>
                <p className="text-sm text-slate-500">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-pblue hover:text-bluegray transition-colors"
                  >
                    Login
                  </Link>
                </p>
              </div>
              <RegisterForm />
            </div>
          </div>

          {/* Right: Creative / Illustration panel (hidden on small screens) */}
          <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-linear-to-tr from-[#F0F8FF] via-[#E6F4FF] to-[#FFF7ED]">
            <div className="max-w-sm text-center space-y-6">
              <div className="w-56 h-56 mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center overflow-hidden">
                {/* Simple illustrative SVG */}
                <svg viewBox="0 0 200 200" className="w-40 h-40">
                  <defs>
                    <linearGradient id="g1" x1="0" x2="1">
                      <stop offset="0%" stopColor="#017aff" />
                      <stop offset="100%" stopColor="#1a7adf" />
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="60" r="36" fill="#ffd76b" />
                  <rect
                    x="40"
                    y="110"
                    width="120"
                    height="60"
                    rx="12"
                    fill="url(#g1)"
                  />
                  <text
                    x="100"
                    y="145"
                    textAnchor="middle"
                    fontSize="18"
                    fill="#fff"
                  >
                    Welcome
                  </text>
                </svg>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Build your reputation
                </h3>
                <p className="text-sm text-slate-600">
                  Start accepting reviews, track performance and grow with
                  verified feedback from real customers.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-pblue">+100</div>
                  <div className="text-xs text-slate-500">Clients</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-pblue">4.9★</div>
                  <div className="text-xs text-slate-500">Avg rating</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-pblue">24/7</div>
                  <div className="text-xs text-slate-500">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
