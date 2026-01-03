"use client";

import ServiceCard from "@/components/shared/ServiceCard";
import { getAllServices } from "@/services/service";
import { useEffect, useState } from "react";
import Loading from "../shared/Loading";

type TService = {
  _id?: string;
  category: string;
  title: string;
  description: string;
  platform: string;
  price: string;
  originalPrice: string;
  badge: string | null;
  features: string[]; 
  createdAt?: Date;
  updatedAt?: Date;
};

const ServiceSection = () => {
  const [services, setServices] = useState<TService[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchServices = async () => {
    try {
      const response = await getAllServices({});
      const allServices = response?.data || [];
      // console.log(response);
      setServices(allServices);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  // console.log(services);

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) {
    return <Loading/>
  }

  return (
    <section className="py-16 lg:py-24 bg-linear-to-b from-white via-blue-50 to-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center space-y-4">
          <p className="inline-flex items-center text-xs font-semibold tracking-widest text-pblue uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Our Services
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Social Media Reviews & Engagement
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Boost your online presence across all major social media platforms
            with authentic reviews, followers, and engagement. Build credibility
            and trust with your audience.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              platform={service.platform}
              price={service.price}
              originalPrice={service.originalPrice}
              features={service.features}
              badge={service.badge || undefined}
              onBuyNow={() => console.log(`Buy ${service.title}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
