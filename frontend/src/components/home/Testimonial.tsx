"use client";
import { getAllTestimonials } from "@/services/testimonial";
import { Star, StarHalf } from "lucide-react";
import { useEffect, useState } from "react";
import Loading from "../shared/Loading";

type TTestimonial = {
  _id?: string;
  title: string;
  content: string;
  rating: number;
  clientName: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const Testimonial = () => {

  const [loading, setLoading] = useState(false);
  const [testimonials, setTestimonials] = useState<TTestimonial[]>([]);

  // console.log(testimonials)

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await getAllTestimonials();
      const allTestimonials = response?.data || [];
      console.log("Testimonials Response:", response);
      setTestimonials(allTestimonials);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  // call fetchTestimonials when component mounts
  useEffect(() => {
    fetchTestimonials();
  }, []);

  // render stars based on rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-5 h-5 fill-yellow-400 text-yellow-400"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="w-5 h-5 fill-yellow-400 text-yellow-400"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }

    return stars;
  };

  return (
    <section className="py-16 bg-linear-to-b from-slate-50 via-white to-blue-50">
      {loading ? (
        <div className="container mx-auto px-4">
          <Loading />
        </div>
      ) : (
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 space-y-3">
            <span className="inline-flex items-center rounded-full bg-pblue/5 px-3 py-1 text-xs font-semibold tracking-wide text-pblue">
              Loved by teams of all sizes
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Hear directly from our clients
            </h2>
            <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
              Real stories from brands using our platform to monitor reviews,
              respond faster, and grow a trusted online reputation.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            
            {testimonials.map((testimonial, index) => (

              <div
                key={index}
                className="group relative h-full rounded-2xl border border-slate-100 bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-pblue/50 hover:shadow-[0_20px_60px_rgba(37,99,235,0.18)]"
              >


                {/* Title */}
                <h3 className="mt-3 text-lg font-semibold text-slate-900 mb-3">
                  {testimonial.title}
                </h3>

                {/* Content */}
                <p className="text-sm text-slate-600 leading-relaxed mb-5 min-h-20">
                  {testimonial.content}
                </p>

                {/* Rating Stars + value */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {renderStars(testimonial.rating)}
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-pblue/5 px-3 py-1 text-xs font-semibold text-pblue">
                    {testimonial.rating.toFixed(1)}
                    <span className="text-[10px] text-slate-500">/ 5.0</span>
                  </span>
                </div>

                {/* Author Info */}
                <div className="border-t border-slate-100 pt-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">
                      {testimonial.clientName}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {testimonial.createdAt
                        ? new Date(testimonial.createdAt)
                            .toISOString()
                            .split("T")[0]
                        : "Date not available"}
                    </p>
                  </div>
                  <span className="rounded-full bg-bluegray/5 px-3 py-1 text-[11px] font-medium text-bluegray/80">
                    Verified client
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonial;
