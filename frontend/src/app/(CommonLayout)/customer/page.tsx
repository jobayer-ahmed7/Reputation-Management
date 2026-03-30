/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, } from "@/components/ui/card";
import { useUser } from "@/contexts/userContext";
import { getOrdersByUserId, requestCancelOrder } from "@/services/order";
import { TOrder } from "@/types/order";
import { Check, XCircle, Info } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/shared/ServiceCard";
import { toast } from "sonner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const statusConfig: Record<string, { label: string; className: string; glow: string }> = {
  PENDING: {
    label: "Pending",
    className: "border-amber-100 bg-amber-50 text-amber-700",
    glow: "bg-amber-400",
  },
  PROCESSING: {
    label: "Processing",
    className: "border-sky-100 bg-sky-50 text-sky-700",
    glow: "bg-sky-400",
  },
  COMPLETED: {
    label: "Completed",
    className: "border-emerald-100 bg-emerald-50 text-emerald-700",
    glow: "bg-emerald-400",
  },
  CANCELED: {
    label: "Canceled",
    className: "border-rose-100 bg-rose-50 text-rose-700",
    glow: "bg-rose-400",
  },
};

const paymentStatusConfig: Record<string, { label: string; className: string }> = {
  UNPAID: {
    label: "Unpaid",
    className: "border-rose-100 bg-rose-50 text-rose-700",
  },
  PAID: {
    label: "Paid",
    className: "border-emerald-100 bg-emerald-50 text-emerald-700",
  },
};

