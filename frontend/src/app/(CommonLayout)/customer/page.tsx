/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/contexts/userContext";
import { getOrdersByUserId, requestCancelOrder } from "@/services/order";
import { TOrder, workingStatus } from "@/types/order";
import { Check, XCircle, Info } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/shared/ServiceCard";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

const statusConfig: Record<string, { label: string; className: string }> = {
  PENDING: {
    label: "Pending",
    className: "border-amber-100 bg-amber-50 text-amber-700",
  },
  PROCESSING: {
    label: "Processing",
    className: "border-sky-100 bg-sky-50 text-sky-700",
  },
  COMPLETED: {
    label: "Completed",
    className: "border-emerald-100 bg-emerald-50 text-emerald-700",
  },
  CANCELED: {
    label: "Canceled",
    className: "border-rose-100 bg-rose-50 text-rose-700",
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

        {/* Orders Table Section */}
        <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 p-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-slate-800 uppercase tracking-tight">Recent Orders</CardTitle>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                LIVE UPDATES
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">Loading orders...</div>
            ) : orders.length === 0 ? (
              <div className="py-20 text-center px-6">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-300">
                  <Info className="w-8 h-8" />
                </div>
                <p className="text-slate-500 font-bold uppercase tracking-tight">No orders found yet.</p>
                <Link href="/services" className="mt-4 inline-block text-pblue font-bold text-sm hover:underline">Start growing your reputation today →</Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50/80">
                    <TableRow className="hover:bg-transparent border-slate-100">
                      <TableHead className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-wider">Order ID</TableHead>
                      <TableHead className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-wider">Service</TableHead>
                      <TableHead className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-wider">Date</TableHead>
                      <TableHead className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-wider">Price</TableHead>
                      <TableHead className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-wider">Payment</TableHead>
                      <TableHead className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-wider">Status</TableHead>
                      <TableHead className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-wider text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => {
                      const statusMeta = statusConfig[order.workingStatus] || statusConfig.PENDING;
                      const paymentMeta = paymentStatusConfig[order.paymentStatus] || paymentStatusConfig.UNPAID;

                      return (
                        <TableRow key={order._id} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                          <TableCell className="px-6 py-5 align-middle">
                            <div className="flex flex-col">
                              <span className="text-[11px] font-mono font-bold text-slate-900 uppercase">#{order.orderId}</span>
                              {order.cancelRequested && order.workingStatus !== 'CANCELED' && (
                                <span className="text-[9px] font-bold text-rose-500 uppercase tracking-tighter flex items-center gap-1 mt-1">
                                  <XCircle className="w-2.5 h-2.5" /> Cancellation Requested
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="px-6 py-5 align-middle">
                            <Dialog>
                              <DialogTrigger asChild>
                                <button className="text-sm font-bold text-slate-800 hover:text-pblue transition-colors cursor-pointer text-left leading-tight decoration-pblue/30 decoration-2 underline-offset-4 hover:underline">
                                  {order.orderedService?.name}
                                </button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Service Details</DialogTitle>
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
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                          <TableCell className="px-6 py-5 align-middle text-[11px] font-bold text-slate-500">
                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                          </TableCell>
                          <TableCell className="px-6 py-5 align-middle text-sm font-black text-slate-900">
                            ${order.totalPrice.toFixed(2)}
                          </TableCell>
                          <TableCell className="px-6 py-5 align-middle">
                            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-tighter ${paymentMeta.className}`}>
                              {paymentMeta.label}
                            </span>
                          </TableCell>
                          <TableCell className="px-6 py-5 align-middle">
                            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-tighter ${statusMeta.className}`}>
                              {statusMeta.label}
                            </span>
                          </TableCell>
                          <TableCell className="px-6 py-5 align-middle text-right">
                            {!order.cancelRequested && (order.workingStatus === "PENDING" || order.workingStatus === "PROCESSING") ? (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" className="h-8 text-[10px] font-black text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-all cursor-pointer uppercase tracking-tight">
                                    Cancel
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                  <DialogHeader>
                                    <DialogTitle className="text-xl font-black uppercase italic">Cancel your order?</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                      Are you sure you want to request cancellation for order <span className="font-mono font-bold text-slate-900">#{order.orderId}</span>? 
                                      Our team will review your request and process it as soon as possible.
                                    </p>
                                    <div className="bg-amber-50 border border-amber-100 p-3 rounded-lg flex items-start gap-3">
                                      <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                      <p className="text-[11px] text-amber-700 font-medium leading-normal">
                                        Note: If work has already begun, cancellation might be subject to our refund policy.
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
                              <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 border border-rose-100 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                                <span className="text-[10px] font-black text-rose-600 uppercase tracking-tight">Cancel Pending</span>
                              </div>
                            ) : (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-400">
                                      {order.workingStatus === "COMPLETED" ? (
                                        <Check className="w-4 h-4" />
                                      ) : order.workingStatus === "CANCELED" ? (
                                        <XCircle className="w-4 h-4" />
                                      ) : (
                                        <Check className="w-4 h-4" />
                                      )}
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="text-[10px] font-bold uppercase">
                                      {order.workingStatus === "COMPLETED" ? "Order Completed" : order.workingStatus === "CANCELED" ? "Order Canceled" : "Order is being processed"}
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerPage;
