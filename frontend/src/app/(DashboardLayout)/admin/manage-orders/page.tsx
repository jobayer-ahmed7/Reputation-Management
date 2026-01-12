"use client";

import { useMemo, useState } from "react";
import { Calendar, Filter, Search, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const mockOrders = [
  {
    id: "ORD-2026-001",
    customer: "John Doe",
    service: "Google Review Boost",
    platform: "Google",
    amount: 149,
    quantity: 25,
    status: "pending" as const,
    createdAt: "2026-01-04",
  },
  {
    id: "ORD-2026-002",
    customer: "Sarah Miller",
    service: "Facebook Page Likes",
    platform: "Facebook",
    amount: 89,
    quantity: 100,
    status: "processing" as const,
    createdAt: "2026-01-03",
  },
  {
    id: "ORD-2026-003",
    customer: "David Wilson",
    service: "Instagram Followers Starter",
    platform: "Instagram",
    amount: 129,
    quantity: 500,
    status: "completed" as const,
    createdAt: "2025-12-28",
  },
  {
    id: "ORD-2026-004",
    customer: "Emily Clark",
    service: "Google Premium Reviews",
    platform: "Google",
    amount: 199,
    quantity: 30,
    status: "cancelled" as const,
    createdAt: "2025-12-20",
  },
];

const ManageOrder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | "all">("all");
  const [platformFilter, setPlatformFilter] = useState<string | "all">("all");

  const stats = useMemo(() => {
    const total = mockOrders.length;
    const pending = mockOrders.filter((o) => o.status === "pending").length;
    const processing = mockOrders.filter((o) => o.status === "processing").length;
    const completed = mockOrders.filter((o) => o.status === "completed").length;

    const revenue = mockOrders.reduce((sum, o) => sum + o.amount, 0);

    return { total, pending, processing, completed, revenue };
  }, []);

  const filteredOrders = useMemo(() => {
    return mockOrders.filter((order) => {
      const term = searchTerm.toLowerCase();

      const matchesSearch = term
        ? order.id.toLowerCase().includes(term) ||
          order.customer.toLowerCase().includes(term) ||
          order.service.toLowerCase().includes(term)
        : true;

      const matchesStatus =
        statusFilter === "all" ? true : order.status === statusFilter;

      const matchesPlatform =
        platformFilter === "all"
          ? true
          : order.platform.toLowerCase() === platformFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesPlatform;
    });
  }, [searchTerm, statusFilter, platformFilter]);

  const formatStatus = (status: string) => {
    switch (status) {
      case "pending":
        return {
          label: "Pending",
          className:
            "border-amber-100 bg-amber-50 text-amber-700",
        };
      case "processing":
        return {
          label: "Processing",
          className:
            "border-sky-100 bg-sky-50 text-sky-700",
        };
      case "completed":
        return {
          label: "Completed",
          className:
            "border-emerald-100 bg-emerald-50 text-emerald-700",
        };
      case "cancelled":
        return {
          label: "Cancelled",
          className:
            "border-rose-100 bg-rose-50 text-rose-700",
        };
      default:
        return {
          label: status,
          className:
            "border-slate-200 bg-slate-50 text-slate-700",
        };
    }
  };

  return (
    <main className="py-8 space-y-6">
      {/* Header */}
      <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Manage Orders
          </h1>
          <p className="max-w-2xl text-sm text-slate-500">
            Track customer orders, update statuses, and monitor revenue in real time.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 text-xs md:text-sm">
            <Calendar className="h-4 w-4" />
            Last 30 days
          </Button>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-4 md:grid-cols-4">
        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardDescription>Total orders</CardDescription>
            <CardTitle className="text-2xl font-semibold">
              {stats.total}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-xs text-slate-500">
            All orders received in the selected period.
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardDescription>Pending</CardDescription>
            <CardTitle className="text-2xl font-semibold text-amber-600">
              {stats.pending}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-xs text-slate-500">
            Orders waiting to be processed.
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardDescription>Processing</CardDescription>
            <CardTitle className="text-2xl font-semibold text-sky-600">
              {stats.processing}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-xs text-slate-500">
            Orders currently being fulfilled.
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardDescription>Revenue</CardDescription>
            <CardTitle className="text-2xl font-semibold text-pblue">
              ${stats.revenue.toFixed(2)}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-xs text-slate-500">
            Total value of listed orders.
          </CardContent>
        </Card>
      </section>

      {/* Filters + table */}
      <section>
        <Card className="border-slate-200">
          <CardHeader className="gap-4 border-b border-slate-100 pb-4 sm:flex sm:items-center sm:justify-between">
            <div className="space-y-1">
              <CardTitle className="text-base font-semibold text-slate-900">
                Orders list
              </CardTitle>
              <CardDescription>
                Search and filter orders by status, platform, or customer.
              </CardDescription>
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by order ID, customer, or service"
                  className="pl-8 text-xs md:text-sm"
                />
              </div>

              {/* Status filter */}
              <div className="flex items-center gap-2">
                <Filter className="hidden h-4 w-4 text-slate-400 sm:block" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                  className="h-9 rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-xs outline-none focus-visible:border-pblue focus-visible:ring-2 focus-visible:ring-pblue/30 md:text-sm"
                >
                  <option value="all">All status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Platform filter */}
              <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value as typeof platformFilter)}
                className="h-9 rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-xs outline-none focus-visible:border-pblue focus-visible:ring-2 focus-visible:ring-pblue/30 md:text-sm"
              >
                <option value="all">All platforms</option>
                <option value="Google">Google</option>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
              </select>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs text-slate-600 md:text-sm">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500 md:text-xs">
                  <tr>
                    <th className="px-4 py-3 font-medium">Order</th>
                    <th className="px-4 py-3 font-medium">Customer</th>
                    <th className="px-4 py-3 font-medium">Service</th>
                    <th className="px-4 py-3 font-medium">Platform</th>
                    <th className="px-4 py-3 font-medium">Qty</th>
                    <th className="px-4 py-3 font-medium">Amount</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-4 py-10 text-center text-xs text-slate-500 md:text-sm"
                      >
                        No orders found. Try adjusting your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => {
                      const statusMeta = formatStatus(order.status);

                      return (
                        <tr
                          key={order.id}
                          className="border-t border-slate-100 bg-white/80 hover:bg-slate-50/80"
                        >
                          <td className="max-w-xs px-4 py-3 align-top">
                            <div className="space-y-0.5">
                              <p className="truncate text-sm font-medium text-slate-900">
                                {order.id}
                              </p>
                              <p className="text-[11px] text-slate-500">
                                Created at {order.createdAt}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-3 align-top text-xs text-slate-700">
                            {order.customer}
                          </td>
                          <td className="px-4 py-3 align-top text-xs text-slate-600">
                            {order.service}
                          </td>
                          <td className="px-4 py-3 align-top">
                            <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-700">
                              {order.platform}
                            </span>
                          </td>
                          <td className="px-4 py-3 align-top text-xs text-slate-700">
                            {order.quantity}
                          </td>
                          <td className="px-4 py-3 align-top text-sm font-semibold text-slate-900">
                            ${order.amount.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 align-top">
                            <span
                              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusMeta.className}`}
                            >
                              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
                              {statusMeta.label}
                            </span>
                          </td>
                          <td className="px-4 py-3 align-top text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-3 text-xs"
                              >
                                View
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-3 text-xs"
                              >
                                Update status
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                className="h-8 w-8 text-slate-500 hover:text-slate-700"
                                aria-label="More actions"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default ManageOrder;
