"use client";

import { useForm, Controller } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Mail, ShieldCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyOtp } from "@/services/AuthService";
import { toast } from "sonner";
import { useEffect, useState } from "react";

type OtpFormValues = {
  otp: string;
  email: string;
};

const VerifyOtp = () => {
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirectPath");

  const email = searchParams.get("email") || "";
  // console.log(email)
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<OtpFormValues>({
    defaultValues: { otp: "", email },
  });

  const otpValue = watch("otp");

  const onSubmit = async (data: OtpFormValues) => {
    try {
      const res = await verifyOtp(data);
      console.log(res);
      if (res?.success) {
        toast.success(res?.message);
        setRedirectUrl(redirect || "/");
      } else {
        toast.error(res?.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
    }

    console.log("OTP Submitted:", data);
  };
  useEffect(() => {
    if (!email) router.push("/register");
  }, [email, router]);

  useEffect(() => {
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, [redirectUrl]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#f0f4ff]">
      <div className="relative bg-white rounded-3xl shadow-2xl px-10 py-12 w-full max-w-md overflow-hidden">
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl bg-pblue" />

        {/* Blobs */}
        <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full opacity-10 blur-3xl pointer-events-none bg-pblue" />
        <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full opacity-10 blur-3xl pointer-events-none bg-bluegray" />

        {/* Icon */}
        <div className="mx-auto mb-6 flex items-center justify-center w-16 h-16 rounded-2xl shadow-md bg-pblue">
          <ShieldCheck className="text-white w-8 h-8" />
        </div>

        {/* Heading */}
        <h1 className="text-center text-2xl font-bold tracking-tight mb-1 text-bluegray">
          Verify your email
        </h1>

        <p className="text-center text-sm text-gray-400 mb-8 flex items-center justify-center gap-1.5">
          <Mail className="w-3.5 h-3.5" />
          We sent a 6-digit code to your email
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-6"
        >
          {/* OTP Input */}
          <Controller
            name="otp"
            control={control}
            rules={{
              required: "OTP is required",
              minLength: { value: 6, message: "Please enter all 6 digits" },
            }}
            render={({ field }) => (
              <InputOTP
                maxLength={6}
                value={field.value}
                onChange={field.onChange}
              >
                <InputOTPGroup>
                  {[0, 1, 2].map((i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className="w-12 h-14 mr-2 text-xl font-bold border-2 rounded-xl transition-all duration-200 focus-within:border-pblue data-[active=true]:border-pblue"
                    />
                  ))}
                </InputOTPGroup>
                <InputOTPSeparator className="text-gray-300 text-xl font-light mx-1" />
                <InputOTPGroup>
                  {[3, 4, 5].map((i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className="w-12 h-14 mr-2 text-xl font-bold border-2 rounded-xl transition-all duration-200 focus-within:border-pblue data-[active=true]:border-pblue"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            )}
          />

          {errors.otp && (
            <p className="text-red-500 text-xs -mt-3">{errors.otp.message}</p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={otpValue.length < 6}
            className={`w-full h-12 text-base font-semibold rounded-xl text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
              otpValue.length === 6
                ? "bg-pblue hover:opacity-90 cursor-pointer"
                : "bg-slate-300"
            }`}
          >
            Verify OTP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
