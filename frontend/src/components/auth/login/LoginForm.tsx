import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "./loginValidation";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";
import { loginUser } from "@/services/AuthService";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeClosed, Lock, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldSeparator } from "@/components/ui/field";

const LoginForm = () => {
  // react hook form
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  // toggle password
  const [showPassword, setShowPassword] = useState(false);

  const [reCaptchaStatus, setReCaptchaStatus] = useState(false);

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  // const router = useRouter();

  const {
    formState: { isSubmitting, errors },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    try {
      const res = await loginUser(data);

      console.log(res)
      if (res?.success) {
        toast.success(res?.message);
        if (typeof window !== "undefined") {
          localStorage.setItem("authToken", res?.token);
        }
        console.log(res?.token);
        window.location.href = redirect || "/";

        // router.push(redirect || "/");
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 bg-linear-to-r from-pblue to-bluegray text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:brightness-110 transition-all mt-2"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>

        <FieldSeparator className="mb-4">Or continue with</FieldSeparator>

        <div className="grid grid-cols-1 gap-3">
          <button
            type="button"
            className="flex items-center justify-center w-full cursor-pointer gap-1 rounded-lg border border-slate-200 bg-white py-2.5 hover:bg-slate-50 transition-colors"
          >
            <span className="text-2xl">G</span>
            <span className="font-medium text-slate-700">Google</span>
          </button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