const CustomerPage = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?._id) {
        setLoading(true);
        try {
          const res = await getOrdersByUserId(user._id);
          setOrders(res.data || []);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchOrders();
  }, [user?._id]);

  const handleCancelRequest = async (orderId: string) => {
    try {
      const res = await requestCancelOrder(orderId);
      if (res.success) {
        toast.success("Cancellation request sent successfully");
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, cancelRequested: true } : order,
          ),
        );
      } else {
        toast.error(res.message || "Failed to send cancellation request");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">My Dashboard</h1>
            <p className="text-sm text-slate-500 font-medium">Track your orders and service progress</p>
          </div>
          <Link href="/services">
            <Button className="bg-linear-to-r from-pblue to-bluegray text-white font-bold px-6 shadow-md hover:shadow-lg transition-all cursor-pointer">
              BROWSE SERVICES
            </Button>
          </Link>
        </div>

        {/* Profile Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-pblue/10 flex items-center justify-center text-pblue">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Account Holder</p>
                <p className="text-lg font-black text-slate-800 leading-none">{user?.name}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <Info className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Total Orders</p>
                <p className="text-lg font-black text-slate-800 leading-none">{orders.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                <Info className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Pending Payment</p>
                <p className="text-lg font-black text-slate-800 leading-none">
                  {orders.filter(o => o.paymentStatus === 'UNPAID').length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800 uppercase tracking-tight">Recent Orders</h2>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              LIVE UPDATES
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs bg-white rounded-2xl border border-slate-200">
              Loading orders...
            </div>
          ) : orders.length === 0 ? (
            <div className="py-20 text-center px-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-300">
                <Info className="w-8 h-8" />
              </div>
              <p className="text-slate-500 font-bold uppercase tracking-tight">No orders found yet.</p>
              <Link href="/services" className="mt-4 inline-block text-pblue font-bold text-sm hover:underline">Start growing your reputation today →</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map((order) => {
                const statusMeta = statusConfig[order.workingStatus] || statusConfig.PENDING;
                const paymentMeta = paymentStatusConfig[order.paymentStatus] || paymentStatusConfig.UNPAID;

                return (
                  <Card key={order._id} className="group border-slate-200 hover:border-pblue/30 transition-all duration-300 hover:shadow-md overflow-hidden bg-white flex flex-col relative">
                    <div className={`h-1 w-full ${statusMeta.glow}`} />
                    <CardContent className="p-5 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono font-bold text-slate-900 uppercase tracking-tighter">#{order.orderId}</span>
                            {order.cancelRequested && order.workingStatus !== 'CANCELED' && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <XCircle className="w-3.5 h-3.5 text-rose-500 cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="text-[10px] font-bold">Cancellation Requested</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' }) : "N/A"}
                          </p>
                        </div>
                        <div className="bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                          <p className="text-sm font-black text-slate-900">${order.totalPrice.toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="mb-6 flex-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="text-left group/btn cursor-pointer w-full focus:outline-none">
                              <h3 className="text-sm font-bold text-slate-800 group-hover/btn:text-pblue transition-colors leading-tight mb-1 line-clamp-2">
                                {order.orderedService?.name}
                              </h3>
                              <div className="flex items-center gap-1 text-[10px] text-pblue font-bold opacity-0 group-hover/btn:opacity-100 transition-opacity uppercase tracking-widest">
                                View Details <Info className="w-3 h-3" />
                              </div>
                            </button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="uppercase italic font-black">Order Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="flex justify-center">
                                <ServiceCard service={order.orderedService} buyNowDisabled={true} />
                              </div>
                              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Promoted Links</h4>
                                <div className="space-y-2">
                                  {order.links && order.links.length > 0 ? (
                                    order.links.map((link, idx) => (
                                      <a 
                                        key={idx} 
                                        href={link.startsWith('http') ? link : `https://${link}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-xs font-medium text-pblue hover:underline flex items-center gap-2 break-all"
                                      >
                                        <span className="w-1.5 h-1.5 rounded-full bg-pblue shrink-0" />
                                        {link}
                                      </a>
                                    ))
                                  ) : (
                                    <p className="text-xs text-slate-500 italic">No links provided</p>
                                  )}
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Order Date</p>
                                  <p className="text-xs font-bold text-slate-700">{order.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"}</p>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Transaction ID</p>
                                  <p className="text-xs font-mono font-bold text-slate-700 break-all">{order.transactionId || "N/A"}</p>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Payment Method</p>
                                  <p className="text-xs font-bold text-slate-700 uppercase">{order.paymentMethod || "N/A"}</p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                        <div className="flex gap-2">
                          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-tighter ${paymentMeta.className}`}>
                            {paymentMeta.label}
                          </span>
                          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-tighter ${statusMeta.className}`}>
                            {statusMeta.label}
                          </span>
                        </div>
                        
                        <div className="flex items-center">
                          {!order.cancelRequested && (order.workingStatus === "PENDING" || order.workingStatus === "PROCESSING") ? (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" className="h-7 px-2 text-[9px] font-black text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-all cursor-pointer uppercase tracking-tight">
                                  Cancel
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle className="text-xl font-black uppercase italic text-rose-600">Cancel Request</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                    Are you sure you want to request cancellation for order <span className="font-mono font-bold text-slate-900">#{order.orderId}</span>? 
                                    Our team will review your request shortly.
                                  </p>
                                  <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl flex items-start gap-3">
                                    <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                    <p className="text-[11px] text-amber-700 font-medium leading-normal">
                                      Note: Cancellation is subject to review if the service fulfillment has already reached advanced stages.
                                    </p>
                                  </div>
                                </div>
                                <DialogFooter className="flex flex-col sm:flex-row gap-3">
                                  <DialogClose asChild>
                                    <Button variant="outline" className="w-full sm:w-auto cursor-pointer font-bold text-xs uppercase tracking-widest border-slate-200">
                                      Keep Order
                                    </Button>
                                  </DialogClose>
                                  <DialogClose asChild>
                                    <Button 
                                      variant="destructive" 
                                      onClick={() => handleCancelRequest(order._id)} 
                                      className="w-full sm:w-auto cursor-pointer font-bold text-xs uppercase tracking-widest bg-rose-600 hover:bg-rose-700"
                                    >
                                      Yes, Request Cancel
                                    </Button>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          ) : order.cancelRequested && order.workingStatus !== "CANCELED" ? (
                            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-rose-50 border border-rose-100 rounded-full">
                              <span className="w-1 h-1 rounded-full bg-rose-500 animate-pulse" />
                              <span className="text-[9px] font-black text-rose-600 uppercase tracking-tight">Pending Cancel</span>
                            </div>
                          ) : (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className={`p-1 rounded-full ${order.workingStatus === 'COMPLETED' ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-50 text-slate-400'}`}>
                                    {order.workingStatus === "COMPLETED" ? (
                                      <Check className="w-3.5 h-3.5" />
                                    ) : (
                                      <XCircle className="w-3.5 h-3.5" />
                                    )}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-[10px] font-bold uppercase">{statusMeta.label}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;

