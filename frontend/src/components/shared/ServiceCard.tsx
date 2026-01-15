"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Check } from "lucide-react";

export type TService = {
  _id?: string;
  platform: string;
  name: string;
  count: string;
  price: number;
  deliveryTimeRange: string;
  type: "Standard" | "Monthly";
  isFeatured: boolean;
};

interface ServiceCardProps {
  service: TService;
  onBuyNow?: (service: TService) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBuyNow }) => {
  const { platform, name, count, price, deliveryTimeRange, type, isFeatured } =
    service;

  const typeLabel = type === "Monthly" ? "Monthly pack" : "Standard service";

  return (
    <Card className="relative group overflow-hidden border-slate-200 hover:shadow-xl transition-all duration-300">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-pblue/5 via-transparent to-bluegray/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Badge */}
      {isFeatured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center text-xs font-bold tracking-widest text-white uppercase bg-linear-to-r from-pblue to-bluegray px-3 py-1 rounded-full">
            Featured
          </span>
        </div>
      )}

      <CardHeader className="relative z-10">
        {/* Platform and featured */}
        <div className="flex items-center gap-4 ">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-pblue/80 mb-3">
              {platform}
            </p>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {name}
            </h3>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-6">
        {/* Pricing */}
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-pblue">
            ${price.toFixed(2)}
          </span>
          <span className="text-xs text-slate-500 ml-auto">per order</span>
        </div>

        {/* Features List */}
        <ul className="space-y-2.5">
          <li className="flex items-start gap-3">
            <Check className="w-4 h-4 text-pblue mt-0.5 shrink-0" />
            <span className="text-sm text-slate-700">Count: {count}</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="w-4 h-4 text-pblue mt-0.5 shrink-0" />
            <span className="text-sm text-slate-700">
              Delivery: {deliveryTimeRange}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="w-4 h-4 text-pblue mt-0.5 shrink-0" />
            <span className="text-sm text-slate-700">Type: {typeLabel}</span>
          </li>
        </ul>

        {/* Buy Now Button */}
        <Button
          onClick={onBuyNow ? () => onBuyNow(service) : undefined}
          className="w-full h-10 cursor-pointer bg-linear-to-r from-pblue to-bluegray text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300"
        >
          Buy Now
        </Button>

        {/* Additional Info */}
        <p className="text-xs text-slate-500 text-center">
          Fast delivery • Quality guaranteed • 24/7 support
        </p>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
