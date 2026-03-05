"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldSeparator } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { registrationSchema } from "./registerValidation";
import { registerUser } from "@/services/AuthService";

const RegisterForm = () => {
  // react hook form
  const form = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const {
    formState: { isSubmitting, errors },
  } = form;

  // router
  const router = useRouter();

  // toggle password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 
  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");

  // handle submit
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data)
    try {
      const res = await registerUser(data);
      // console.log(res)
      if (res?.success) {
        toast.success(res?.message);
        form.reset(); // reset form
        router.push(`/register/verify-otp?email=${data.email}`); // redirect to otp verification page
      }else{
                toast.error(res?.message);

      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <FormField
            control={form.control} 
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-slate-700">
                  Full name
                </FormLabel>
                <FormControl>
                  <div
                    className={`flex items-center gap-2 px-3 py-2 bg-white transition-all ${
                      errors.name
                        ? "border-b-2 border-b-red-500"
                        : "border-b border-b-slate-200"
                    } focus-within:border-b-2 focus-within:border-b-pblue`}
                  >
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="Your full name"
                      className="w-full bg-transparent text-sm placeholder:text-slate-400 border-0 shadow-none focus-visible:ring-0"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-red-500 mt-1" />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-slate-700">
                  Email address
                </FormLabel>
                <FormControl>
                  <div
                    className={`flex items-center gap-2 px-3 py-2 bg-white transition-all ${
                      errors.email
                        ? "border-b-2 border-b-red-500"
                        : "border-b border-b-slate-200"
                    } focus-within:border-b-2 focus-within:border-b-pblue`}
                  >
                    <Mail className="w-4 h-4 text-slate-400" />
                    <Input
                      {...field}
                      type="email"
                      value={field.value || ""}
                      placeholder="you@example.com"
                      className="w-full bg-transparent text-sm placeholder:text-slate-400 border-0 shadow-none focus-visible:ring-0"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-red-500 mt-1" />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-slate-700">
                  Password
                </FormLabel>
                <FormControl>
                  <div
                    className={`flex items-center gap-2 px-3 py-2 bg-white transition-all ${
                      errors.password
                        ? "border-b-2 border-b-red-500"
                        : "border-b border-b-slate-200"
                    } focus-within:border-b-2 focus-within:border-b-pblue`}
                  >
                    <Lock className="w-4 h-4 text-slate-400" />
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      value={field.value || ""}
                      placeholder="Create a password"
                      className="w-full bg-transparent text-sm placeholder:text-slate-400 border-0 shadow-none focus-visible:ring-0"
                    />
                    <button
                      type="button"
                      className="text-slate-400 hover:text-slate-600 transition-colors"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeClosed className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-red-500 mt-1" />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-slate-700">
                  Confirm password
                </FormLabel>
                <FormControl>
                  <div
                    className={`flex items-center gap-2 px-3 py-2 bg-white transition-all ${
                      errors.confirmPassword
                        ? "border-b-2 border-b-red-500"
                        : "border-b border-b-slate-200"
                    } focus-within:border-b-2 focus-within:border-b-pblue`}
                  >
                    <Lock className="w-4 h-4 text-slate-400" />
                    <Input
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      value={field.value || ""}
                      placeholder="Confirm password"
                      className="w-full bg-transparent text-sm placeholder:text-slate-400 border-0 shadow-none focus-visible:ring-0"
                    />
                    <button
                      type="button"
                      className="text-slate-400 hover:text-slate-600 transition-colors"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeClosed className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                {confirmPassword && password !== confirmPassword ? (
                  <FormMessage className="text-xs text-red-500 mt-1">
                    Password does not match
                  </FormMessage>
                ) : (
                  <FormMessage className="text-xs text-red-500 mt-1" />
                )}
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={
              isSubmitting ||
              Boolean(confirmPassword && password !== confirmPassword)
            }
            className="w-full h-11 bg-linear-to-r cursor-pointer from-pblue to-bluegray text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:brightness-110 transition-all mt-2"
          >
            {isSubmitting ? "Sending OTP..." : "Send OTP"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
