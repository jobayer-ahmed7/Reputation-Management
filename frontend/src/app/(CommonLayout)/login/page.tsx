"use client";
import { useForm, Controller } from "react-hook-form";
import { Mail, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import LoginForm from "@/components/auth/login/LoginForm";

const LoginPage = () => {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white/90 backdrop-blur shadow-xl rounded-2xl border border-slate-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left illustration / marketing panel (hidden on mobile) */}
          <div className="hidden lg:flex flex-col justify-between bg-linear-to-tl from-[#F0F8FF] via-[#E6F4FF] to-[#FFF7ED] p-10 space-y-8 text-slate-900">
            <div className="space-y-4">
              <div className="bg-white/10 rounded-full px-4 py-1 inline-flex items-center gap-2 text-xs font-medium text-slate-800">
                <span className="size-2 rounded-full bg-emerald-400" />
                Trusted reputation management platform
              </div>
              <h1 className="text-3xl xl:text-4xl font-semibold leading-tight text-slate-900">
                Welcome back to
                <span className="block font-bold text-pblue">
                  Reputation Manage
                </span>
              </h1>
              <p className="text-sm text-slate-700 max-w-md leading-relaxed">
                Monitor, manage, and grow your brand reputation across
                platforms. Get real-time insights, reply to reviews faster, and
                build trust with your customers.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden border border-white/30">
                  <Image
                    src="/logo.webp"
                    alt="Reputation Manage logo"
                    fill
                    className="object-contain bg-white/90 p-1"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    24/7 live performance tracking
                  </p>
                  <p className="text-xs text-slate-700">
                    Login to see your latest stats and respond to customer
                    feedback.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-700">
                <div className="flex -space-x-2">
                  <span className="size-8 rounded-full border border-white/40 bg-white/10 flex items-center justify-center text-[10px] font-semibold text-slate-900">
                    +100
                  </span>
                  <span className="size-8 rounded-full border border-white/40 bg-white/10 flex items-center justify-center text-[10px] font-semibold text-slate-900">
                    4.9★
                  </span>
                </div>
                <p className="text-slate-800">
                  Teams rely on BuyReviewz to keep their reputation ahead of the
                  curve.
                </p>
              </div>
            </div>
          </div>

          {/* Right login form panel */}
          <div className="p-4">

          <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
