"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Check} from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  platform: string;
  price: string;
  originalPrice?: string;
  features: string[];
  onBuyNow?: () => void;
  badge?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  platform,
  price,
  originalPrice,
  features,
  onBuyNow,
  badge,
}) => {
  return (
    <div className="relative group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md hover:shadow-xl transition-all duration-300">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-pblue/5 via-transparent to-bluegray/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Badge */}
      {badge && (
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center text-xs font-bold tracking-widest text-white uppercase bg-linear-to-r from-pblue to-bluegray px-3 py-1 rounded-full">
            {badge}
          </span>
        </div>
      )}

      <div className="relative z-10 p-6 sm:p-8">
        {/* Icon & Platform */}
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl bg-linear-to-br from-pblue/10 to-bluegray/10 text-pblue">
            {icon}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-pblue/80 mb-0.5">
              {platform}
            </p>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">{title}</h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-3xl font-bold text-pblue">{price}</span>
          {originalPrice && (
            <span className="text-sm text-slate-400 line-through">{originalPrice}</span>
          )}
          <span className="text-xs text-slate-500 ml-auto">per order</span>
        </div>

        {/* Features List */}
        <ul className="space-y-2.5 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="w-4 h-4 text-pblue mt-0.5 shrink-0" />
              <span className="text-sm text-slate-700">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Buy Now Button */}
        <Button
          onClick={onBuyNow}
          className="w-full h-11 bg-linear-to-r from-pblue to-bluegray text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300"
        >
          Buy Now
        </Button>

        {/* Additional Info */}
        <p className="text-xs text-slate-500 text-center mt-4">
          Fast delivery • Quality guaranteed • 24/7 support
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
