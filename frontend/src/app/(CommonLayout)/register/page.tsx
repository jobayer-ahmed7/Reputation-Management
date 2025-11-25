"use client"

import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirm: string;
  agree: boolean;
};

const RegisterPage = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
      agree: false,
    },
    mode: "onTouched",
  });

  const password = watch("password");

  const onSubmit = async (values: RegisterFormValues) => {
    // Replace with real API call
    console.log("register values", values);
  };

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
                    Sign in
                  </Link>
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">
                    Full name
                  </label>
                  <div
                    className={`flex items-center gap-2 px-3 py-2 bg-white transition-all ${
                      errors.name
                        ? "border-b-2 border-b-red-500"
                        : "border-b border-b-slate-200"
                    } focus-within:border-b-2 focus-within:border-b-pblue`}
                  >
                    <Controller
                      control={control}
                      name="name"
                      rules={{ required: "Full name is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Your full name"
                          className="w-full bg-transparent text-sm placeholder:text-slate-400 border-0 shadow-none focus-visible:ring-0"
                        />
                      )}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">
                    Email address
                  </label>
                  <div
                    className={`flex items-center gap-2 px-3 py-2 bg-white transition-all ${
                      errors.email
                        ? "border-b-2 border-b-red-500"
                        : "border-b border-b-slate-200"
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
                  <label className="block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <div
                    className={`flex items-center gap-2 px-3 py-2 bg-white transition-all ${
                      errors.password
                        ? "border-b-2 border-b-red-500"
                        : "border-b border-b-slate-200"
                    } focus-within:border-b-2 focus-within:border-b-pblue`}
                  >
                    <Lock className="w-4 h-4 text-slate-400" />
                    <Controller
                      control={control}
                      name="password"
                      rules={{
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="password"
                          placeholder="Create a password"
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

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">
                    Confirm password
                  </label>
                  <div
                    className={`flex items-center gap-2 px-3 py-2 bg-white transition-all ${
                      errors.confirm
                        ? "border-b-2 border-b-red-500"
                        : "border-b border-b-slate-200"
                    } focus-within:border-b-2 focus-within:border-b-pblue`}
                  >
                    <Controller
                      control={control}
                      name="confirm"
                      rules={{
                        required: "Please confirm your password",
                        validate: (val) =>
                          val === password || "Passwords do not match",
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="password"
                          placeholder="Confirm password"
                          className="w-full bg-transparent text-sm placeholder:text-slate-400 border-0 shadow-none focus-visible:ring-0"
                        />
                      )}
                    />
                  </div>
                  {errors.confirm && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.confirm.message}
                    </p>
                  )}
                </div>

                {/* Agree */}
                <div className="flex items-center gap-2">
                  <input
                    id="agree"
                    type="checkbox"
                    className="w-4 h-4 text-pblue rounded border-border"
                    {...register("agree")}
                  />
                  <label
                    htmlFor="agree"
                    className="text-sm text-muted-foreground"
                  >
                    I agree to the{" "}
                    <Link href="#" className="text-pblue underline">
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-pblue underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 bg-linear-to-r from-pblue to-bluegray text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:brightness-110 transition-all mt-2"
                >
                  {isSubmitting ? "Creating account..." : "Create account"}
                </Button>

                <FieldSeparator className="mb-4">
                  Or continue with
                </FieldSeparator>

                <div className="grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    className="flex items-center justify-center w-full cursor-pointer gap-1 rounded-lg border border-slate-200 bg-white py-2.5 hover:bg-slate-50 transition-colors"
                  >
                    <span className=" text-2xl">G</span>
                    <span className="font-medium text-slate-700">Google</span>
                  </button>
                </div>
              </form>
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
