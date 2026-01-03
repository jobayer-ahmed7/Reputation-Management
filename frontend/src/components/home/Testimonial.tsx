"use client";
import { getAllTestimonials } from "@/services/testimonial";
import { Star, StarHalf } from "lucide-react";
import { useEffect, useState } from "react";
import Loading from "../shared/Loading";
import { set } from "zod";

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
    <section className="my-12">
      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Hear Directly From Our Clients
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              See why thousands of people trust us with their online reputation.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {testimonial.title}
                </h3>

                {/* Content */}
                <p className="text-gray-600 leading-relaxed mb-6 min-h-[120px]">
                  {testimonial.content}
                </p>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-2">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Rating Number */}
                <div className="text-2xl font-bold text-gray-900 mb-3">
                  {testimonial.rating}
                </div>

                {/* Author Info */}
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-semibold text-gray-900 text-sm mb-1">
                    {testimonial.clientName}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {" "}
                    {testimonial.createdAt
                      ? new Date(testimonial.createdAt)
                          .toISOString()
                          .split("T")[0]
                      : "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Read More Button */}
          {/* <div className="text-center">
          <button className="bg-linear-to-r from-pblue to-bluegray text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
            Read More
          </button>
        </div> */}
        </div>
      )}
    </section>
  );
};

export default Testimonial;
