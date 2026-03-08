/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/contexts/userContext";
import { getOrdersByUserId } from "@/services/order";
import { TOrder, workingStatus } from "@/types/order";
import { Check } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/shared/ServiceCard";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Helper to map string status to numeric index for the progress bar
const getStatusIndex = (status: string) => workingStatus.indexOf(status as any);

const statusConfig: Record<string, { label: string; pill: string }> = {
  PENDING: {
    label: "Pending",
    pill: "bg-slate-100 text-slate-500 border-slate-200",
  },
  PROCESSING: {
    label: "Processing",
    pill: "bg-blue-50 text-blue-600 border-blue-200",
  },
  COMPLETED: {
    label: "Completed",
    pill: "bg-emerald-50 text-emerald-600 border-emerald-200",
  },
  CANCELED: {
    label: "Canceled",
    pill: "bg-red-50 text-red-600 border-red-200",
  },
};

const CustomerPage = () => {
  const { user } = useUser(); // Destructured based on typical Context patterns
  const [orders, setOrders] = useState<TOrder[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?._id) {
        const res = await getOrdersByUserId(user._id);
        setOrders(res.data || []);
      }
    };
    fetchOrders();
  }, [user?._id]);

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 px-6 py-10 font-mono">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex items-center gap-5 mb-8">
          <span className="text-xl font-bold tracking-tighter text-slate-900">
            Reputation Manage
          </span>
          <div className="flex-1" />
          <Link
            className="text-xs uppercase tracking-widest text-slate-400 hover:text-pblue transition-colors"
            href="/services"
          >
            Services
          </Link>
        </header>

        {/* Profile Card */}
        <Card className="bg-white border border-slate-200 overflow-hidden relative shadow-sm mb-12">
          <CardContent className="p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
                {user?.name?.slice(0, 2).toUpperCase() || "??"}
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold tracking-tight text-slate-800">
                  {user?.name}
                </p>
                <p className="text-sm text-slate-500">{user?.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-lg font-bold tracking-tight text-slate-700 px-1">
          Recent Orders
        </h2>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white border border-dashed border-slate-300 rounded-3xl">
            <p className="text-slate-400">No orders found.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => {
              const currentStep = getStatusIndex(order.workingStatus);
              const { label, pill } =
                statusConfig[order.workingStatus] || statusConfig.PENDING;

              // Progress percentage logic
              const fillPct = (currentStep / (workingStatus.length - 1)) * 100;

              return (
                <div
                  key={order._id}
                  className="w-full p-8 bg-white border border-slate-200 rounded-3xl shadow-sm"
                >
                  {/* Header Section */}
                  <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-4">
                    <div className="space-y-1">
                      <p className="text-slate-400 text-[10px] uppercase tracking-widest">
                        ID: {order._id.slice(-8)}
                      </p>
                      <h2 className="text-xl font-bold text-slate-800">
                        {order.orderedService?.name}
                      </h2>
                      <p className="text-slate-400 text-xs">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="text-2xl font-black text-slate-900">
                        ${order.totalPrice.toFixed(2)}
                      </span>
                      <div
                        className={`px-3 py-1 rounded-full border text-[10px] font-bold tracking-tighter uppercase ${pill}`}
                      >
                        {label}
                      </div>
                    </div>
                  </div>

                  {/* Progress Tracker */}
                  <div className="relative px-2 mb-12">
                    {/* Background Line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 rounded-full" />

                    {/* Blue Progress Line */}
                    <div
                      className="absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 transition-all duration-700 rounded-full"
                      style={{ width: `${fillPct}%` }}
                    />

                    <div className="relative flex justify-between items-center">
                      {workingStatus.map((step, index) => {
                        const isCompleted =
                          index < currentStep ||
                          order.workingStatus === "COMPLETED";
                        const isCurrent = index === currentStep;
                        const isFuture = index > currentStep;

                        return (
                          <div
                            key={step}
                            className="flex flex-col items-center"
                          >
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center transition-all z-10 
                                ${isFuture ? "bg-slate-200" : "bg-blue-600"}
                                ${isCurrent ? "ring-4 ring-blue-100 scale-110" : ""}
                              `}
                            >
                              {isCompleted ? (
                                <Check className="w-3 h-3 text-white stroke-[4px]" />
                              ) : (
                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                              )}
                            </div>
                            <span
                              className={`absolute -bottom-7 text-[9px] font-bold uppercase tracking-tighter
                              ${isFuture ? "text-slate-300" : "text-blue-600"}`}
                            >
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-12 pt-6 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-bold">
                      PAYMENT:{" "}
                      <span
                        className={
                          order.paymentStatus === "PAID"
                            ? "text-emerald-500"
                            : "text-amber-500"
                        }
                      >
                        {order.paymentStatus}
                      </span>
                    </span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="text-blue-600 text-[10px] font-bold hover:scale-95 transition-transform duration-300 underline-offset-4 cursor-pointer"
                        >
                          VIEW DETAILS →
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Service Details</DialogTitle>
                        </DialogHeader>
                        <div className="flex items-center gap-2 justify-center">
                         <ServiceCard service={order.orderedService} buyNowDisabled={true} />
                        </div>
                        <DialogFooter className="sm:justify-start">
                          <DialogClose asChild>
                            <Button type="button">Close</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerPage;
