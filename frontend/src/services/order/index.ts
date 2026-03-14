/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

const API_BASE = process.env.NEXT_PUBLIC_BASE_API;

export const getAllOrders = async () => {
  try {
    // Get token from cookies (recommended for server actions)
    const { cookies } = await import("next/headers");
    const cookieStore = cookies();
    const token = (await cookieStore).get("accessToken")?.value;

    const res = await fetch(`${API_BASE}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log({res})

    const data = await res.json();
    console.log(data)
    return data;

  } catch (error: any) {
    return Error(error.message);
  }
};

export const getOrdersByUserId = async (userID: string) => {
  try {
    // Get token from cookies (recommended for server actions)
    const { cookies } = await import("next/headers");
    const cookieStore = cookies();
    const token = (await cookieStore).get("accessToken")?.value; 

    const res = await fetch(`${API_BASE}/orders/my-orders/${userID}`, {
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

export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    // Get token from cookies (recommended for server actions)
    const { cookies } = await import("next/headers");
    const cookieStore = cookies();
    const token = (await cookieStore).get("accessToken")?.value;

    const res = await fetch(`${API_BASE}/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ workingStatus: status }),
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
