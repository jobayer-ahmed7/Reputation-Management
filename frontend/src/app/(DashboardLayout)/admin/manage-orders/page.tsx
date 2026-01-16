"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type OrderStatus = "pending" | "processing" | "completed" | "cancelled";

export type TOrder = {
  _id: string;
  customer: string;
  service: string;
  platform: string;
  price: number;
  count: number;
  status: OrderStatus;
  createdAt: string;
};

const initialOrders: TOrder[] = [
  {
    _id: "ORD-2026-001",
    customer: "John Doe",
    service: "Google Review Boost",
    platform: "Google",
    price: 149,
    count: 25,
    status: "pending",
    createdAt: "2026-01-04",
  },
  {
    _id: "ORD-2026-002",
    customer: "Sarah Miller",
    service: "Facebook Page Likes",
    platform: "Facebook",
    price: 89,
    count: 100,
    status: "processing",
    createdAt: "2026-01-03",
  },
  {
    _id: "ORD-2026-003",
    customer: "David Wilson",
    service: "Instagram Followers Starter",
    platform: "Instagram",
    price: 129,
    count: 500,
    status: "completed",
    createdAt: "2025-12-28",
  },
  {
    _id: "ORD-2026-004",
    customer: "Emily Clark",
    service: "Google Premium Reviews",
    platform: "Google",
    price: 199,
    count: 30,
    status: "cancelled",
    createdAt: "2025-12-20",
  },
];

const statusOptions: { value: OrderStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const formatStatus = (status: OrderStatus) => {
  switch (status) {
    case "pending":
      return {
        label: "Pending",
        className: "border-amber-100 bg-amber-50 text-amber-700",
      };
    case "processing":
      return {
        label: "Processing",
        className: "border-sky-100 bg-sky-50 text-sky-700",
      };
    case "completed":
      return {
        label: "Completed",
        className: "border-emerald-100 bg-emerald-50 text-emerald-700",
      };
    case "cancelled":
      return {
        label: "Cancelled",
        className: "border-rose-100 bg-rose-50 text-rose-700",
      };
    default:
      return {
        label: status,
        className: "border-slate-200 bg-slate-50 text-slate-700",
      };
  }
};

const ManageOrder = () => {
  const [orders, setOrders] = useState<TOrder[]>(initialOrders);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [nextStatus, setNextStatus] = useState<OrderStatus | "">("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const activeOrder =
    activeOrderId !== null
      ? orders.find((order) => order._id === activeOrderId) ?? null
      : null;

  const filteredOrders = orders.filter((order) => {
    const term = searchQuery.trim().toLowerCase();
    if (!term) return true;

    return (
      order._id.toLowerCase().includes(term) ||
      order.customer.toLowerCase().includes(term) ||
      order.service.toLowerCase().includes(term) ||
      order.platform.toLowerCase().includes(term) ||
      order.status.toLowerCase().includes(term)
    );
  });

  const handleConfirmStatusChange = () => {
    if (!activeOrder || !nextStatus || nextStatus === activeOrder.status)
      return;

    setOrders((prev) =>
      prev.map((order) =>
        order._id === activeOrder._id ? { ...order, status: nextStatus } : order
      )
    );
  };

  return (
    <main className="py-8 space-y-6">
      <section>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Manage Orders
          </h1>
          <p className="max-w-2xl text-sm text-slate-500">
            View orders and update their status.
          </p>
        </div>
      </section>

      <section>
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900">
              Orders
            </CardTitle>
            <CardDescription>
              Use the action on each row to change the order status.
            </CardDescription>
            <div className="mt-4">
              <Input
                placeholder="Search by order ID, customer, service, platform, or status..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {filteredOrders.length === 0 ? (
              <p className="px-4 py-6 text-sm text-slate-500">
                No orders available.
              </p>
            ) : (
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead className="px-4 py-3 text-[11px] uppercase tracking-wide text-slate-500 md:text-xs">
                      Order
                    </TableHead>
                    <TableHead className="px-4 py-3 text-[11px] uppercase tracking-wide text-slate-500 md:text-xs">
                      Customer
                    </TableHead>
                    <TableHead className="px-4 py-3 text-[11px] uppercase tracking-wide text-slate-500 md:text-xs">
                      Service Name
                    </TableHead>
                    <TableHead className="px-4 py-3 text-[11px] uppercase tracking-wide text-slate-500 md:text-xs">
                      Price
                    </TableHead>
                    <TableHead className="px-4 py-3 text-[11px] uppercase tracking-wide text-slate-500 md:text-xs">
                      Status
                    </TableHead>
                    <TableHead className="px-4 py-3 text-right text-[11px] uppercase tracking-wide text-slate-500 md:text-xs">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => {
                    const statusMeta = formatStatus(order.status);

                    return (
                      <TableRow
                        key={order._id}
                        className="border-t border-slate-100 bg-white/80 hover:bg-slate-50/80"
                      >
                        <TableCell className="max-w-xs px-4 py-3 align-top">
                          <div className="space-y-0.5">
                            <p className="truncate text-sm font-medium text-slate-900">
                              {order._id}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              Created at {order.createdAt}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-3 align-top text-xs text-slate-700">
                          {order.customer}
                        </TableCell>
                        <TableCell className="px-4 py-3 align-top text-xs text-slate-600">
                          {order.service}
                        </TableCell>
                        <TableCell className="px-4 py-3 align-top text-xs text-slate-600">
                          ${order.price}
                        </TableCell>
                        <TableCell className="px-4 py-3 align-top">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusMeta.className}`}
                          >
                            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
                            {statusMeta.label}
                          </span>
                        </TableCell>
                        <TableCell className="px-4 py-3 align-top text-right">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-3 text-xs"
                                onClick={() => {
                                  setActiveOrderId(order._id);
                                  setNextStatus(order.status);
                                }}
                              >
                                Update status
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Update order status
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  {activeOrder
                                    ? `Change the status for ${activeOrder._id} (${activeOrder.customer}).`
                                    : "Select a new status and confirm the change."}
                                </AlertDialogDescription>
                              </AlertDialogHeader>

                              <div className="space-y-2 py-2">
                                <p className="text-xs font-medium text-slate-700">
                                  New status
                                </p>
                                <Select
                                  value={nextStatus || ""}
                                  onValueChange={(value: OrderStatus) =>
                                    setNextStatus(value)
                                  }
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {statusOptions.map((option) => (
                                      <SelectItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  disabled={
                                    !activeOrder ||
                                    !nextStatus ||
                                    nextStatus === activeOrder.status
                                  }
                                  onClick={handleConfirmStatusChange}
                                >
                                  Confirm
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default ManageOrder;
