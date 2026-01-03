"use server";

// get all testimonials with filters
export const getAllTestimonials = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/testimonials`,
      {
        next: {
          tags: ["TESTIMONIAL"],
        },
      }
    );
    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
