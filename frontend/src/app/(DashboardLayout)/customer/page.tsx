"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/contexts/userContext";
import { getOrdersByUserId } from "@/services/order";
import { Check } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const customer = {
  name: "Mariana Costa",
  email: "mariana.costa@email.com",
  phone: "+1 (555) 291-4820",
  memberSince: "March 2022",
  tier: "Gold Member",
  avatar: "MC",
  totalOrders: 47,
  totalSpent: "$3,284.50",
};

const orders = [
  {
    id: "#ORD-9821",
    item: "Wireless Noise-Cancelling Headphones",
    date: "Mar 04, 2026",
    price: "$289.00",
    status: "delivered",
    currentStep: 4,
    eta: "Delivered Feb 28",
  },
  {
    id: "#ORD-9756",
    item: "Mechanical Keyboard — Tactile Brown",
    date: "Feb 28, 2026",
    price: "$149.00",
    status: "out_for_delivery",
    currentStep: 3,
    eta: "Arriving today by 8 PM",
  },
  {
    id: "#ORD-9701",
    item: "USB-C Hub 12-in-1",
    date: "Feb 20, 2026",
    price: "$79.50",
    status: "shipped",
    currentStep: 2,
    eta: "Expected Mar 8, 2026",
  },
  {
    id: "#ORD-9650",
    item: "Ergonomic Chair Lumbar Support",
    date: "Feb 10, 2026",
    price: "$399.00",
    status: "confirmed",
    currentStep: 1,
    eta: "Preparing for shipment",
  },
];

const TOTAL_STEPS = 5;
const stepLabels = [
  "Ordered",
  "Confirmed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

const statusConfig: Record<string, { label: string; pill: string }> = {
  delivered: {
    label: "Delivered",
    pill: "bg-emerald-50 text-emerald-600 border-emerald-200",
  },
  out_for_delivery: {
    label: "Out for Delivery",
    pill: "bg-pblue/10 text-pblue border-pblue/20",
  },
  shipped: {
    label: "Shipped",
    pill: "bg-bluegray/10 text-bluegray border-bluegray/20",
  },
  confirmed: {
    label: "Confirmed",
    pill: "bg-slate-100 text-slate-500 border-slate-200",
  },
  ordered: {
    label: "Ordered",
    pill: "bg-slate-100 text-slate-400 border-slate-200",
  },
};

const CustomerPage = () => {
  const user = useUser();
  
  const [orders1, setOrders] = useState([]);
  

  useEffect(()=> {
    const fetchOrders = async () => {
      if (user.user?.email) {
        const res = await getOrdersByUserId(user.user.email);
        // setOrders(data.orders || []); // Assuming the API returns { orders: [...] }
        console.log(res)
      }
    };

    fetchOrders();
  },[user.user?.email])



  return (
    <div className="min-h-screen bg-white text-slate-800 px-6 py-10 font-mono">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex items-center gap-5 mb-8">
          <span className="text-xl font-light tracking-tight text-slate-800">
            Reputation Manage
          </span>
          <div className="flex-1" />
          <Link
            className="text-xs uppercase tracking-widest text-slate-400 hover:text-slate-700 transition-colors"
            href="/services"
          >
            Services
          </Link>
        </header>

        {/* Profile Card */}
        <Card className="bg-white border border-slate-200 overflow-hidden relative shadow-sm">
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-pblue/5 blur-3xl pointer-events-none" />
          <CardContent className="p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-pblue to-bluegray flex items-center justify-center text-white text-xl font-light shrink-0 select-none">
                {user.user?.name.slice(0, 2).toUpperCase()}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-2xl font-light tracking-tight text-slate-800 mb-0.5">
                  {user.user?.name}
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                  <span>{user.user?.email}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section heading */}
        <div className="flex items-baseline gap-3 px-1">
          <h2 className="text-base font-light tracking-tight text-slate-700">
            Recent Orders
          </h2>
        </div>

        {/* Order Cards */}
        <div className="space-y-4">
          {orders.map((order) => {
            // const { label, pill } = statusConfig[order.status];
            // const fillPct = (order.currentStep / (TOTAL_STEPS - 1)) * 100;

            return (
              <div
                key={order.id}
                className="w-full max-w-4xl mx-auto p-8 bg-white border border-slate-200 rounded-3xl font-mono shadow-sm"
              >
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-4">
                  <div className="space-y-1">
                    <p className="text-slate-400 text-sm tracking-tight">
                      #{order.id}
                    </p>
                    <h2 className="text-2xl font-medium text-slate-800 tracking-tight">
                      {order.item}
                    </h2>
                    <p className="text-slate-400 text-sm italic">
                      Ordered {order.date}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="text-3xl font-bold text-blue-600">
                      ${order.price}
                    </span>
                    {/* Status Badge */}
                    <div className="px-4 py-1 rounded-full bg-emerald-50 border border-emerald-100 flex items-center gap-2">
                      <span className="text-[10px] font-bold text-emerald-500 tracking-widest uppercase">
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Tracker Section */}
                <div className="relative px-2">
                  {/* Background Base Line */}
                  <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-100 -translate-y-1/2 z-0" />

                  {/* Dynamic Blue Progress Line */}
                  <div
                    className="absolute top-1/2 left-0 h-[2px] bg-blue-500 -translate-y-1/2 z-0 transition-all duration-700 ease-in-out"
                    style={{
                      width: `${(order.currentStep / (TOTAL_STEPS - 1)) * 100}%`,
                    }}
                  />

                  {/* Step Nodes */}
                  <div className="relative flex justify-between items-center z-10">
                    {stepLabels.map((step, index) => {
                      const isCompleted = index < order.currentStep;
                      const isCurrent = index === order.currentStep;
                      const isFuture = index > order.currentStep;

                      return (
                        <div
                          key={step}
                          className="flex flex-col items-center group"
                        >
                          {/* The Circle/Node */}
                          <div
                            className={`
                    w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                    ${isFuture ? "bg-slate-200" : "bg-blue-600"}
                    ${isCurrent ? "ring-[6px] ring-blue-100 ring-offset-0 scale-110" : ""}
                  `}
                          >
                            {isCompleted ? (
                              <Check className="w-3 h-3 text-white stroke-[4px]" />
                            ) : (
                              <div className="w-2 h-2 bg-white rounded-full shadow-inner" />
                            )}
                          </div>

                          {/* Step Label */}
                          <div className="absolute -bottom-8 flex flex-col items-center">
                            <span
                              className={`
                      text-[9px] font-bold tracking-tighter whitespace-nowrap transition-colors
                      ${isFuture ? "text-slate-300" : "text-blue-600"}
                    `}
                            >
                              {step}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Info */}
                <div className="mt-20 pt-6 border-t border-slate-50">
                  <div className="flex justify-between items-center">
                    <p className="text-slate-500 text-sm">
                      Status:{" "}
                      <span className="font-bold text-slate-800">
                        Delivered {order.date}
                      </span>
                    </p>
                    <button className="text-blue-600 text-xs font-bold hover:underline underline-offset-4">
                      VIEW DETAILS →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
