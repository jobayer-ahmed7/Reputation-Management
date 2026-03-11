/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ContactFormValues } from "@/components/home/ContactUs";



export const getOrdersByUserId = async (formData:ContactFormValues) => {
  try {


    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/contact/submit-message`, {
     method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    return data;

  } catch (error: any) {
    return Error(error.message);
  }
};
