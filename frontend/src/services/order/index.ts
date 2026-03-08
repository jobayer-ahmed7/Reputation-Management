/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

const API_BASE = process.env.NEXT_PUBLIC_BASE_API;

export const getOrdersByUserId = async (userEmail: string) => {
  try {
    // Get token from cookies (recommended for server actions)
    const { cookies } = await import("next/headers");
    const cookieStore = cookies();
    const token = (await cookieStore).get("accessToken")?.value; 

    const res = await fetch(`${API_BASE}/orders/my-orders/${userEmail}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return data;

  } catch (error: any) {
    return Error(error.message);
  }
};
