/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

// get all services with filters
export const getAllServices = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/services`,
      {
        next: {
          tags: ["SERVICE"], 
        },
      } 
    );
    const data = await res.json();
    
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

