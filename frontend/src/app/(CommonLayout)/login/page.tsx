"use client";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Mail, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input"

type LoginFormValues = {
  email: string;
  password: string;
  remember: boolean;
};

const LoginPage = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    // TODO: replace with your actual login mutation / API call
    console.log("login values", values);
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white/90 backdrop-blur shadow-xl rounded-2xl border border-slate-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left illustration / marketing panel (hidden on mobile) */}
          <div className="hidden lg:flex flex-col justify-between bg-linear-to-b from-pblue to-bluegray text-white p-10 space-y-8">
            <div className="space-y-4">
              <div className="bg-white/10 rounded-full px-4 py-1 inline-flex items-center gap-2 text-xs font-medium">
                <span className="size-2 rounded-full bg-emerald-400" />
                Trusted reputation management platform
              </div>
              <h1 className="text-3xl xl:text-4xl font-semibold leading-tight">
                Welcome back to
                <span className="block font-bold text-yellow-200">
                  Reputation Manage
                </span>
              </h1>
              <p className="text-sm text-blue-50/90 max-w-md leading-relaxed">
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
                  <p className="text-sm font-semibold">
                    24/7 live performance tracking
                  </p>
                  <p className="text-xs text-blue-50/80">
                    Login to see your latest stats and respond to customer
                    feedback.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-blue-50/80">
                <div className="flex -space-x-2">
                  <span className="size-8 rounded-full border border-white/40 bg-white/10 flex items-center justify-center text-[10px] font-semibold">
                    +100
                  </span>
                  <span className="size-8 rounded-full border border-white/40 bg-white/10 flex items-center justify-center text-[10px] font-semibold">
                    4.9★
                  </span>
                </div>
                <p>
                  Teams rely on BuyReviewz to keep their reputation ahead of the
                  curve.
                </p>
              </div>
            </div>
          </div>

          {/* Right login form panel */}
          <div className="px-6 sm:px-10 py-8 sm:py-10 flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pblue/80 mb-2">
                  Welcome back
                </p>
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-2">
                  Login to your account
                </h2>
                <p className="text-sm text-slate-500">
                  New here?{" "}
                  <Link
                    href="/register"
                    className="font-semibold text-pblue hover:text-bluegray transition-colors"
                  >
                    Create an account
                  </Link>
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">
                    Email address
                  </label>
                  <div
                    className={`flex items-center gap-2 px-3 py-2 bg-white transition-all ${
                      errors.email ? "border-b-2 border-b-red-500" : "border-b border-b-slate-200"
                    } focus-within:border-b-2 focus-within:border-b-pblue`}
                  >
                    <Mail className="w-4 h-4 text-slate-400" />
                    <Controller
                      control={control}
                      name="email"
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email address",
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="email"
                          placeholder="you@example.com"
                          className="w-full bg-transparent text-sm placeholder:text-slate-400 border-0 shadow-none focus-visible:ring-0"
                        />
                      )}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-slate-700">
                      Password
                    </label>
                    <Link
                      href="#"
                      className="text-xs font-medium text-pblue hover:text-bluegray"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div
                    className={`flex items-center gap-2 px-3 py-2 bg-white transition-all ${
                      errors.password ? "border-b-2 border-b-red-500" : "border-b border-b-slate-200"
                    } focus-within:border-b-2 focus-within:border-b-pblue`}
                  >
                    <Lock className="w-4 h-4 text-slate-400" />
                    <Controller
                      control={control}
                      name="password"
                      rules={{
                        required: "Password is required",
                        minLength: { value: 6, message: "Password must be at least 6 characters" },
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="password"
                          placeholder="••••••••"
                          className="w-full bg-transparent text-sm placeholder:text-slate-400 border-0 shadow-none focus-visible:ring-0"
                        />
                      )}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 bg-linear-to-r from-pblue to-bluegray text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:brightness-110 transition-all mt-2"
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
                <FieldSeparator className="mb-4">Or continue with</FieldSeparator>

                {/* Social / secondary actions (optional) */}

                <button
                  type="button"
                  className="flex items-center justify-center w-full cursor-pointer gap-1 rounded-lg border border-slate-200 bg-white py-2.5 hover:bg-slate-50 transition-colors"
                >
                  <span className=" text-2xl">G</span>
                  <span className="font-medium text-slate-700">Google</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
