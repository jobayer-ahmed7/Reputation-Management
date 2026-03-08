/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

//
const API_BASE = process.env.NEXT_PUBLIC_BASE_API;

// get orders for a specific user
export const getOrdersByUserId = async (userId: string) => {
  try {
    const res = await fetch(`${API_BASE}/orders/${userId}`);
    const data = await res.json();
    return data;
  
  } catch (error: any) {
    return Error(error.message);
  }
};
