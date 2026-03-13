/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

// get all services with filters

const API_BASE = process.env.NEXT_PUBLIC_BASE_API;

export const getAllServices = async () => {
  try {
    const res = await fetch(
      `${API_BASE}/services`,
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


export const deleteService = async (id: string) => {
  try {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createService = async (data: any) => {
  try {
    const res = await fetch(`${API_BASE}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateService = async (id: string, data: any) => {
  try {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

