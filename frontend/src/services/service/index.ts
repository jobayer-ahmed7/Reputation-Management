"use server";

// get all services with filters
export const getAllServices = async (filters: Record<string, any>) => {
  try {
    // Initialize query parameters
    const queryParams = new URLSearchParams();

    // Append filters to the query parameters
    if (filters.category) queryParams.append("dosCategory", filters.category);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/services?${queryParams.toString()}`,
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

