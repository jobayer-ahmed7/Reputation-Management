/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${BASE_API}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();

    if (result?.success) {
      (await cookies()).set("accessToken", result?.token);
      (await cookies()).set("refreshToken", result?.refreshToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const verifyOtp = async (otpData: FieldValues) => {
  try {
    const res = await fetch(`${BASE_API}/auth/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(otpData),
    });
    const result = await res.json();

    return result;

  } catch (error: any) {
    return Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    if (result?.success) {
      (await cookies()).set("accessToken", result?.token);
      (await cookies()).set("refreshToken", result?.refreshToken);
      (await cookies()).set("userData", JSON.stringify(result?.data));
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;
    const userData: any = (await cookies()).get("userData")?.value;
    let decodedData = null;

    if (accessToken) {
      decodedData = jwtDecode(accessToken);
      return { decodedData, userData: userData ? JSON.parse(userData) : null };
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const logout = async () => {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("userData");
};
